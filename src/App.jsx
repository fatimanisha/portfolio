import { useState, useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Resume", "Projects", "Contact"];

const SKILLS = [
  { label: "Programming Languages", sub: "Python · Java · C# · JavaScript", pct: 90 },
  { label: "Frameworks", sub: "React · Node.js · Express · Django", pct: 85 },
  { label: "APIs & Databases", sub: "REST · PostgreSQL · MySQL · MongoDB · Redis", pct: 85 },
  { label: "Cloud Platforms", sub: "Azure · AWS · GCP", pct: 95 },
  { label: "DevOps & CI/CD", sub: "Docker · Kubernetes · Terraform · Jenkins · GitHub Actions", pct: 85 },
  { label: "Tools & Collaboration", sub: "Git · Jira · Confluence · Agile/Scrum", pct: 90 },
  { label: "Testing", sub: "Jest · Mocha · Postman", pct: 80 },
  { label: "Monitoring", sub: "CloudWatch · DataDog", pct: 90 },
];

const EXPERIENCE = [
  {
    role: "Automation Analyst",
    company: "Royal Bank of Canada",
    period: "Jan 2024 – Apr 2024",
    location: "Toronto, Canada",
    bullets: [
      "Developed Python automation scripts to streamline financial workflows, reducing manual effort and errors.",
      "Built modular, error-resilient code integrated with GitHub and Jenkins, enhancing CI/CD processes.",
      "Designed financial dashboards translating business needs into real-time reporting and insights.",
      "Integrated APIs across systems enabling seamless data exchange and end-to-end workflow automation.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Graduate Certificate – Full Stack Software Development",
    school: "Lambton College Toronto",
    period: "2022 – 2024",
    note: "Python · Django · Cloud Computing · DevOps",
  },
  {
    degree: "Bachelor of Computer Science & Engineering",
    school: "JNTU Hyderabad",
    period: "2017 – 2021",
    note: "Java · Web Technologies · Networking · OS",
  },
];

const CERTS = [
  {
    name: "HashiCorp Certified: Terraform Associate (003)",
    issuer: "HashiCorp",
    icon: "⬡",
    color: "#7c3aed",
    link: "https://www.credly.com/badges/d46302da-0cc0-481c-9bef-268dbd6dfb72/linked_in_profile",
  },
  {
    name: "Microsoft Certified: Azure Administrator Associate",
    issuer: "Microsoft",
    icon: "☁",
    color: "#0ea5e9",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/FatimaNisha-4674/EC3AF664E0A1262B?sharingId",
  },
  {
    name: "Microsoft Certified: Azure Fundamentals",
    issuer: "Microsoft",
    icon: "☁",
    color: "#38bdf8",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/FatimaNisha-4674/EA24D261BDD150AB?sharingId=8CCA41461430FAB3",
  },
  {
    name: "Tableau Expert: Top Visualization Techniques in Tableau 10",
    issuer: "Udemy",
    icon: "📊",
    color: "#f59e0b",
    link: "https://www.udemy.com/certificate/UC-9ba4f7eb-cde0-4979-b8cb-40aed55a3984/",
  },
  {
    name: "Scrum Fundamentals Certified",
    issuer: "SCRUMstudy",
    icon: "⟳",
    color: "#10b981",
    link: "https://c46e136a583f7e334124-ac22991740ab4ff17e21daf2ed577041.ssl.cf1.rackcdn.com/Certificate/ScrumFundamentalsCertified-FatimaNisha-1002749.pdf",
  },
  {
    name: "Programming Foundations with JavaScript, HTML and CSS",
    issuer: "Duke University · Coursera",
    icon: "🎓",
    color: "#001a57",
    date: "Nov 2021",
    link: "https://coursera.org/verify/BT3XMMDBFSTZ",
  },
  {
    name: "Responsive Web Design",
    issuer: "University of London · Coursera",
    icon: "🖥",
    color: "#8b1a1a",
    date: "Dec 2021",
    link: "https://coursera.org/verify/VDLDZXVZBAYJ",
  },
  {
    name: "Crash Course on Python",
    issuer: "Google · Coursera",
    icon: "🐍",
    color: "#1a73e8",
    date: "Feb 2022",
    link: "https://coursera.org/verify/XAURN4UZB7F3",
  },
];

const PROJECTS = [
  {
    title: "React Portfolio & Component Library",
    tags: ["React", "React Router", "Custom Hooks", "Responsive UI"],
    category: "frontend",
    desc: "Personal portfolio rebuilt in React with reusable UI components, responsive layouts, dynamic routing with React Router, and custom hooks.",
    github: "https://github.com/fatimanisha/portfolio",
    color: "#7c3aed",
  },
  {
    title: "Infrastructure Automation with Terraform & Azure DevOps",
    tags: ["Docker", "Kubernetes", "AKS", "Terraform", "GitHub Actions"],
    category: "cloud",
    desc: "End-to-end CI/CD pipeline automation with Azure Kubernetes Service, Container Registry, RBAC and GitHub Actions workflows.",
    github: "https://github.com/fatimanisha/Infrastructure-Automation-CI-CD-Pipeline",
    color: "#0ea5e9",
  },
  {
    title: "Credit Card Fraud Detection",
    tags: ["Python", "scikit-learn", "Random Forest", "Neural Networks"],
    category: "ml",
    desc: "ML pipeline with Random Forest and Neural Networks for real-time fraud detection. Feature engineering, imbalanced data handling, Plotly visualizations.",
    github: "https://github.com/fatimanisha/Credit-Card-Fraud-Detection",
    color: "#10b981",
  },
  {
    title: "Online Book Store Management",
    tags: ["Node.js", "MongoDB", "REST API", "Authentication"],
    category: "backend",
    desc: "Full-stack bookstore with modular backend architecture, user authentication, CRUD operations and RESTful API integration.",
    github: "https://github.com/fatimanisha/Online-Bookstore-Management",
    color: "#f59e0b",
  },
  {
    title: "Property Management System",
    tags: ["Java", "Java Swing", "MySQL", "MVC", "JDBC"],
    category: "backend",
    desc: "Desktop application with MVC architecture, DAO pattern, JDBC-backed MySQL persistence, file I/O and Java Logging API.",
    github: "https://github.com/fatimanisha/Property-Management-System",
    color: "#ef4444",
  },
  {
    title: "Indi-Cart: E-Commerce Website",
    tags: ["HTML5", "CSS3", "Responsive Design"],
    category: "frontend",
    desc: "Responsive e-commerce frontend with category browsing, cart UX, wireframe-driven design and mobile-first layout.",
    github: "https://github.com/fatimanisha/E-Commerce-Website",
    live: "https://fatimanisha.github.io/E-Commerce-Website/",
    color: "#ec4899",
  },
];

const FILTER_TAGS = ["All", "Cloud", "ML", "Frontend", "Backend"];
const FILTER_MAP = { All: null, Cloud: "cloud", ML: "ml", Frontend: "frontend", Backend: "backend" };

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useActiveSection() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const sects = NAV_LINKS.map((id) => document.getElementById(id));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sects.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ label, subtitle }) {
  return (
    <FadeIn className="sect-title">
      <span className="overline">{label}</span>
      {subtitle && <p className="sect-sub">{subtitle}</p>}
    </FadeIn>
  );
}

