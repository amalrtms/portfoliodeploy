import { useState } from 'react';
import Aurora from './components/Aurora';
import SplitText from './components/SplitText';
import Icon from './components/Icons';
import { ShinyText, Reveal, CountUp, SpotlightCard, LogoLoop, ClickSpark } from './components/Effects';
import useScrolled from './components/useScrolled';
import { profile, stats, about, projects, skills, education, certifications } from './data';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#top" className="nav-logo" aria-label="Back to top">
        amal<span>.</span>
      </a>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Primary">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <a className="nav-cta" href={profile.resume} download onClick={() => setOpen(false)}>
          Resume <Icon name="download" size={15} />
        </a>
      </nav>
      <button className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon name={open ? 'close' : 'menu'} />
      </button>
    </header>
  );
}

function SectionHead({ eyebrow, title, children }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-sub">{children}</p>}
    </Reveal>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <Aurora />
      <div className="hero-fade" />
      <div className="container hero-inner">
        <Reveal y={12}>
          <p className="eyebrow hero-eyebrow">
            <span className="dot" /> <ShinyText>Open to internships and new-grad roles</ShinyText>
          </p>
        </Reveal>
        <h1 className="hero-title">
          <SplitText text="Amal" className="hero-first" />{' '}
          <SplitText text="Roy" className="hero-last" startDelay={0.25} />
        </h1>
        <Reveal delay={0.5}>
          <p className="hero-tagline">{profile.tagline}</p>
        </Reveal>
        <Reveal delay={0.65} className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View projects <Icon name="down" size={17} />
          </a>
          <a className="btn btn-ghost" href={profile.resume} download>
            Download resume <Icon name="download" size={17} />
          </a>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </Reveal>
        <Reveal delay={0.8} className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">
                <CountUp to={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <SectionHead eyebrow="About" title="A little about me" />
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <p className="about-text">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15} className="about-side">
          <SpotlightCard className="card now-card">
            <p className="card-label"><Icon name="spark" size={16} /> Currently</p>
            <p className="now-text">{about.now}</p>
          </SpotlightCard>
          <SpotlightCard className="card">
            <p className="card-label">Away from the keyboard</p>
            <ul className="hobbies">
              {about.hobbies.map((h) => (
                <li key={h.label}>
                  <span className="hobby-icon"><Icon name={h.icon} /></span>
                  {h.label}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead eyebrow="Selected work" title="Projects">
          From research on securing IoT networks to apps you can use today.
        </SectionHead>
        <div className="projects">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className={p.featured ? 'project-featured' : ''}>
              <SpotlightCard className="card project">
                <div className="project-top">
                  <span className="project-kind">{p.kind}</span>
                  {p.status && <span className="badge badge-progress"><span className="pulse" />{p.status}</span>}
                  {p.live && <span className="badge badge-live">Live</span>}
                </div>
                <h3>{p.title}</h3>
                <p className="project-summary">{p.summary}</p>
                <ul className="project-points">
                  {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
                <div className="project-bottom">
                  <div className="tags">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  {p.live && (
                    <a className="link-arrow" href={p.live} target="_blank" rel="noreferrer">
                      Live site <Icon name="arrow" size={16} />
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="projects-more">
          <a className="link-arrow" href={profile.github} target="_blank" rel="noreferrer">
            <Icon name="github" size={18} /> More on GitHub <Icon name="arrow" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  const all = skills.flatMap((s) => s.items);
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead eyebrow="Toolkit" title="Skills" />
      </div>
      <div className="loops">
        <LogoLoop items={all.slice(0, Math.ceil(all.length / 2))} speed={45} />
        <LogoLoop items={all.slice(Math.ceil(all.length / 2))} speed={50} reverse />
      </div>
      <div className="container skills-grid">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.08}>
            <div className="skill-group">
              <p className="skill-title">{s.group}</p>
              <div className="tags">
                {s.items.map((it) => <span className="chip" key={it}>{it}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="section" id="education">
      <div className="container edu-grid">
        <div>
          <SectionHead eyebrow="Education" title="Where I've studied" />
          <div className="timeline">
            {education.map((e, i) => (
              <Reveal key={e.school} delay={i * 0.08} className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <p className="timeline-title">{e.school}</p>
                  <p className="timeline-sub">{e.degree}{e.period ? ` · ${e.period}` : ''}</p>
                </div>
                <span className="timeline-score">{e.score}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <SectionHead eyebrow="Certifications" title="Always learning" />
          <div className="certs">
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <div className="cert">
                  <span className="cert-icon"><Icon name="award" /></span>
                  <div>
                    <p className="cert-name">{c.name}</p>
                    <p className="cert-issuer">{c.issuer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="contact-card">
          <p className="eyebrow">Contact</p>
          <h2 className="contact-title">
            Let's build something <em>together</em>.
          </h2>
          <p className="section-sub">
            I'm looking for internships and new-grad roles. If you've got an opportunity, a project, or just want to talk tech, my inbox is open.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={17} /> {profile.email}
            </a>
            <button className="btn btn-ghost" onClick={copy}>{copied ? 'Copied' : 'Copy email'}</button>
          </div>
          <div className="contact-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={18} /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" size={18} /> GitHub</a>
            <a href={profile.resume} download><Icon name="download" size={18} /> Resume</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <ClickSpark />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Amal Roy</span>
          <span>Built with React</span>
        </div>
      </footer>
    </>
  );
}
