const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const paths = {
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  download: <><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="m7 11 5 5 5-5" /><path d="M12 4v12" /></>,
  arrow: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  down: <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>,
  book: <><path d="M3 19a9 9 0 0 1 9 0 9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0 9 9 0 0 1 9 0" /><path d="M3 6v13" /><path d="M12 6v13" /><path d="M21 6v13" /></>,
  cricket: <><path d="m14 6 4 4-9 9a2 2 0 0 1-3 0l-1-1a2 2 0 0 1 0-3z" /><path d="m17 3 4 4-2 2-4-4z" /><circle cx="18" cy="18" r="2" /></>,
  music: <><circle cx="6" cy="17" r="3" /><circle cx="16" cy="15" r="3" /><path d="M9 17V5l10-2v12" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />,
  award: <><circle cx="12" cy="9" r="6" /><path d="m9 14.2-1 7.8 4-2 4 2-1-7.8" /></>,
  cap: <><path d="M22 9 12 4 2 9l10 5 10-5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
};

export default function Icon({ name, size = 20, ...rest }) {
  return (
    <svg {...base} width={size} height={size} {...rest}>
      {paths[name]}
    </svg>
  );
}