function SkillBar({ label, sub, pct, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className="skill-row" style={{ transitionDelay: `${delay}ms` }}>
      <div className="skill-meta">
        <span className="skill-label">{label}</span>
        <span className="skill-sub">{sub}</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{
            width: vis ? `${pct}%` : "0%",
            transition: `width 1s cubic-bezier(.4,0,.2,1) ${delay + 100}ms`,
          }}
        />
        <span className="skill-pct">{pct}%</span>
      </div>
    </div>
  );
}

function ProjectCard({ p, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <FadeIn delay={delay} className="proj-card-wrap">
      <div
        className="proj-card"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ "--accent": p.color }}
      >
        <div className="proj-accent-bar" style={{ background: p.color }} />
        <div className="proj-body">
          <h3 className="proj-title">{p.title}</h3>
          <p className="proj-desc">{p.desc}</p>
          <div className="proj-tags">
            {p.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
        <div className={`proj-links ${hov ? "visible" : ""}`}>
          <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
            GitHub ↗
          </a>
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="proj-link">
              Live ↗
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

// ── Sections ──────────────────────────────────────────────────────────────────
function Hero() {
  const words = ["Software Engineer", "Cloud Enthusiast", "DevOps Engineer", "Full-Stack Developer"];
  const [wIdx, setWIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setWIdx((i) => (i + 1) % words.length); setShow(true); }, 400);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="Home" className="hero-section">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="hero-content">
        <FadeIn delay={0}>
          <p className="hero-greeting">Hello, I'm</p>
        </FadeIn>
        <FadeIn delay={120}>
          <h1 className="hero-name">Fatima Nisha</h1>
        </FadeIn>
        <FadeIn delay={240}>
          <div className="hero-role-wrap">
            <span
              className="hero-role"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(-12px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {words[wIdx]}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={360}>
          <p className="hero-blurb">
            Building scalable systems, cloud-native pipelines, and impactful software from Toronto.
          </p>
        </FadeIn>
        <FadeIn delay={480}>
          <div className="hero-ctas">
            <a href="#Projects" className="btn-primary">View Projects</a>
            <a href="#Resume" className="btn-ghost">Resume</a>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <div className="hero-socials">
            <a href="https://github.com/fatimanisha" target="_blank" rel="noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/fatima-nisha/" target="_blank" rel="noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="About" className="section about-section">
      <div className="container">
        <SectionTitle label="About Me" subtitle="Software Engineer · Cloud & DevOps Enthusiast" />
        <div className="about-grid">
          <FadeIn delay={0} className="about-photo-wrap">
            <div className="about-photo-frame">
              <div className="about-photo-placeholder">
                <span className="initials">FN</span>
              </div>
              <div className="about-photo-accent" />
            </div>
          </FadeIn>
          <FadeIn delay={150} className="about-text">
            <p>
              Hi! I'm <strong>Fatima Nisha</strong>, a passionate <strong>Software Engineer</strong> and{" "}
              <strong>Cloud Enthusiast</strong>. I hold a <strong>Graduate Certificate</strong> in{" "}
              <strong>Full Stack Software Development</strong> from Lambton College, Toronto, and a{" "}
              <strong>Bachelor's in Computer Science and Engineering</strong> from JNTU Hyderabad.
            </p>
            <p>
              At <strong>Royal Bank of Canada</strong> as an <strong>Automation Analyst</strong>, I worked on
              Python automation, cloud technologies, and CI/CD pipelines — strengthening my expertise in DevOps,
              cloud infrastructure, and intelligent automation.
            </p>
            <p>
              Recognized as <strong>Second Runner-up</strong> at the RBC Case Competition and{" "}
              <strong>Third Runner-up</strong> in their Code Games Competition. Certified in{" "}
              <strong>Azure Administrator Associate</strong>, <strong>Azure Fundamentals</strong>, and{" "}
              <strong>HashiCorp Terraform Associate</strong>.
            </p>
            <div className="about-meta">
              <span>📍 Toronto, Ontario, Canada</span>
              <span>✉ fatimanisha270@gmail.com</span>
            </div>
          </FadeIn>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <SkillBar key={s.label} {...s} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section id="Resume" className="section resume-section">
      <div className="container">
        <SectionTitle label="Resume" subtitle="Experience & Education" />
        <div className="timeline-grid">
          <div className="timeline-col">
            <FadeIn>
              <h3 className="col-head">Experience</h3>
            </FadeIn>
            {EXPERIENCE.map((e, i) => (
              <FadeIn key={i} delay={i * 100} className="timeline-item">
                <div className="tl-dot" />
                <div className="tl-content">
                  <span className="tl-period">{e.period}</span>
                  <h4 className="tl-role">{e.role}</h4>
                  <p className="tl-company">{e.company} · {e.location}</p>
                  <ul className="tl-bullets">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="timeline-col">
            <FadeIn>
              <h3 className="col-head">Education</h3>
            </FadeIn>
            {EDUCATION.map((e, i) => (
              <FadeIn key={i} delay={i * 100} className="timeline-item">
                <div className="tl-dot" />
                <div className="tl-content">
                  <span className="tl-period">{e.period}</span>
                  <h4 className="tl-role">{e.degree}</h4>
                  <p className="tl-company">{e.school}</p>
                  <p className="tl-note">{e.note}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Certifications — full-width grid below the timeline */}
        <FadeIn delay={100}>
          <h3 className="col-head certs-head">Certifications</h3>
        </FadeIn>
        <div className="certs-grid">
          {CERTS.map((c, i) => (
            <FadeIn key={i} delay={i * 80} className="cert-card-wrap">
              <div className="cert-card" style={{ "--cert-color": c.color }}>
                <div className="cert-card-top">
                  <span className="cert-card-icon">{c.icon}</span>
                  <span className="cert-card-issuer">{c.issuer}</span>
                </div>
                <p className="cert-card-name">{c.name}</p>
                {c.date && <p className="cert-card-date">{c.date}</p>}
                <div className="cert-card-actions">
                  {c.file && (
                    <a
                      href={c.file}
                      download
                      className="cert-card-link"
                    >
                      ⬇ Download PDF
                    </a>
                  )}
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="cert-card-link"
                    >
                      View Certificate ↗
                    </a>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = PROJECTS.filter((p) =>
    FILTER_MAP[filter] === null ? true : p.category === FILTER_MAP[filter]
  );

  return (
    <section id="Projects" className="section projects-section">
      <div className="container">
        <SectionTitle label="Projects" subtitle="Things I've built" />
        <FadeIn className="filter-bar">
          {FILTER_TAGS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </FadeIn>
        <div className="proj-grid">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} p={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };
  return (
    <section id="Contact" className="section contact-section">
      <div className="container">
        <SectionTitle label="Contact" subtitle="Let's work together" />
        <div className="contact-grid">
          <FadeIn delay={0} className="contact-info">
            <p>I'm open to new opportunities, collaborations, and interesting conversations. Reach out!</p>
            <div className="contact-links">
              <a href="mailto:fatimanisha270@gmail.com" className="contact-item">
                <span className="ci-icon">✉</span>
                <span>fatimanisha270@gmail.com</span>
              </a>
              <a href="https://github.com/fatimanisha" target="_blank" rel="noreferrer" className="contact-item">
                <span className="ci-icon">⌥</span>
                <span>github.com/fatimanisha</span>
              </a>
              <a href="https://www.linkedin.com/in/fatima-nisha/" target="_blank" rel="noreferrer" className="contact-item">
                <span className="ci-icon">in</span>
                <span>linkedin.com/in/fatima-nisha</span>
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="contact-form-wrap">
            {sent ? (
              <div className="sent-msg">✓ Message sent! I'll be in touch soon.</div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input className="cf-input" type="text" placeholder="Your Name" required />
                <input className="cf-input" type="email" placeholder="Your Email" required />
                <textarea className="cf-input cf-textarea" placeholder="Your Message" rows={5} required />
                <button type="submit" className="btn-primary cf-submit">Send Message</button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scrollTo("Home")}>FN</button>
        <ul className="nav-links desktop">
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <button
                className={`nav-item ${active === n ? "active" : ""}`}
                onClick={() => scrollTo(n)}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-hamburger" onClick={() => setMenuOpen((v) => !v)}>
          <span className={menuOpen ? "ham-open" : ""} />
        </button>
      </div>
      {menuOpen && (
        <ul className="nav-links mobile">
          {NAV_LINKS.map((n) => (
            <li key={n}>
              <button className="nav-item" onClick={() => scrollTo(n)}>{n}</button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <Nav />
      <main>
        <Hero />
        <About />
        <Resume />
        <Projects />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>© 2026 Fatima Nisha · Built with React</p>
      </footer>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0f;
  --bg2: #111118;
  --surface: #16161f;
  --border: rgba(255,255,255,0.07);
  --text: #e8e8f0;
  --muted: #7c7c9a;
  --accent: #6366f1;
  --accent2: #38bdf8;
  --font-head: 'Syne', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: var(--font-body); line-height: 1.7; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: var(--font-body); border: none; background: none; color: inherit; }

/* ── Navbar ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  transition: background 0.3s, backdrop-filter 0.3s, box-shadow 0.3s;
}
.navbar.scrolled {
  background: rgba(10,10,15,0.88);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 1.1rem 2rem;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo {
  font-family: var(--font-head); font-size: 1.4rem; font-weight: 800;
  color: var(--accent); letter-spacing: -0.02em;
}
.nav-links.desktop { display: flex; gap: 0.25rem; list-style: none; }
.nav-item {
  padding: 0.4rem 0.9rem; font-size: 0.88rem; font-weight: 500;
  border-radius: 6px; transition: color 0.2s, background 0.2s; color: var(--muted);
}
.nav-item:hover { color: var(--text); }
.nav-item.active { color: var(--text); background: rgba(99,102,241,0.12); }
.nav-hamburger {
  display: none; width: 28px; height: 28px;
  align-items: center; justify-content: center;
}
.nav-hamburger span {
  display: block; width: 22px; height: 2px;
  background: var(--text); border-radius: 2px;
  position: relative; transition: background 0.2s;
}
.nav-hamburger span::before, .nav-hamburger span::after {
  content: ''; position: absolute; left: 0; width: 100%; height: 2px;
  background: var(--text); border-radius: 2px; transition: transform 0.25s;
}
.nav-hamburger span::before { top: -7px; }
.nav-hamburger span::after { top: 7px; }
.nav-hamburger span.ham-open { background: transparent; }
.nav-hamburger span.ham-open::before { transform: rotate(45deg) translate(5px,5px); }
.nav-hamburger span.ham-open::after { transform: rotate(-45deg) translate(5px,-5px); }
.nav-links.mobile {
  list-style: none; background: var(--surface);
  border-top: 1px solid var(--border); padding: 1rem 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 0.25rem;
}
.nav-links.mobile .nav-item { padding: 0.6rem 0.5rem; color: var(--text); width: 100%; text-align: left; }

/* ── Shared ── */
.section { padding: 7rem 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.sect-title { margin-bottom: 3.5rem; }
.overline {
  display: inline-block; font-family: var(--font-head); font-size: 2.4rem;
  font-weight: 800; letter-spacing: -0.03em; color: var(--text);
  border-bottom: 3px solid var(--accent); padding-bottom: 0.15em;
}
.sect-sub { color: var(--muted); font-size: 1rem; margin-top: 0.6rem; }

/* ── Hero ── */
.hero-section {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.hero-grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image: linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
}
.hero-glow {
  position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
  width: 600px; height: 400px; border-radius: 50%;
  background: radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero-content { position: relative; text-align: center; max-width: 760px; padding: 0 2rem; }
.hero-greeting { font-size: 1rem; color: var(--accent2); font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 0.5rem; }
.hero-name {
  font-weight: 800; letter-spacing: -0.04em; line-height: 1;
  background: linear-gradient(135deg, #fff 40%, var(--accent) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}
.hero-role-wrap { height: 2.2rem; overflow: hidden; margin-bottom: 1.5rem; }
.hero-role {
  display: inline-block; font-family: var(--font-head);
  font-size: 1.35rem; font-weight: 600; color: var(--accent2);
}
.hero-blurb { color: var(--muted); font-size: 1.05rem; max-width: 520px; margin: 0 auto 2rem; }
.hero-ctas { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn-primary {
  display: inline-block; background: var(--accent); color: #fff;
  padding: 0.75rem 1.8rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 0 24px rgba(99,102,241,0.3);
}
.btn-primary:hover { background: #4f52e8; transform: translateY(-2px); box-shadow: 0 4px 32px rgba(99,102,241,0.45); }
.btn-ghost {
  display: inline-block; border: 1.5px solid var(--border); color: var(--text);
  padding: 0.75rem 1.8rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem;
  transition: border-color 0.2s, background 0.2s;
}
.btn-ghost:hover { border-color: var(--accent); background: rgba(99,102,241,0.08); }
.hero-socials { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; }
.social-link {
  display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid var(--border); color: var(--muted);
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.social-link:hover { color: var(--text); border-color: var(--accent); background: rgba(99,102,241,0.1); }
.hero-scroll-hint {
  position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  color: var(--muted); font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
}
.scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--muted), transparent);
  animation: scrollPulse 1.8s ease infinite;
}
@keyframes scrollPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

/* ── About ── */
.about-section { background: var(--bg2); }
.about-grid { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; align-items: start; margin-bottom: 4rem; }
.about-photo-wrap { display: flex; justify-content: center; }
.about-photo-frame { position: relative; width: 220px; height: 220px; }
.about-photo-placeholder {
  width: 220px; height: 220px; border-radius: 20px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  display: flex; align-items: center; justify-content: center;
}
.initials { font-family: var(--font-head); font-size: 4rem; font-weight: 800; color: #fff; }
.about-photo-accent {
  position: absolute; inset: -8px; border-radius: 24px;
  border: 2px solid var(--accent); opacity: 0.3; z-index: -1;
}
.about-text p { color: var(--muted); margin-bottom: 1rem; font-size: 0.98rem; line-height: 1.8; }
.about-text p strong { color: var(--text); font-weight: 600; }
.about-meta { display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 1.5rem; color: var(--muted); font-size: 0.88rem; }
.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem 3rem; }
.skill-row { display: flex; flex-direction: column; gap: 0.4rem; }
.skill-meta { display: flex; flex-direction: column; gap: 0.1rem; }
.skill-label { font-weight: 600; font-size: 0.9rem; }
.skill-sub { color: var(--muted); font-size: 0.78rem; }
.skill-track {
  position: relative; height: 6px; background: rgba(255,255,255,0.06);
  border-radius: 99px; overflow: visible;
}
.skill-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
}
.skill-pct {
  position: absolute; right: 0; top: -20px;
  font-size: 0.72rem; color: var(--muted);
}

/* ── Resume ── */
.timeline-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 4rem; }
.col-head { font-family: var(--font-head); font-size: 1.2rem; font-weight: 700; color: var(--accent2); margin-bottom: 2rem; letter-spacing: 0.02em; }
.timeline-item { position: relative; padding-left: 1.8rem; margin-bottom: 2.5rem; border-left: 1px solid var(--border); }
.tl-dot {
  position: absolute; left: -5px; top: 6px;
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--accent); box-shadow: 0 0 10px var(--accent);
}
.tl-period { font-size: 0.78rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; }
.tl-role { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; margin: 0.35rem 0 0.2rem; }
.tl-company { font-size: 0.85rem; color: var(--muted); margin-bottom: 0.8rem; }
.tl-note { font-size: 0.82rem; color: var(--muted); margin-top: 0.4rem; }
.tl-bullets { padding-left: 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
.tl-bullets li { font-size: 0.88rem; color: var(--muted); line-height: 1.6; }
.certs-head { margin-top: 3.5rem; margin-bottom: 1.8rem; }
.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}
.cert-card-wrap { height: 100%; }
.cert-card {
  --cert-color: #6366f1;
  height: 100%; display: flex; flex-direction: column; gap: 0.75rem;
  padding: 1.3rem 1.4rem; border-radius: 12px;
  background: var(--surface); border: 1px solid var(--border);
  border-top: 3px solid var(--cert-color);
  transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
}
.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  border-color: var(--cert-color);
}
.cert-card-top {
  display: flex; align-items: center; justify-content: space-between;
}
.cert-card-icon { font-size: 1.5rem; }
.cert-card-issuer {
  font-size: 0.72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--muted);
}
.cert-card-name {
  font-weight: 600; font-size: 0.9rem; line-height: 1.5;
  color: var(--text); flex: 1;
}
.cert-card-date {
  font-size: 0.75rem; color: var(--muted); margin-top: -0.25rem;
}
.cert-card-actions {
  display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: auto;
}
.cert-card-link {
  display: inline-block; font-size: 0.78rem; font-weight: 700;
  color: var(--cert-color);
  transition: opacity 0.2s;
}
.cert-card-link:hover { opacity: 0.75; }
@media (max-width: 900px) {
  .certs-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .certs-grid { grid-template-columns: 1fr; }
}

/* ── Projects ── */
.projects-section { background: var(--bg2); }
.filter-bar { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
.filter-btn {
  padding: 0.45rem 1.1rem; border-radius: 99px; font-size: 0.84rem; font-weight: 500;
  border: 1px solid var(--border); color: var(--muted);
  transition: all 0.2s;
}
.filter-btn:hover { border-color: var(--accent); color: var(--text); }
.filter-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }
.proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.proj-card-wrap { height: 100%; }
.proj-card {
  --accent: #6366f1;
  height: 100%; border-radius: 14px; border: 1px solid var(--border);
  background: var(--surface); overflow: hidden;
  display: flex; flex-direction: column;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  cursor: default;
}
.proj-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.proj-accent-bar { height: 4px; background: var(--accent); flex-shrink: 0; }
.proj-body { padding: 1.4rem; flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }
.proj-title { font-family: var(--font-head); font-size: 1rem; font-weight: 700; line-height: 1.3; }
.proj-desc { color: var(--muted); font-size: 0.84rem; line-height: 1.7; flex: 1; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag {
  padding: 0.25rem 0.7rem; border-radius: 99px;
  background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.2);
  font-size: 0.72rem; font-weight: 600; color: var(--accent2);
}
.proj-links {
  padding: 0 1.4rem 1.2rem; display: flex; gap: 1rem;
  opacity: 0; transform: translateY(6px);
  transition: opacity 0.25s, transform 0.25s;
}
.proj-links.visible { opacity: 1; transform: translateY(0); }
.proj-link {
  font-size: 0.82rem; font-weight: 600; color: var(--accent);
  transition: color 0.2s;
}
.proj-link:hover { color: var(--accent2); }

/* ── Contact ── */
.contact-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 4rem; align-items: start; }
.contact-info p { color: var(--muted); font-size: 1rem; line-height: 1.8; margin-bottom: 2rem; }
.contact-links { display: flex; flex-direction: column; gap: 1rem; }
.contact-item {
  display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.2rem;
  border: 1px solid var(--border); border-radius: 10px; color: var(--muted);
  font-size: 0.88rem; transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.contact-item:hover { border-color: var(--accent); color: var(--text); background: rgba(99,102,241,0.06); }
.ci-icon { font-size: 1.1rem; font-weight: 700; color: var(--accent); width: 24px; text-align: center; }
.contact-form { display: flex; flex-direction: column; gap: 1rem; }
.cf-input {
  background: var(--surface); border: 1px solid var(--border); border-radius: 10px;
  padding: 0.85rem 1.1rem; font-size: 0.9rem; font-family: var(--font-body);
  color: var(--text); outline: none; transition: border-color 0.2s;
  resize: vertical;
}
.cf-input::placeholder { color: var(--muted); }
.cf-input:focus { border-color: var(--accent); }
.cf-submit { align-self: flex-start; }
.sent-msg {
  padding: 2rem; background: rgba(99,102,241,0.1); border: 1px solid var(--accent);
  border-radius: 12px; color: var(--accent2); font-weight: 600; text-align: center;
}

/* ── Footer ── */
.site-footer {
  text-align: center; padding: 2rem; border-top: 1px solid var(--border);
  color: var(--muted); font-size: 0.82rem;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-photo-wrap { justify-content: flex-start; }
  .skills-grid { grid-template-columns: 1fr; }
  .timeline-grid { grid-template-columns: 1fr; }
  .proj-grid { grid-template-columns: 1fr 1fr; }
  .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
@media (max-width: 640px) {
  .nav-links.desktop { display: none; }
  .nav-hamburger { display: flex; }
  .proj-grid { grid-template-columns: 1fr; }
  .hero-name { font-size: 2.8rem; }
  .overline { font-size: 1.8rem; }
  .section { padding: 4.5rem 0; }
}
`;
