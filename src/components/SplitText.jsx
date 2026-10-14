import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Per-character reveal, after React Bits' <SplitText />.
export default function SplitText({ text, className = '', delay = 40, duration = 0.9, startDelay = 0.1 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const chars = ref.current.querySelectorAll('.split-char');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -60 },
        { opacity: 1, y: 0, rotateX: 0, duration, ease: 'power3.out', stagger: delay / 1000, delay: startDelay },
      );
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`split-parent ${className}`} aria-label={text}>
      {text.split(' ').map((word, wi, words) => (
        <span key={wi} className="split-word" aria-hidden="true">
          {[...word].map((ch, ci) => (
            <span key={ci} className="split-char">{ch}</span>
          ))}
          {wi < words.length - 1 && <span className="split-char">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
