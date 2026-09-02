import React, { useEffect, useRef } from 'react';

// 1. Idagdag ang 'theme' sa props
export default function StarfieldBackground({ children, count = 350, speed = 0.4, twinkle = true, theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    window.addEventListener('scroll', updateSize);

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.8,
      speed: (Math.random() * 0.4 + 0.1) * speed,
      alpha: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Ngayon, direkta nang nababasa nito ang theme prop na galing sa App.js mo
      ctx.fillStyle = theme === 'light' ? '#1e293b' : '#ffffff';

      stars.forEach((star) => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;

        if (twinkle) {
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 1 || star.alpha < 0.3) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('scroll', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, speed, twinkle, theme]); // 2. Idagdag ang 'theme' dito para mag-re-run kapag nagpalit ng mode

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}