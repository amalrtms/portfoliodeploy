import { useEffect, useRef } from 'react';
import { animate, motion, useInView } from 'motion/react';

// Shimmering text, after React Bits' <ShinyText />.
export function ShinyText({ children, className = '', speed = 4 }) {
  return (
    <span className={`shiny-text ${className}`} style={{ animationDuration: `${speed}s` }}>
      {children}
    </span>
  );
}

// Fade/slide in on scroll, after React Bits' <AnimatedContent />.
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

// Counts up when scrolled into view, after React Bits' <CountUp />.
export function CountUp({ to, decimals = 0, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, duration]);

  return <span ref={ref}>{(0).toFixed(decimals) + suffix}</span>;
}

// Card with a cursor-following glow, after React Bits' <SpotlightCard />.
export function SpotlightCard({ children, className = '', color = 'rgba(156, 194, 122, 0.16)' }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
    ref.current.style.setProperty('--spot', color);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

// Infinite horizontal loop, after React Bits' <LogoLoop />.
export function LogoLoop({ items, speed = 40, reverse = false }) {
  const list = [...items, ...items];
  return (
    <div className="loop" aria-hidden="true">
      <div className="loop-track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        {list.map((t, i) => (
          <span className="loop-item" key={i}>
            {t}
            <span className="loop-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// Click sparks across the whole page, after React Bits' <ClickSpark />.
export function ClickSpark({ color = '#9CC27A', count = 8, radius = 22, duration = 420 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let sparks = [];
    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks = sparks.filter((s) => t - s.start < duration);
      for (const s of sparks) {
        const p = (t - s.start) / duration;
        const eased = p * (2 - p);
        const dist = eased * radius;
        const len = 10 * (1 - eased);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x + dist * Math.cos(s.a), s.y + dist * Math.sin(s.a));
        ctx.lineTo(s.x + (dist + len) * Math.cos(s.a), s.y + (dist + len) * Math.sin(s.a));
        ctx.stroke();
      }
      raf = sparks.length ? requestAnimationFrame(draw) : 0;
    };

    const onClick = (e) => {
      const now = performance.now();
      for (let i = 0; i < count; i++) sparks.push({ x: e.clientX, y: e.clientY, a: (2 * Math.PI * i) / count, start: now });
      if (!raf) raf = requestAnimationFrame(draw);
    };
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [color, count, radius, duration]);

  return <canvas ref={canvasRef} className="click-spark" aria-hidden="true" />;
}
