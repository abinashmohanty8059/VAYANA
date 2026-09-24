"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { ScrollTrigger } from "@/lib/gsap";
import { paintSaree } from "./sareeTexture";

// Cloth dimensions (world units) and simulation grid.
const BW = 6.4;
const BH = 2.0;
const GX = 64;
const GY = 20;
const DT = 1 / 60;
const DAMP = 0.984;
const GRAVITY = -0.35;
const ITERATIONS = 5;

/**
 * A silk saree held at one end and carried by the wind: Verlet integration
 * over a (GX+1)×(GY+1) particle sheet with structural and bend constraints.
 * The held edge sways on its own; the pointer stirs the silk it passes over.
 */
/** `className` must give the host a size and position (e.g. "absolute inset-0"). */
export default function SareeCloth({ className = "relative w-full h-full" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current!;
    const canvas = canvasRef.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    const init = () => {
      if (disposed) return;

      // ── Renderer & scene ────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      // No filmic curve: ACES pushes the maroon toward salmon.
      renderer.toneMapping = THREE.NoToneMapping;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment(renderer);
      const envMap = pmrem.fromScene(room, 0.04).texture;
      scene.environment = envMap;
      room.dispose();
      pmrem.dispose();

      // ── Material ────────────────────────────────────────
      const font = getComputedStyle(document.documentElement).getPropertyValue("--font-bodoni").trim() || "Georgia, serif";
      const { albedo, orm } = paintSaree(font);
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const map = new THREE.CanvasTexture(albedo);
      map.colorSpace = THREE.SRGBColorSpace;
      const ormMap = new THREE.CanvasTexture(orm);
      [map, ormMap].forEach((t) => (t.anisotropy = maxAniso));

      const material = new THREE.MeshPhysicalMaterial({
        map,
        roughnessMap: ormMap,
        metalnessMap: ormMap,
        roughness: 1,
        metalness: 1,
        sheen: 0.35,
        sheenColor: new THREE.Color("#c9a25a"),
        sheenRoughness: 0.5,
        envMapIntensity: 0.55,
        side: THREE.DoubleSide,
        alphaTest: 0.5,
      });

      const geometry = new THREE.PlaneGeometry(BW, BH, GX, GY);
      const mesh = new THREE.Mesh(geometry, material);
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);

      scene.add(new THREE.AmbientLight(0xffe6cc, 0.18));
      const key = new THREE.DirectionalLight(0xfff0dc, 1.5);
      key.position.set(-3, 4, 4);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xc8a25e, 1.1);
      rim.position.set(4, -1, 2.5);
      scene.add(rim);
      const back = new THREE.DirectionalLight(0x8e1f25, 1.4);
      back.position.set(0, 1, -4);
      scene.add(back);

      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

      // ── Particles ───────────────────────────────────────
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const N = (GX + 1) * (GY + 1);
      const cur = new Float32Array(N * 3);
      const prev = new Float32Array(N * 3);
      const rest = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        cur[i * 3] = prev[i * 3] = rest[i * 3] = pos.getX(i);
        cur[i * 3 + 1] = prev[i * 3 + 1] = rest[i * 3 + 1] = pos.getY(i);
      }
      const idx = (ix: number, iy: number) => ix + iy * (GX + 1);
      const restH = BW / GX;
      const restV = BH / GY;

      // Constraint list: structural (1 apart) plus softer bend (2 apart) for silk body.
      const cons: number[] = []; // a, b, restLength, stiffness
      for (let iy = 0; iy <= GY; iy++)
        for (let ix = 0; ix <= GX; ix++) {
          if (ix < GX) cons.push(idx(ix, iy), idx(ix + 1, iy), restH, 1);
          if (iy < GY) cons.push(idx(ix, iy), idx(ix, iy + 1), restV, 1);
          if (ix < GX - 1) cons.push(idx(ix, iy), idx(ix + 2, iy), restH * 2, 0.12);
          if (iy < GY - 1) cons.push(idx(ix, iy), idx(ix, iy + 2), restV * 2, 0.12);
        }

      // Pointer, projected onto the cloth plane in local space.
      const pointer = { active: false, x: 0, y: 0, strength: 0 };
      const ray = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3();
      const ndc = new THREE.Vector2();

      // Scroll through the section gently orbits the camera.
      let scrollProgress = 0.5;
      const st = ScrollTrigger.create({
        trigger: host,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => (scrollProgress = self.progress),
      });

      // The held edge: gathered slightly and swaying, like a hand holding the pleats.
      const pinAt = (iy: number, t: number, out: Float32Array, o: number) => {
        const ry = rest[idx(0, iy) * 3 + 1];
        out[o] = -BW / 2 + 0.06 * Math.sin(t * 0.8 + iy * 0.12);
        out[o + 1] = ry * 0.9 + 0.07 * Math.sin(t * 0.9);
        out[o + 2] = 0.14 * Math.sin(t * 0.75 + iy * 0.18);
      };

      const step = (t: number) => {
        const gust = 0.62 + 0.3 * Math.sin(t * 0.55) + 0.14 * Math.sin(t * 1.7 + 1.1);
        for (let iy = 0; iy <= GY; iy++) {
          const cy = iy / GY;
          for (let ix = 1; ix <= GX; ix++) {
            const cx = ix / GX;
            const i = idx(ix, iy) * 3;
            const reach = Math.pow(cx, 1.15);
            // Wind streams the silk out horizontally; a slow lift keeps it airborne.
            let fx = 3.0 * gust;
            const fy = GRAVITY + (0.18 + 0.55 * Math.sin(t * 1.25 - cx * 4 + cy)) * reach;
            let fz =
              (Math.sin(t * 3.0 - cx * 7.5 + cy * 2.4) + 0.45 * Math.sin(t * 5.1 - cx * 13 + cy * 5)) *
              4.2 *
              reach *
              gust;
            if (pointer.strength > 0.01) {
              const dx = cur[i] - pointer.x;
              const dy = cur[i + 1] - pointer.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 0.8) {
                const f = (1 - d2 / 0.8) * pointer.strength;
                fz += f * 26;
                fx += dx * f * 6;
              }
            }
            const f3 = [fx, fy, fz];
            for (let k = 0; k < 3; k++) {
              const j = i + k;
              const v = (cur[j] - prev[j]) * DAMP;
              prev[j] = cur[j];
              cur[j] += v + f3[k] * DT * DT;
            }
          }
        }
        for (let it = 0; it < ITERATIONS; it++) {
          for (let iy = 0; iy <= GY; iy++) pinAt(iy, t, cur, idx(0, iy) * 3);
          for (let c = 0; c < cons.length; c += 4) {
            const a = cons[c] * 3;
            const b = cons[c + 1] * 3;
            const dx = cur[b] - cur[a];
            const dy = cur[b + 1] - cur[a + 1];
            const dz = cur[b + 2] - cur[a + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
            const diff = ((d - cons[c + 2]) / d) * 0.5 * cons[c + 3];
            const aPinned = cons[c] % (GX + 1) === 0;
            const bPinned = cons[c + 1] % (GX + 1) === 0;
            if (aPinned && bPinned) continue;
            const wA = aPinned ? 0 : bPinned ? 2 : 1;
            const wB = bPinned ? 0 : aPinned ? 2 : 1;
            cur[a] += dx * diff * wA;
            cur[a + 1] += dy * diff * wA;
            cur[a + 2] += dz * diff * wA;
            cur[b] -= dx * diff * wB;
            cur[b + 1] -= dy * diff * wB;
            cur[b + 2] -= dz * diff * wB;
          }
        }
        for (let iy = 0; iy <= GY; iy++) {
          const o = idx(0, iy) * 3;
          pinAt(iy, t, cur, o);
          prev[o] = cur[o];
          prev[o + 1] = cur[o + 1];
          prev[o + 2] = cur[o + 2];
        }
        pointer.strength *= 0.92;
      };

      const commit = () => {
        (pos.array as Float32Array).set(cur);
        pos.needsUpdate = true;
        geometry.computeVertexNormals();
      };

      let portrait = false;
      const fit = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        portrait = camera.aspect < 1;
        // Landscape: the whole saree in frame. Portrait: let it run off the edges, larger.
        const visibleW = portrait ? BW * 0.7 : BW * 1.3;
        const dist = visibleW / 2 / Math.tan((camera.fov * Math.PI) / 360) / camera.aspect;
        camera.position.set(0, 0.35, dist);
        camera.updateProjectionMatrix();
        group.position.set(portrait ? -1.1 : 0.15, portrait ? 0 : -0.1, 0);
      };

      const render = () => {
        const s = scrollProgress - 0.5;
        camera.position.x = s * (portrait ? 0.6 : 1.6);
        camera.lookAt(0, 0, 0);
        group.rotation.y = -s * 0.25;
        renderer.render(scene, camera);
      };

      // ── Loop: only while on screen and the tab is visible ──
      let t = 0;
      let raf = 0;
      let last = 0;
      let acc = 0;
      let running = false;
      let visible = false;
      let contextLost = false;

      const loop = (now: number) => {
        if (!running) return;
        const elapsed = last ? Math.min((now - last) / 1000, 0.1) : DT;
        last = now;
        acc += elapsed;
        while (acc >= DT) {
          t += DT;
          step(t);
          acc -= DT;
        }
        commit();
        render();
        raf = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running || reduce || contextLost || !visible || document.hidden) return;
        running = true;
        last = 0;
        raf = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      fit();
      // Settle into a flying pose before the first frame.
      for (let s = 0; s < (reduce ? 260 : 90); s++) step((t += DT));
      commit();
      render();

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      io.observe(host);

      const ro = new ResizeObserver(() => {
        fit();
        if (!running) render();
      });
      ro.observe(host);

      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVisibility);

      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        if (ray.ray.intersectPlane(plane, hit)) {
          group.worldToLocal(hit);
          pointer.x = hit.x;
          pointer.y = hit.y;
          pointer.strength = Math.min(1, pointer.strength + 0.35);
        }
      };
      host.addEventListener("pointermove", onPointer);

      const onLost = (e: Event) => {
        e.preventDefault();
        contextLost = true;
        stop();
      };
      const onRestored = () => {
        contextLost = false;
        map.needsUpdate = true;
        ormMap.needsUpdate = true;
        render();
        start();
      };
      canvas.addEventListener("webglcontextlost", onLost);
      canvas.addEventListener("webglcontextrestored", onRestored);

      cleanup = () => {
        stop();
        io.disconnect();
        ro.disconnect();
        st.kill();
        document.removeEventListener("visibilitychange", onVisibility);
        host.removeEventListener("pointermove", onPointer);
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        geometry.dispose();
        material.dispose();
        map.dispose();
        ormMap.dispose();
        envMap.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };
    };

    // Paint the wordmark with the real Bodoni, not a fallback.
    document.fonts.ready.then(init);

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={hostRef} className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />
    </div>
  );
}
