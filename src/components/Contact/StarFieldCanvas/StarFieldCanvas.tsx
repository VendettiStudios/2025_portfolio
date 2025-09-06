"use client";
import { useEffect, useRef } from "react";
import styles from "./StarFieldCanvas.module.css";

const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50; // wrap margin

type Star = { x: number; y: number; z: number };

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasEl = canvasRef.current;
    const ctx = canvasEl.getContext("2d")!;

    let width = 0;
    let height = 0;
    let pointerX: number | null = null;
    let pointerY: number | null = null;

    // remove zoom component to prevent long-run drift/clumping
    const velocity = { x: 0, y: 0, tx: 0, ty: 0 }; // no z

    let touchInput = false;
    const stars: Star[] = [];

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function generate() {
      const count = Math.floor((width + height) / 6); // slightly denser than /8
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    function update() {
      // ease velocity towards target
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      const band = OVERFLOW_THRESHOLD;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // parallax motion only (no zoom drift)
        s.x += velocity.x * s.z;
        s.y += velocity.y * s.z;

        // tiny Brownian jitter (prevents perfectly static look on idle)
        s.x += (Math.random() - 0.5) * 0.02;
        s.y += (Math.random() - 0.5) * 0.02;

        // wrap (toroidal) to avoid gaps
        if (s.x < -band) s.x += width + band * 2;
        if (s.x > width + band) s.x -= width + band * 2;
        if (s.y < -band) s.y += height + band * 2;
        if (s.y > height + band) s.y -= height + band * 2;
      }
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      // clamp tail length so fast flicks don’t thin the field
      const speed = Math.hypot(velocity.x, velocity.y);
      const tailScale = Math.min(2 + speed * 0.12, 10);
      const baseTailX = velocity.x || 0.25;
      const baseTailY = velocity.y || 0.25;

      for (const s of stars) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = STAR_SIZE * s.z;
        ctx.globalAlpha = 0.5 + 0.5 * Math.random();
        ctx.strokeStyle = STAR_COLOR;

        const tailX = baseTailX * tailScale;
        const tailY = baseTailY * tailScale;

        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + tailX, s.y + tailY);
        ctx.stroke();
      }
    }

    let raf = 0;
    function animate() {
      update();
      render();
      raf = requestAnimationFrame(animate);
    }

    function movePointer(x: number, y: number) {
      if (pointerX !== null && pointerY !== null) {
        const ox = x - pointerX;
        const oy = y - pointerY;
        velocity.tx += (ox / 8) * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8) * (touchInput ? 1 : -1);
      }
      pointerX = x;
      pointerY = y;
    }

    function onMouseMove(e: MouseEvent) {
      touchInput = false;
      movePointer(e.clientX, e.clientY);
    }
    function onTouchMove(e: TouchEvent) {
      touchInput = true;
      movePointer(e.touches[0].clientX, e.touches[0].clientY);
      e.preventDefault();
    }
    function onLeave() {
      pointerX = null;
      pointerY = null;
    }

    resize();
    generate();
    animate();

    const onResize = () => {
      resize();
      generate(); // keep density uniform after resize
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}