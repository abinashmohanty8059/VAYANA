/**
 * Paints a saree into two canvases:
 *   albedo — the woven colour (with a transparent tasselled fringe)
 *   orm    — G = roughness, B = metalness, so zari reads as metal and silk/cotton as matte
 * u runs along the length of the saree (left = held end, right = pallu).
 * Each look is described by a SareeDesign; the loom layout is shared.
 */

export const TEX_W = 2048;
export const TEX_H = 640;

const BORDER = 96; // border height (px, each side)
const SELVEDGE = 14;
const PALLU_X = 1500;
const FRINGE_X = 1990;

// Matte silk vs. metallic zari in the ORM map.
const SILK_ORM = "rgb(0,196,0)";
const COTTON_ORM = "rgb(0,236,0)";
const ZARI_ORM = "rgb(0,92,225)";

export type Motif = "ikat" | "checks" | "buti" | "stripes";

export interface SareeDesign {
  id: string;
  name: string;
  weave: string;
  origin: string;
  note: string;
  /** Body ground: [mid, deep]. */
  body: [string, string];
  motif: Motif;
  motifColor: string;
  motifAccent: string;
  /** Motif threads are zari (metallic) rather than dyed silk. */
  motifZari: boolean;
  /** Border band: [mid, highlight]. */
  border: [string, string];
  borderZari: boolean;
  spire: string;
  bead: string;
  ink: string;
  pallu: string;
  palluMotif: string;
  wordmark: string;
  fringe: [string, string];
  /** Cotton weaves are matte all over. */
  cotton?: boolean;
  sheen: string;
}

export const SAREE_DESIGNS: SareeDesign[] = [
  {
    id: "kumbha-crimson",
    name: "Kumbha Crimson",
    weave: "Sambalpuri Bandha",
    origin: "Bargarh",
    note: "Madder-red mulberry silk, gold ikat lattice, temple-spire zari.",
    body: ["#6f1419", "#4f0c10"],
    motif: "ikat",
    motifColor: "#c9a25a",
    motifAccent: "#efe3cb",
    motifZari: true,
    border: ["#c9a25a", "#ecd49a"],
    borderZari: true,
    spire: "#6f1419",
    bead: "#efe3cb",
    ink: "#1c0b0b",
    pallu: "#efe3cb",
    palluMotif: "#6f1419",
    wordmark: "#6f1419",
    fringe: ["#c9a25a", "#6f1419"],
    sheen: "#c9a25a",
  },
  {
    id: "pasapali-noir",
    name: "Pasapali Noir",
    weave: "Sambalpuri Pasapali",
    origin: "Sonepur",
    note: "The chequered dice-board of Pasa, in ink and ivory with a crimson edge.",
    body: ["#1d1a19", "#0f0d0c"],
    motif: "checks",
    motifColor: "#ebe0c8",
    motifAccent: "#b8272e",
    motifZari: false,
    border: ["#9e1e24", "#c43a3f"],
    borderZari: false,
    spire: "#ebe0c8",
    bead: "#c9a25a",
    ink: "#0f0d0c",
    pallu: "#9e1e24",
    palluMotif: "#ebe0c8",
    wordmark: "#ebe0c8",
    fringe: ["#ebe0c8", "#1d1a19"],
    sheen: "#f0e6d0",
  },
  {
    id: "bomkai-indigo",
    name: "Bomkai Indigo",
    weave: "Bomkai Silk",
    origin: "Ganjam",
    note: "Night-indigo ground scattered with gold butis and a crimson temple border.",
    body: ["#1d2a55", "#101a3a"],
    motif: "buti",
    motifColor: "#d4ae62",
    motifAccent: "#c23a3a",
    motifZari: true,
    border: ["#a3242b", "#c9434a"],
    borderZari: false,
    spire: "#d4ae62",
    bead: "#f1e6cf",
    ink: "#0b1128",
    pallu: "#a3242b",
    palluMotif: "#d4ae62",
    wordmark: "#f1e6cf",
    fringe: ["#d4ae62", "#1d2a55"],
    sheen: "#9fb4ff",
  },
  {
    id: "tussar-madhu",
    name: "Tussar Madhu",
    weave: "Wild Tussar",
    origin: "Gopalpur",
    note: "Honey-gold raw tussar with fine warp stripes and a maroon border.",
    body: ["#c89a52", "#a87a38"],
    motif: "stripes",
    motifColor: "#6f1419",
    motifAccent: "#f3e2b8",
    motifZari: false,
    border: ["#6f1419", "#8e2a2d"],
    borderZari: false,
    spire: "#e7c987",
    bead: "#f3e2b8",
    ink: "#3a1508",
    pallu: "#6f1419",
    palluMotif: "#e7c987",
    wordmark: "#f3e2b8",
    fringe: ["#c89a52", "#6f1419"],
    sheen: "#ffe2a8",
  },
  {
    id: "kotpad-madder",
    name: "Kotpad Madder",
    weave: "Kotpad Cotton",
    origin: "Koraput",
    note: "Organic cotton dyed with aal root — rust, earth and ecru, entirely matte.",
    body: ["#8a3a24", "#6a2a18"],
    motif: "buti",
    motifColor: "#2a1a14",
    motifAccent: "#e8dcc2",
    motifZari: false,
    border: ["#2a1a14", "#3a261d"],
    borderZari: false,
    spire: "#b5552f",
    bead: "#e8dcc2",
    ink: "#1a0f0b",
    pallu: "#e8dcc2",
    palluMotif: "#8a3a24",
    wordmark: "#2a1a14",
    fringe: ["#8a3a24", "#2a1a14"],
    cotton: true,
    sheen: "#e8dcc2",
  },
  {
    id: "berhampuri-emerald",
    name: "Berhampuri Emerald",
    weave: "Berhampur Patta",
    origin: "Berhampur",
    note: "Temple-green patta silk with a heavy gold phoda kumbha border.",
    body: ["#0f5a43", "#083d2d"],
    motif: "ikat",
    motifColor: "#d6b56a",
    motifAccent: "#f2e7cf",
    motifZari: true,
    border: ["#caa257", "#ecd49a"],
    borderZari: true,
    spire: "#0f5a43",
    bead: "#a3242b",
    ink: "#05231a",
    pallu: "#a3242b",
    palluMotif: "#d6b56a",
    wordmark: "#f2e7cf",
    fringe: ["#caa257", "#0f5a43"],
    sheen: "#d6b56a",
  },
];

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
}

