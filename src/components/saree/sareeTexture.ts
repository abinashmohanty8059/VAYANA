/**
 * Paints a Sambalpuri-style saree into two canvases:
 *   albedo — the woven colour (with a transparent tasselled fringe)
 *   orm    — G = roughness, B = metalness, so zari reads as metal and silk as matte
 * u runs along the length of the saree (left = held end, right = pallu).
 */

export const TEX_W = 2048;
export const TEX_H = 640;

const MAROON = "#6f1419";
const MAROON_DEEP = "#4f0c10";
const GOLD = "#c9a25a";
const GOLD_LIGHT = "#ecd49a";
const IVORY = "#efe3cb";
const INK = "#1c0b0b";

const BORDER = 96; // zari border height (px, each side)
const SELVEDGE = 14;
const PALLU_X = 1500;
const FRINGE_X = 1990;

// Matte silk vs. metallic zari in the ORM map.
const SILK_ORM = "rgb(0,196,0)";
const ZARI_ORM = "rgb(0,92,225)";

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
}

export function paintSaree(fontFamily: string) {
  const albedo = document.createElement("canvas");
  const orm = document.createElement("canvas");
  albedo.width = orm.width = TEX_W;
  albedo.height = orm.height = TEX_H;
  const x = albedo.getContext("2d", { willReadFrequently: true })!;
  const m = orm.getContext("2d")!;
  const rand = rng(1948);

  /** Fill a shape on the colour map and mark it as zari on the ORM map. */
  const zari = (draw: (c: CanvasRenderingContext2D) => void, color: string | CanvasGradient = GOLD) => {
    x.fillStyle = color;
    draw(x);
    m.fillStyle = ZARI_ORM;
    draw(m);
  };
  const rect = (x0: number, y0: number, w: number, h: number) => (c: CanvasRenderingContext2D) => c.fillRect(x0, y0, w, h);

  /** Ikat diamond: stacked hand-tied strokes whose edges bleed with a small random jitter. */
  const ikatDiamond = (cx: number, cy: number, s: number, color: string, alpha = 1, gold = false) => {
    x.globalAlpha = alpha;
    for (let dy = -s; dy <= s; dy += 3) {
      const hw = s - Math.abs(dy);
      if (hw <= 0) continue;
      const j = (rand() - 0.5) * s * 0.35;
      const draw = rect(cx - hw + j, cy + dy, hw * 2 + (rand() - 0.5) * 4, 2.4);
      if (gold) zari(draw, color);
      else {
        x.fillStyle = color;
        draw(x);
      }
    }
    x.globalAlpha = 1;
  };

  // ── Body ground ────────────────────────────────────────────
  m.fillStyle = SILK_ORM;
  m.fillRect(0, 0, TEX_W, TEX_H);
  const ground = x.createLinearGradient(0, 0, 0, TEX_H);
  ground.addColorStop(0, MAROON_DEEP);
  ground.addColorStop(0.5, MAROON);
  ground.addColorStop(1, MAROON_DEEP);
  x.fillStyle = ground;
  x.fillRect(0, 0, FRINGE_X, TEX_H);

  // Ikat lattice across the body, offset every other row.
  const top = BORDER + SELVEDGE + 26;
  const bottom = TEX_H - BORDER - SELVEDGE - 26;
  const step = 58;
  for (let row = 0, y = top; y <= bottom; y += step * 0.5, row++) {
    for (let xx = 40 + (row % 2) * step * 0.5; xx < PALLU_X - 30; xx += step) {
      ikatDiamond(xx, y, 12, GOLD, 0.9, true);
      ikatDiamond(xx, y, 4, IVORY, 0.95);
    }
  }

  // ── Borders (top and bottom, mirrored) ─────────────────────
  const border = (y0: number, flip: boolean) => {
    const dir = flip ? -1 : 1;
    const outer = flip ? y0 + BORDER : y0; // edge nearest the selvedge
    const band = x.createLinearGradient(0, y0, 0, y0 + BORDER);
    band.addColorStop(0, GOLD);
    band.addColorStop(0.5, GOLD_LIGHT);
    band.addColorStop(1, GOLD);
    zari(rect(0, y0, FRINGE_X, BORDER), band);

    // Kumbha temple spires pointing into the body.
    x.fillStyle = MAROON;
    for (let xx = 0; xx < FRINGE_X; xx += 34) {
      x.beginPath();
      x.moveTo(xx, outer + dir * 8);
      x.lineTo(xx + 17, outer + dir * (BORDER - 34));
      x.lineTo(xx + 34, outer + dir * 8);
      x.closePath();
      x.fill();
    }
    // Ivory bead row and fine lines.
    x.fillStyle = IVORY;
    for (let xx = 17; xx < FRINGE_X; xx += 34) {
      x.beginPath();
      x.arc(xx, outer + dir * (BORDER - 20), 3.2, 0, Math.PI * 2);
      x.fill();
    }
    x.fillStyle = MAROON_DEEP;
    x.fillRect(0, outer + dir * (BORDER - 8) - (flip ? 3 : 0), FRINGE_X, 3);
    x.fillRect(0, outer + dir * 4 - (flip ? 2 : 0), FRINGE_X, 2);
  };
  x.fillStyle = INK;
  x.fillRect(0, 0, FRINGE_X, SELVEDGE);
  x.fillRect(0, TEX_H - SELVEDGE, FRINGE_X, SELVEDGE);
  border(SELVEDGE, false);
  border(TEX_H - SELVEDGE - BORDER, true);

  // ── Pallu ──────────────────────────────────────────────────
  const pTop = SELVEDGE + BORDER;
  const pH = TEX_H - 2 * (SELVEDGE + BORDER);
  // Stripe sequence into the pallu.
  const stripes: [number, string, boolean][] = [
    [10, GOLD, true],
    [14, MAROON_DEEP, false],
    [6, GOLD, true],
    [22, INK, false],
    [6, GOLD, true],
    [14, MAROON_DEEP, false],
    [10, GOLD, true],
  ];
  let sx = PALLU_X;
  for (const [w, c, isZari] of stripes) {
    if (isZari) zari(rect(sx, 0, w, TEX_H), c);
    else {
      x.fillStyle = c;
      x.fillRect(sx, 0, w, TEX_H);
    }
    sx += w;
  }
  const panelX = sx;
  const panelW = FRINGE_X - 40 - panelX;
  x.fillStyle = IVORY;
  x.fillRect(panelX, pTop, panelW, pH);
  // Closing stripes before the fringe.
  zari(rect(FRINGE_X - 40, 0, 12, TEX_H));
  x.fillStyle = MAROON_DEEP;
  x.fillRect(FRINGE_X - 28, 0, 16, TEX_H);
  zari(rect(FRINGE_X - 12, 0, 12, TEX_H));

  // Large ikat motifs on the ivory panel, framing the wordmark.
  for (let y = pTop + 40; y < pTop + pH - 20; y += 72) {
    ikatDiamond(panelX + 44, y, 22, MAROON, 0.95);
    ikatDiamond(panelX + 44, y, 8, GOLD, 1, true);
    ikatDiamond(panelX + panelW - 44, y, 22, MAROON, 0.95);
    ikatDiamond(panelX + panelW - 44, y, 8, GOLD, 1, true);
  }

  // Wordmark woven vertically down the pallu.
  x.save();
  x.translate(panelX + panelW / 2, pTop + pH / 2);
  x.rotate(-Math.PI / 2);
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = MAROON;
  x.font = `800 112px ${fontFamily}`;
  x.fillText("VAYANA", 0, -8);
  // Bodoni's hairlines vanish at texture scale; a matching stroke keeps the letters whole.
  x.strokeStyle = MAROON;
  x.lineWidth = 5;
  x.lineJoin = "round";
  x.strokeText("VAYANA", 0, -8);
  x.font = `700 22px ${fontFamily}`;
  x.fillStyle = MAROON_DEEP;
  x.fillText("·  O D I S H A  ·  H A N D W O V E N  ·", 0, 74);
  x.restore();

  // ── Weave: thread grid + slub noise over everything woven ──
  x.globalAlpha = 1;
  for (let y = 0; y < TEX_H; y += 3) {
    x.fillStyle = "rgba(20,6,6,0.07)";
    x.fillRect(0, y, FRINGE_X, 1);
  }
  for (let xx = 0; xx < FRINGE_X; xx += 3) {
    x.fillStyle = "rgba(255,244,220,0.05)";
    x.fillRect(xx, 0, 1, TEX_H);
  }
  const img = x.getImageData(0, 0, FRINGE_X, TEX_H);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() * 2 - 1) * 9;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  x.putImageData(img, 0, 0);

  // ── Fringe: tassels hanging off the pallu (transparent elsewhere) ──
  x.clearRect(FRINGE_X, 0, TEX_W - FRINGE_X, TEX_H);
  m.fillStyle = ZARI_ORM;
  m.fillRect(FRINGE_X, 0, TEX_W - FRINGE_X, TEX_H);
  for (let y = 4; y < TEX_H - 4; y += 12) {
    const len = 30 + rand() * 26;
    const color = (y / 12) % 3 < 1 ? GOLD : MAROON;
    x.fillStyle = color;
    for (let k = 0; k < 4; k++) x.fillRect(FRINGE_X, y + k * 2.2, len - k * 3, 1.6);
    x.fillStyle = GOLD_LIGHT;
    x.fillRect(FRINGE_X + 6, y - 1, 5, 9); // knot
  }

  return { albedo, orm };
}
