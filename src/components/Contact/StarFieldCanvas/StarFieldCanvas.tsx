"use client";
import { useEffect, useRef } from "react";
import styles from "./StarFieldCanvas.module.css";

const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvasEl = canvasRef.current;
    const ctx = canvasEl.getContext("2d")!;
    
    let scale = 1;
    let width = window.innerWidth * scale;
    let height = window.innerHeight * scale;
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
    let touchInput = false;

    let stars: { x: number; y: number; z: number }[] = [];
    const STAR_COUNT = (width + height) / 8;

    function generate() {
      const STAR_COUNT = (width + height) / 8; // recalculate each time
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    }

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvasEl.width = width * 2;
      canvasEl.height = height * 2;
      ctx.scale(2, 2);
    }
    function recycleStar(star: { x: number; y: number; z: number }) {
      const direction = velocity.x > 0 ? "l" : "r";
      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
      star.x = direction === "l" ? -OVERFLOW_THRESHOLD : width + OVERFLOW_THRESHOLD;
      star.y = Math.random() * height;
    }

    function update() {
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    }
    function render() {
      ctx.clearRect(0, 0, width, height);
    
      for (const star of stars) {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = STAR_SIZE * star.z;
        ctx.globalAlpha = 0.5 + 0.5 * Math.random();
        ctx.strokeStyle = STAR_COLOR;
    
        const tailX = velocity.x * 2 || 0.5;
        const tailY = velocity.y * 2 || 0.5;
    
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + tailX, star.y + tailY);
        ctx.stroke();
      }
    }

    let animationFrameId: number;
    function animate() {
      update();
      render();
      animationFrameId = requestAnimationFrame(animate);
    }

    function movePointer(x: number, y: number) {
      if (pointerX !== null && pointerY !== null) {
        const ox = x - pointerX;
        const oy = y - pointerY;
        velocity.tx += (ox / 8 / scale) * (touchInput ? 1 : -1);
        velocity.ty += (oy / 8 / scale) * (touchInput ? 1 : -1);
      }
      pointerX = x;
      pointerY = y;
    }

    function onMouseMove(e: MouseEvent) {
      touchInput = false;
      movePointer(e.clientX * scale, e.clientY * scale);
    }

    function onTouchMove(e: TouchEvent) {
      touchInput = true;
      movePointer(e.touches[0].clientX * scale, e.touches[0].clientY * scale);
      e.preventDefault();
    }

    function onMouseLeave() {
      pointerX = null;
      pointerY = null;
    }

    generate();
    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchend", onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchend", onMouseLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={styles.canvas} />
  );
}