export function paintSaree(fontFamily: string, design: SareeDesign = SAREE_DESIGNS[0]) {
  const D = design;
  const albedo = document.createElement("canvas");
  const orm = document.createElement("canvas");
  albedo.width = orm.width = TEX_W;
  albedo.height = orm.height = TEX_H;
  const x = albedo.getContext("2d", { willReadFrequently: true })!;
  const m = orm.getContext("2d")!;
  const rand = rng(1948);
  const baseOrm = D.cotton ? COTTON_ORM : SILK_ORM;

  type Draw = (c: CanvasRenderingContext2D) => void;
  /** Fill a shape on the colour map; mark it metallic on the ORM map when it's zari. */
  const fill = (draw: Draw, color: string | CanvasGradient, metallic: boolean) => {
    x.fillStyle = color;
    draw(x);
    if (metallic && !D.cotton) {
      m.fillStyle = ZARI_ORM;
      draw(m);
    }
  };
  const rect = (x0: number, y0: number, w: number, h: number): Draw => (c) => c.fillRect(x0, y0, w, h);

  /** Ikat diamond: stacked hand-tied strokes whose edges bleed with a small random jitter. */
  const ikatDiamond = (cx: number, cy: number, s: number, color: string, metallic = false, alpha = 1) => {
    x.globalAlpha = alpha;
    for (let dy = -s; dy <= s; dy += 3) {
      const hw = s - Math.abs(dy);
      if (hw <= 0) continue;
      const j = (rand() - 0.5) * s * 0.35;
      fill(rect(cx - hw + j, cy + dy, hw * 2 + (rand() - 0.5) * 4, 2.4), color, metallic);
    }
    x.globalAlpha = 1;
  };

  /** Four-petal buti built from small ikat diamonds. */
  const buti = (cx: number, cy: number, s: number) => {
    const o = s * 1.05;
    ikatDiamond(cx, cy - o, s * 0.62, D.motifColor, D.motifZari);
    ikatDiamond(cx, cy + o, s * 0.62, D.motifColor, D.motifZari);
    ikatDiamond(cx - o, cy, s * 0.62, D.motifColor, D.motifZari);
    ikatDiamond(cx + o, cy, s * 0.62, D.motifColor, D.motifZari);
    ikatDiamond(cx, cy, s * 0.4, D.motifAccent);
  };

  // ── Body ground ────────────────────────────────────────────
  m.fillStyle = baseOrm;
  m.fillRect(0, 0, TEX_W, TEX_H);
  const ground = x.createLinearGradient(0, 0, 0, TEX_H);
  ground.addColorStop(0, D.body[1]);
  ground.addColorStop(0.5, D.body[0]);
  ground.addColorStop(1, D.body[1]);
  x.fillStyle = ground;
  x.fillRect(0, 0, FRINGE_X, TEX_H);

  const top = BORDER + SELVEDGE;
  const bottom = TEX_H - BORDER - SELVEDGE;
  const inner = { top: top + 26, bottom: bottom - 26 };

  if (D.motif === "ikat") {
    const step = 58;
    for (let row = 0, y = inner.top; y <= inner.bottom; y += step * 0.5, row++) {
      for (let xx = 40 + (row % 2) * step * 0.5; xx < PALLU_X - 30; xx += step) {
        ikatDiamond(xx, y, 12, D.motifColor, D.motifZari, 0.9);
        ikatDiamond(xx, y, 4, D.motifAccent);
      }
    }
  } else if (D.motif === "checks") {
    // Pasapali: an ikat-edged chequerboard with a dot in each dark square.
    const cell = 46;
    for (let r = 0, y = top + 8; y < bottom - 8; y += cell, r++) {
      for (let c = 0, xx = 0; xx < PALLU_X; xx += cell, c++) {
        const h = Math.min(cell, bottom - 8 - y);
        if ((r + c) % 2 === 0) {
          for (let dy = 0; dy < h; dy += 3) {
            const j = (rand() - 0.5) * 6;
            x.fillStyle = D.motifColor;
            x.fillRect(xx + j, y + dy, cell + (rand() - 0.5) * 4, 2.4);
          }
        } else {
          ikatDiamond(xx + cell / 2, y + h / 2, 7, D.motifAccent);
        }
      }
    }
  } else if (D.motif === "buti") {
    const step = 96;
    for (let row = 0, y = inner.top + 20; y <= inner.bottom - 10; y += step * 0.6, row++) {
      for (let xx = 60 + (row % 2) * step * 0.5; xx < PALLU_X - 40; xx += step) buti(xx, y, 11);
    }
  } else {
    // Stripes: fine warp stripes with a sparse ikat dot between them.
    for (let y = inner.top; y <= inner.bottom; y += 38) {
      fill(rect(0, y, PALLU_X, 3), D.motifColor, D.motifZari);
      fill(rect(0, y + 7, PALLU_X, 1.5), D.motifAccent, false);
    }
    for (let row = 0, y = inner.top + 19; y < inner.bottom; y += 76, row++) {
      for (let xx = 70 + (row % 2) * 90; xx < PALLU_X - 40; xx += 180) ikatDiamond(xx, y, 8, D.motifColor);
    }
  }

  // ── Borders (top and bottom, mirrored) ─────────────────────
  const border = (y0: number, flip: boolean) => {
    const dir = flip ? -1 : 1;
    const outer = flip ? y0 + BORDER : y0; // edge nearest the selvedge
    const band = x.createLinearGradient(0, y0, 0, y0 + BORDER);
    band.addColorStop(0, D.border[0]);
    band.addColorStop(0.5, D.border[1]);
    band.addColorStop(1, D.border[0]);
    fill(rect(0, y0, FRINGE_X, BORDER), band, D.borderZari);

    // Kumbha temple spires pointing into the body.
    x.fillStyle = D.spire;
    for (let xx = 0; xx < FRINGE_X; xx += 34) {
      x.beginPath();
      x.moveTo(xx, outer + dir * 8);
      x.lineTo(xx + 17, outer + dir * (BORDER - 34));
      x.lineTo(xx + 34, outer + dir * 8);
      x.closePath();
      x.fill();
    }
    x.fillStyle = D.bead;
    for (let xx = 17; xx < FRINGE_X; xx += 34) {
      x.beginPath();
      x.arc(xx, outer + dir * (BORDER - 20), 3.2, 0, Math.PI * 2);
      x.fill();
    }
    x.fillStyle = D.ink;
    x.fillRect(0, outer + dir * (BORDER - 8) - (flip ? 3 : 0), FRINGE_X, 3);
    x.fillRect(0, outer + dir * 4 - (flip ? 2 : 0), FRINGE_X, 2);
  };
  x.fillStyle = D.ink;
  x.fillRect(0, 0, FRINGE_X, SELVEDGE);
  x.fillRect(0, TEX_H - SELVEDGE, FRINGE_X, SELVEDGE);
  border(SELVEDGE, false);
  border(TEX_H - SELVEDGE - BORDER, true);

  // ── Pallu ──────────────────────────────────────────────────
  const pH = bottom - top;
  const stripes: [number, string, boolean][] = [
    [10, D.border[0], D.borderZari],
    [14, D.body[1], false],
    [6, D.motifColor, D.motifZari],
    [22, D.ink, false],
    [6, D.motifColor, D.motifZari],
    [14, D.body[1], false],
    [10, D.border[0], D.borderZari],
  ];
  let sx = PALLU_X;
  for (const [w, c, metallic] of stripes) {
    fill(rect(sx, 0, w, TEX_H), c, metallic);
    sx += w;
  }
  const panelX = sx;
  const panelW = FRINGE_X - 40 - panelX;
  x.fillStyle = D.pallu;
  x.fillRect(panelX, top, panelW, pH);
  fill(rect(FRINGE_X - 40, 0, 12, TEX_H), D.border[0], D.borderZari);
  x.fillStyle = D.body[1];
  x.fillRect(FRINGE_X - 28, 0, 16, TEX_H);
  fill(rect(FRINGE_X - 12, 0, 12, TEX_H), D.border[0], D.borderZari);

  // Large motifs framing the wordmark.
  for (let y = top + 40; y < top + pH - 20; y += 72) {
    for (const px of [panelX + 44, panelX + panelW - 44]) {
      ikatDiamond(px, y, 22, D.palluMotif, false, 0.95);
      ikatDiamond(px, y, 8, D.motifAccent === D.pallu ? D.motifColor : D.motifAccent);
    }
  }

  // Wordmark woven vertically down the pallu.
  x.save();
  x.translate(panelX + panelW / 2, top + pH / 2);
  x.rotate(-Math.PI / 2);
  x.textAlign = "center";
  x.textBaseline = "middle";
  x.fillStyle = D.wordmark;
  x.font = `800 112px ${fontFamily}`;
  x.fillText("VAYANA", 0, -8);
  // Bodoni's hairlines vanish at texture scale; a matching stroke keeps the letters whole.
  x.strokeStyle = D.wordmark;
  x.lineWidth = 5;
  x.lineJoin = "round";
  x.strokeText("VAYANA", 0, -8);
  x.font = `700 22px ${fontFamily}`;
  x.fillText(`·  ${D.origin.toUpperCase().split("").join(" ")}  ·  H A N D W O V E N  ·`, 0, 74);
  x.restore();

  // ── Weave: thread grid + slub noise over everything woven ──
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
  const slub = D.cotton ? 14 : 9;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() * 2 - 1) * slub;
    d[i] += n;
    d[i + 1] += n;
    d[i + 2] += n;
  }
  x.putImageData(img, 0, 0);

  // ── Fringe: tassels hanging off the pallu (transparent elsewhere) ──
  x.clearRect(FRINGE_X, 0, TEX_W - FRINGE_X, TEX_H);
  m.fillStyle = D.borderZari ? ZARI_ORM : baseOrm;
  m.fillRect(FRINGE_X, 0, TEX_W - FRINGE_X, TEX_H);
  for (let y = 4; y < TEX_H - 4; y += 12) {
    const len = 30 + rand() * 26;
    x.fillStyle = (y / 12) % 3 < 1 ? D.fringe[0] : D.fringe[1];
    for (let k = 0; k < 4; k++) x.fillRect(FRINGE_X, y + k * 2.2, len - k * 3, 1.6);
    x.fillStyle = D.border[1];
    x.fillRect(FRINGE_X + 6, y - 1, 5, 9); // knot
  }

  return { albedo, orm };
}
