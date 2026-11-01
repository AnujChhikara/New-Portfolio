import { useEffect, useRef } from "react";

type Sprite = readonly (readonly number[])[];
type Rgb = { r: number; g: number; b: number };
type Island = { cx: number; half: number; height: number };

const BIRD_FRAMES: readonly Sprite[] = [
  [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
];

const PINE_SPRITE: Sprite = [
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
];

type Pine = {
  x: number;
  baseY: number;
  px: number;
  alpha: number;
};

type Firefly = {
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  alpha: number;
};

type Ripple = {
  x: number;
  y: number;
  width: number;
  speed: number;
  alpha: number;
};

type Bird = {
  x: number;
  baseY: number;
  speed: number;
  amp: number;
  freq: number;
  phase: number;
  frame: number;
  timer: number;
  rate: number;
  px: number;
  dir: 1 | -1;
};

function parseRgb(value: string, fallback: Rgb): Rgb {
  const parts = value.match(/\d+(?:\.\d+)?/g);
  if (!parts || parts.length < 3) return fallback;
  return { r: +parts[0], g: +parts[1], b: +parts[2] };
}

function rgba(color: Rgb, alpha: number) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: Sprite,
  x: number,
  y: number,
  px: number,
  color: Rgb,
  alpha: number
) {
  ctx.fillStyle = rgba(color, alpha);
  for (let row = 0; row < sprite.length; row++) {
    for (let col = 0; col < sprite[row].length; col++) {
      if (sprite[row][col]) {
        ctx.fillRect(x + col * px, y + row * px, px, px);
      }
    }
  }
}

function mirrorSprite(sprite: Sprite): Sprite {
  return sprite.map((row) => [...row].reverse());
}

function islandTop(x: number, island: Island, waterline: number) {
  const t = (x - island.cx) / island.half;
  return waterline - Math.sqrt(Math.max(0, 1 - t * t)) * island.height;
}

/**
 * Misty Japanese lakeside for the footer: layered mountains, pine islands,
 * a torii gate, a hilltop pagoda, stone lanterns, still water and a mirrored
 * reflection. Purely decorative, so it stays out of the accessibility tree
 * and falls back to a still frame when motion is reduced or off screen.
 */
