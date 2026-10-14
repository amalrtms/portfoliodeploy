import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, .chip, .tag, .cert';

// Four corner brackets that lock onto links and buttons, after React Bits' <TargetCursor />.
export default function TargetCursor() {
  const wrap = useRef(null);
  const dot = useRef(null);
  const corners = useRef([]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.body.classList.add('hide-cursor');

    const m = { x: -100, y: -100, active: false, target: null };
    const s = { cx: [0, 0, 0, 0], cy: [0, 0, 0, 0], spin: 0 };
    const onMove = (e) => {
      m.x = e.clientX;
      m.y = e.clientY;
      m.active = true;
      m.target = e.target.closest?.(INTERACTIVE) || null;
    };
    const onLeave = () => (m.active = false);
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);

    let raf;
    let last = performance.now();
    const loop = (t) => {
      const dt = Math.min(t - last, 50);
      last = t;
      const el = m.target;
      let tx, ty;
      if (el) {
        const r = el.getBoundingClientRect();
        const pad = 6;
        tx = [r.left - pad, r.right + pad, r.right + pad, r.left - pad];
        ty = [r.top - pad, r.top - pad, r.bottom + pad, r.bottom + pad];
      } else {
        s.spin += dt * 0.0012;
        const R = 13 * Math.SQRT2;
        tx = [];
        ty = [];
        for (let i = 0; i < 4; i++) {
          const a = s.spin + Math.PI * (1.25 + i * 0.5);
          tx.push(m.x + R * Math.cos(a));
          ty.push(m.y + R * Math.sin(a));
        }
      }
      const k = el ? 0.25 : 0.35;
      for (let i = 0; i < 4; i++) {
        s.cx[i] += (tx[i] - s.cx[i]) * k;
        s.cy[i] += (ty[i] - s.cy[i]) * k;
        const rot = el ? i * 90 : (s.spin * 180) / Math.PI + i * 90;
        corners.current[i].style.transform = `translate(${s.cx[i]}px, ${s.cy[i]}px) rotate(${rot}deg)`;
      }
      wrap.current.style.opacity = m.active ? 1 : 0;
      wrap.current.classList.toggle('is-locked', !!el);
      dot.current.style.transform = `translate(${m.x}px, ${m.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.body.classList.remove('hide-cursor');
    };
  }, []);

  return (
    <div ref={wrap} className="cur-target" aria-hidden="true">
      <span ref={dot} className="cur-target-dot" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} ref={(el) => (corners.current[i] = el)} className="cur-corner" />
      ))}
    </div>
  );
}