export function PixelFooterScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let unit = 4;
    let waterline = 0;
    let ink: Rgb = { r: 86, g: 119, b: 112 };
    let accent: Rgb = { r: 224, g: 165, b: 58 };
    let mist: Rgb = { r: 255, g: 255, b: 255 };

    let leftIsland: Island = { cx: 0, half: 1, height: 0 };
    let rightIsland: Island = { cx: 0, half: 1, height: 0 };
    let toriiX = 0;
    let toriiBaseY = 0;
    let pagodaX = 0;
    let pagodaBaseY = 0;
    let stoneLanterns: Array<{ x: number; baseY: number }> = [];
    let stones: Array<{ x: number; y: number }> = [];
    let farPines: Pine[] = [];
    let shorePines: Pine[] = [];
    let nearPines: Pine[] = [];
    let fireflies: Firefly[] = [];
    let ripples: Ripple[] = [];
    let birds: Bird[] = [];

    let elapsed = 0;
    let lastTime = 0;
    let rafId = 0;
    let visible = true;

    const readTheme = () => {
      const styles = getComputedStyle(canvas);
      ink = parseRgb(styles.color, ink);
      accent = parseRgb(styles.getPropertyValue("--scene-accent"), accent);
      mist = parseRgb(styles.getPropertyValue("--scene-mist"), mist);
    };

    const buildScene = () => {
      unit = width < 520 ? 3 : width < 900 ? 4 : 5;
      waterline = Math.round(height * 0.76);

      leftIsland = {
        cx: width * 0.25,
        half: width * 0.145,
        height: height * 0.055,
      };
      rightIsland = {
        cx: width * 0.72,
        half: width * 0.115,
        height: height * 0.1,
      };

      toriiX = width * 0.47;
      toriiBaseY = waterline - unit;

      pagodaX = rightIsland.cx;
      pagodaBaseY = islandTop(pagodaX, rightIsland, waterline);

      stoneLanterns = [
        {
          x: rightIsland.cx - rightIsland.half * 0.58,
          baseY: islandTop(
            rightIsland.cx - rightIsland.half * 0.58,
            rightIsland,
            waterline
          ),
        },
        {
          x: rightIsland.cx + rightIsland.half * 0.56,
          baseY: islandTop(
            rightIsland.cx + rightIsland.half * 0.56,
            rightIsland,
            waterline
          ),
        },
      ];

      stones = Array.from({ length: 4 }, (_, i) => ({
        x: width * (0.505 + i * 0.038),
        y: waterline + (i % 2) * unit,
      }));

      farPines = [];
      const distantCount = Math.max(12, Math.round(width / 90));
      for (let i = 0; i < distantCount; i++) {
        farPines.push({
          x: Math.random() * width,
          baseY: waterline - unit,
          px: width < 520 ? 1 : 2,
          alpha: 0.14 + Math.random() * 0.16,
        });
      }

      shorePines = [];
      const shoreCount = Math.max(6, Math.round(width / 190));
      for (let i = 0; i < shoreCount; i++) {
        shorePines.push({
          x: (i + Math.random() * 0.8) * (width / shoreCount),
          baseY: waterline + 2,
          px: width < 520 ? 2 : 3,
          alpha: 0.28 + Math.random() * 0.16,
        });
      }

      nearPines = [];
      nearPines.push({
        x: width * 0.035,
        baseY: waterline + 2,
        px: unit,
        alpha: 0.72,
      });
      nearPines.push({
        x: width * 0.955,
        baseY: waterline + 2,
        px: unit,
        alpha: 0.72,
      });
      const leftPines = [
        { f: -0.62, px: unit },
        { f: -0.12, px: unit + 1 },
        { f: 0.42, px: unit },
      ];
      for (const pine of leftPines) {
        const x = leftIsland.cx + leftIsland.half * pine.f;
        nearPines.push({
          x,
          baseY: islandTop(x, leftIsland, waterline) + 2,
          px: pine.px,
          alpha: 0.82,
        });
      }

      const rightPines = [
        { f: -0.68, px: unit },
        { f: 0.46, px: unit + 1 },
        { f: 0.82, px: unit },
      ];
      for (const pine of rightPines) {
        const x = rightIsland.cx + rightIsland.half * pine.f;
        nearPines.push({
          x,
          baseY: islandTop(x, rightIsland, waterline) + 2,
          px: pine.px,
          alpha: 0.82,
        });
      }

      fireflies = Array.from(
        { length: Math.max(7, Math.round(width / 150)) },
        () => ({
          x: Math.random() * width,
          y: waterline - height * (0.04 + Math.random() * 0.36),
          size: Math.random() > 0.72 ? 2 : 1,
          speed: 0.05 + Math.random() * 0.16,
          sway: 4 + Math.random() * 12,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.25 + Math.random() * 0.45,
        })
      );

      ripples = Array.from(
        { length: Math.max(7, Math.round(width / 120)) },
        () => ({
          x: Math.random() * width,
          y: waterline + 10 + Math.random() * (height - waterline - 12),
          width: 8 + Math.random() * 34,
          speed: 0.04 + Math.random() * 0.12,
          alpha: 0.05 + Math.random() * 0.08,
        })
      );

      const birdPx = width < 520 ? 2 : 3;
      const birdSpan = Math.max(1, width + 60);
      birds = Array.from(
        { length: Math.max(3, Math.min(5, Math.round(width / 320))) },
        () => {
          const dir: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
          return {
            x: motionQuery.matches
              ? Math.random() * width
              : dir === 1
                ? -20
                : birdSpan,
            baseY: height * (0.16 + Math.random() * 0.28),
            speed: 0.22 + Math.random() * 0.34,
            amp: 4 + Math.random() * 10,
            freq: 0.008 + Math.random() * 0.012,
            phase: Math.random() * Math.PI * 2,
            frame: Math.floor(Math.random() * BIRD_FRAMES.length),
            timer: 0,
            rate: 7 + Math.floor(Math.random() * 8),
            px: birdPx,
            dir,
          };
        }
      );
    };

    const drawMountains = () => {
      const layers = [
        {
          offset: 20,
          amplitude: height * 0.09,
          base: waterline - height * 0.17,
          alpha: 0.08,
        },
        {
          offset: 260,
          amplitude: height * 0.12,
          base: waterline - height * 0.1,
          alpha: 0.13,
        },
        {
          offset: 520,
          amplitude: height * 0.07,
          base: waterline - height * 0.05,
          alpha: 0.18,
        },
      ];
      const step = unit;
      for (const layer of layers) {
        ctx.fillStyle = rgba(ink, layer.alpha);
        for (let x = 0; x < width; x += step) {
          const y =
            layer.base +
            Math.sin((x + layer.offset) * 0.004) * layer.amplitude +
            Math.sin((x + layer.offset) * 0.011) * layer.amplitude * 0.45;
          const py = Math.round(y / step) * step;
          ctx.fillRect(x, py, step, waterline - py);
        }
      }
    };

    const drawMistBand = (
      centerY: number,
      thickness: number,
      alpha: number
    ) => {
      const gradient = ctx.createLinearGradient(
        0,
        centerY - thickness / 2,
        0,
        centerY + thickness / 2
      );
      gradient.addColorStop(0, rgba(mist, 0));
      gradient.addColorStop(0.5, rgba(mist, alpha));
      gradient.addColorStop(1, rgba(mist, 0));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, centerY - thickness / 2, width, thickness);
    };

    const drawIsland = (island: Island, alphaScale: number) => {
      const step = unit;
      ctx.fillStyle = rgba(ink, 0.72 * alphaScale);
      for (
        let x = island.cx - island.half;
        x < island.cx + island.half;
        x += step
      ) {
        const top = islandTop(x + step / 2, island, waterline);
        const py = Math.round(top / step) * step;
        ctx.fillRect(x, py, step, waterline - py + unit);
      }

      // Shore rocks.
      ctx.fillStyle = rgba(ink, 0.8 * alphaScale);
      for (const f of [-0.72, -0.34, 0.28, 0.68]) {
        const x = island.cx + island.half * f;
        const top = islandTop(x, island, waterline);
        ctx.fillRect(x - unit, top - unit, 2 * unit, unit);
      }
    };

    const drawTorii = (alphaScale: number, glow: boolean) => {
      const x = toriiX;
      const baseY = toriiBaseY;
      const a = (v: number) => v * alphaScale;
      const rect = (
        dx: number,
        dy: number,
        w: number,
        h: number,
        alpha: number,
        tone: "ink" | "accent" = "ink"
      ) => {
        ctx.fillStyle = rgba(tone === "ink" ? ink : accent, alpha);
        ctx.fillRect(x + dx * unit, baseY + dy * unit, w * unit, h * unit);
      };

      // Ground strip beneath the gate.
      rect(-14, -1, 28, 1, a(0.7));

      // Top lintel with lifted ends.
      rect(-14, -23, 28, 2, a(0.9));
      rect(-13, -25, 4, 2, a(0.9));
      rect(9, -25, 4, 2, a(0.9));
      rect(-11, -24, 22, 1, a(0.9));

      // Plaque and second beam.
      rect(-2, -22, 4, 3, a(0.92));
      rect(-11, -16, 22, 2, a(0.85));

      // Pillars and feet.
      rect(-9, -21, 2, 20, a(0.9));
      rect(7, -21, 2, 20, a(0.9));
      rect(-10, -1, 3, 1, a(0.85));
      rect(7, -1, 3, 1, a(0.85));

      // Hanging lanterns.
      if (glow) {
        ctx.shadowColor = rgba(accent, 0.55);
        ctx.shadowBlur = unit * 2.5;
      }
      for (const offset of [-6, 6]) {
        rect(offset, -22, 1, 6, a(0.8));
        rect(offset - 1, -16, 3, 3, a(0.95), "accent");
      }
      ctx.shadowBlur = 0;
    };

    const drawPagoda = (alphaScale: number, glow: boolean) => {
      const x = pagodaX;
      const baseY = pagodaBaseY + unit;
      const a = (v: number) => v * alphaScale;
      const rect = (
        dx: number,
        dy: number,
        w: number,
        h: number,
        alpha: number,
        tone: "ink" | "accent" = "ink"
      ) => {
        ctx.fillStyle = rgba(tone === "ink" ? ink : accent, alpha);
        ctx.fillRect(x + dx * unit, baseY + dy * unit, w * unit, h * unit);
      };

      // Stone base.
      rect(-8, -2, 16, 2, a(0.72));

      // Stone steps down the hill.
      rect(-9, 0, 7, 1, a(0.45));
      rect(-8, 1, 7, 1, a(0.4));
      rect(-7, 2, 7, 1, a(0.35));

      // Lower hall.
      rect(-5, -9, 10, 7, a(0.86));
      if (glow) {
        ctx.shadowColor = rgba(accent, 0.5);
        ctx.shadowBlur = unit * 2;
      }
      rect(-3, -7, 2, 3, a(0.95), "accent");
      rect(1, -7, 2, 3, a(0.95), "accent");
      ctx.shadowBlur = 0;

      // Lower roof with lifted corners.
      rect(-6, -11, 12, 2, a(0.9));
      rect(-7, -12, 1, 2, a(0.9));
      rect(6, -12, 1, 2, a(0.9));
      rect(-4, -12, 8, 1, a(0.9));

      // Upper hall.
      rect(-3, -16, 6, 4, a(0.86));

      // Upper roof.
      rect(-4, -18, 8, 2, a(0.9));
      rect(-5, -19, 1, 2, a(0.9));
      rect(4, -19, 1, 2, a(0.9));
      rect(-2, -19, 4, 1, a(0.9));

      // Spire.
      rect(0, -22, 1, 3, a(0.9));
      rect(-1, -23, 3, 1, a(0.9));
    };

    const drawStoneLantern = (
      lantern: { x: number; baseY: number },
      alphaScale: number,
      glow: boolean
    ) => {
      const a = (v: number) => v * alphaScale;
      const rect = (
        dx: number,
        dy: number,
        w: number,
        h: number,
        alpha: number,
        tone: "ink" | "accent" = "ink"
      ) => {
        ctx.fillStyle = rgba(tone === "ink" ? ink : accent, alpha);
        ctx.fillRect(
          lantern.x + dx * unit,
          lantern.baseY + dy * unit,
          w * unit,
          h * unit
        );
      };

      rect(-1, -1, 2, 1, a(0.7));
      rect(-1, -3, 1, 2, a(0.75));
      if (glow) {
        ctx.shadowColor = rgba(accent, 0.5);
        ctx.shadowBlur = unit * 2;
      }
      rect(-1, -5, 2, 2, a(0.95), "accent");
      ctx.shadowBlur = 0;
      rect(-2, -6, 4, 1, a(0.8));
    };

    const drawStones = (alphaScale: number) => {
      ctx.fillStyle = rgba(ink, 0.62 * alphaScale);
      for (const stone of stones) {
        ctx.fillRect(stone.x, stone.y, 2 * unit, unit);
      }
    };

    const paintLandscape = (alphaScale = 1, glow = true) => {
      for (const pine of farPines) {
        drawSprite(
          ctx,
          PINE_SPRITE,
          pine.x,
          pine.baseY - PINE_SPRITE.length * pine.px,
          pine.px,
          ink,
          pine.alpha * alphaScale
        );
      }

      for (const pine of shorePines) {
        drawSprite(
          ctx,
          PINE_SPRITE,
          pine.x,
          pine.baseY - PINE_SPRITE.length * pine.px,
          pine.px,
          ink,
          pine.alpha * alphaScale
        );
      }

      drawIsland(leftIsland, alphaScale);
      drawIsland(rightIsland, alphaScale);

      for (const pine of nearPines) {
        drawSprite(
          ctx,
          PINE_SPRITE,
          pine.x,
          pine.baseY - PINE_SPRITE.length * pine.px,
          pine.px,
          ink,
          pine.alpha * alphaScale
        );
      }

      drawStones(alphaScale);
      drawTorii(alphaScale, glow);
      drawPagoda(alphaScale, glow);
      for (const lantern of stoneLanterns) {
        drawStoneLantern(lantern, alphaScale, glow);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      drawMountains();
      drawMistBand(waterline - height * 0.17, height * 0.26, 0.5);

      paintLandscape();

      // Mirrored reflection in the still water.
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, waterline, width, height - waterline);
      ctx.clip();
      ctx.translate(Math.sin(elapsed * 0.4) * 1.5, waterline * 2);
      ctx.scale(1, -1);
      paintLandscape(0.12, false);
      ctx.restore();

      // Waterline and drifting ripples.
      ctx.fillStyle = rgba(ink, 0.16);
      ctx.fillRect(0, waterline, width, 1);
      for (const ripple of ripples) {
        ctx.fillStyle = rgba(ink, ripple.alpha);
        ctx.fillRect(
          Math.round(ripple.x),
          Math.round(ripple.y),
          ripple.width,
          1
        );
      }

      // Very subtle waves rolling across the water.
      const waveLayers = [
        {
          y: waterline + height * 0.05,
          amplitude: 1.5,
          frequency: 0.02,
          speed: 0.35,
          alpha: 0.07,
        },
        {
          y: waterline + height * 0.12,
          amplitude: 1.2,
          frequency: 0.016,
          speed: -0.28,
          alpha: 0.06,
        },
        {
          y: waterline + height * 0.19,
          amplitude: 1,
          frequency: 0.026,
          speed: 0.22,
          alpha: 0.05,
        },
      ];
      const waveStep = Math.max(2, unit * 2);
      for (const layer of waveLayers) {
        ctx.fillStyle = rgba(ink, layer.alpha);
        for (let x = 0; x < width; x += waveStep) {
          const offset =
            Math.sin(x * layer.frequency + elapsed * layer.speed) *
            layer.amplitude;
          ctx.fillRect(x, Math.round(layer.y + offset), waveStep, 1);
        }
      }

      drawMistBand(waterline - height * 0.04, height * 0.14, 0.35);

      // Birds crossing the sky.
      for (const bird of birds) {
        const y =
          bird.baseY +
          Math.sin(elapsed * bird.freq * 60 + bird.phase) * bird.amp;
        const sprite =
          bird.dir === -1
            ? mirrorSprite(BIRD_FRAMES[bird.frame])
            : BIRD_FRAMES[bird.frame];
        drawSprite(ctx, sprite, bird.x, y, bird.px, ink, 0.62);
      }

      // Fireflies.
      ctx.shadowColor = rgba(accent, 0.55);
      ctx.shadowBlur = 5;
      for (const firefly of fireflies) {
        const flicker = 0.35 + 0.65 * Math.sin(elapsed * 1.6 + firefly.phase);
        const x =
          firefly.x + Math.sin(elapsed * 0.5 + firefly.phase) * firefly.sway;
        ctx.fillStyle = rgba(accent, firefly.alpha * flicker);
        ctx.fillRect(
          Math.round(x),
          Math.round(firefly.y),
          firefly.size,
          firefly.size
        );
      }
      ctx.shadowBlur = 0;
    };

    const step = (delta: number) => {
      elapsed += delta / 60;

      for (const firefly of fireflies) {
        firefly.y -= firefly.speed * delta;
        if (firefly.y < waterline - height * 0.42) {
          firefly.y = waterline - height * 0.03;
          firefly.x = Math.random() * width;
        }
      }

      for (const ripple of ripples) {
        ripple.x += ripple.speed * delta;
        if (ripple.x > width + ripple.width) {
          ripple.x = -ripple.width;
        }
      }

      for (const bird of birds) {
        bird.x += bird.speed * bird.dir * delta;
        bird.timer += delta;
        if (bird.timer >= bird.rate) {
          bird.timer = 0;
          bird.frame = (bird.frame + 1) % BIRD_FRAMES.length;
        }

        if (bird.dir === 1 && bird.x > width + 40) {
          bird.x = -40;
          bird.baseY = height * (0.16 + Math.random() * 0.28);
        } else if (bird.dir === -1 && bird.x < -40) {
          bird.x = width + 40;
          bird.baseY = height * (0.16 + Math.random() * 0.28);
        }
      }
    };

    const shouldRun = () => visible && !document.hidden && !motionQuery.matches;

    const tick = (now: number) => {
      const delta = Math.min(48, now - (lastTime || now)) / 16.667;
      lastTime = now;
      step(delta);
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const sync = () => {
      if (shouldRun()) {
        if (!rafId) {
          lastTime = 0;
          rafId = requestAnimationFrame(tick);
        }
        return;
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      draw();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
      draw();
    };

    readTheme();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readTheme();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => sync();
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", sync);

    sync();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
