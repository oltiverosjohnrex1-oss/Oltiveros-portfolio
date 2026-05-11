
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Github, Mail, MapPin, ExternalLink, Code2, Database, Globe, Terminal, ChevronDown, Menu, X, Cpu, Layers, Sparkles } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { category: "Frontend", icon: Globe, items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML/CSS"] },
  { category: "Backend", icon: Terminal, items: ["Node.js", "PHP", "Python", "REST APIs"] },
  { category: "Database", icon: Database, items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { category: "Tools", icon: Cpu, items: ["Git", "GitHub", "VS Code", "Figma", "Vite"] },
];

const PROJECTS = [
  {
    title: "LGU Baao Tourism Portal",
    desc: "A digital tourism information portal for the Municipality of Baao, Camarines Sur — showcasing local attractions, events, and tourism data.",
    tags: ["React", "TypeScript", "Tailwind"],
    color: "#c9a84c",
  },
  {
    title: "OJT Documentation System",
    desc: "Automated narrative report generator for On-the-Job Training documentation at Baao Community College's CIT department.",
    tags: ["Python", "DOCX", "Automation"],
    color: "#6e91c4",
  },
  {
    title: "BCC ACT Portfolio",
    desc: "Personal portfolio site built with Vite + React + Framer Motion, deployed via GitHub Actions — the very site you're looking at.",
    tags: ["React", "Framer Motion", "Vite"],
    color: "#b87c6e",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`relative py-28 px-6 md:px-16 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ children }) {
  return (
    <motion.p
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="text-xs tracking-[0.3em] uppercase font-mono mb-3"
      style={{ color: "#c9a84c" }}
    >
      {children}
    </motion.p>
  );
}

function SectionTitle({ children }) {
  return (
    <motion.h2
      variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold leading-tight mb-16"
      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0ece4" }}
    >
      {children}
    </motion.h2>
  );
}

// ─── NOISE OVERLAY ────────────────────────────────────────────────────────────
function Grain() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "128px",
      }}
    />
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? "rgba(12,11,9,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
          transition: "all 0.4s ease",
        }}
        className="px-6 md:px-16 py-5 flex items-center justify-between"
      >
        <span className="font-mono text-sm tracking-widest" style={{ color: "#c9a84c" }}>
          JRO<span style={{ color: "#f0ece4" }}>.</span>
        </span>
        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)}
              className="text-sm tracking-widest font-mono transition-colors duration-200"
              style={{ color: "#8a8070" }}
              onMouseEnter={e => e.target.style.color = "#c9a84c"}
              onMouseLeave={e => e.target.style.color = "#8a8070"}
            >
              {l}
            </button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setOpen(true)} style={{ color: "#f0ece4" }}>
          <Menu size={20} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{ position: "fixed", inset: 0, zIndex: 200, backgroundColor: "#0c0b09" }}
            className="flex flex-col items-center justify-center gap-10"
          >
            <button onClick={() => setOpen(false)} style={{ position: "absolute", top: 24, right: 24, color: "#f0ece4" }}>
              <X size={20} />
            </button>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)}
                className="text-3xl tracking-widest font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#f0ece4" }}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const letters = "John Rex R. Oltiveros".split("");

  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", padding: "0 24px" }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glow orbs */}
      <motion.div style={{ position: "absolute", top: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 6, repeat: Infinity }} />
      <motion.div style={{ position: "absolute", bottom: "15%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,145,196,0.07) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} />

      <motion.div style={{ y, opacity, position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", width: "100%" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          className="font-mono text-xs tracking-[0.4em] mb-8 flex items-center gap-3"
          style={{ color: "#c9a84c" }}
        >
          <span style={{ width: 32, height: 1, background: "#c9a84c", display: "inline-block" }} />
          ACT STUDENT · BCC · CAMARINES SUR
        </motion.div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 1.05, fontWeight: 700, color: "#f0ece4", marginBottom: "2rem" }}>
          {letters.map((l, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block", whiteSpace: l === " " ? "pre" : undefined }}
            >
              {l === " " ? "\u00a0" : l}
            </motion.span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2 }}
          style={{ fontSize: "1.15rem", color: "#8a8070", maxWidth: 540, lineHeight: 1.8, marginBottom: "3rem" }}
        >
          Associate in Computer Technology student building purposeful digital
          solutions — from government portals to automated documentation systems.
          Currently on OJT at the Tourism Office, Municipality of Baao.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex gap-4 flex-wrap">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com/oltiverosjohnrex1-oss" },
            { icon: Mail, label: "Contact", href: "#contact" },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c", borderRadius: 2, fontSize: "0.8rem", letterSpacing: "0.15em", textDecoration: "none", transition: "all 0.3s", fontFamily: "monospace", background: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; e.currentTarget.style.borderColor = "#c9a84c"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; }}
            >
              <Icon size={14} /> {label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 1 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={20} style={{ color: "#8a8070" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <Section id="skills">
      <SectionLabel>What I Work With</SectionLabel>
      <SectionTitle>Skills & Tools</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILLS.map(({ category, icon: Icon, items }, i) => (
          <motion.div key={category}
            variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            whileHover={{ y: -4 }}
            style={{ border: "1px solid rgba(201,168,76,0.15)", padding: "2rem", borderRadius: 4, background: "rgba(201,168,76,0.02)", position: "relative", overflow: "hidden" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />
            <div className="flex items-center gap-3 mb-6">
              <Icon size={16} style={{ color: "#c9a84c" }} />
              <span className="font-mono text-xs tracking-widest" style={{ color: "#c9a84c" }}>{category}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="font-mono text-xs px-3 py-1.5 rounded-sm"
                  style={{ background: "rgba(240,236,228,0.05)", color: "#8a8070", border: "1px solid rgba(240,236,228,0.08)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <Section id="projects">
      <SectionLabel>Selected Work</SectionLabel>
      <SectionTitle>Projects</SectionTitle>

      <div className="flex flex-col gap-8">
        {PROJECTS.map(({ title, desc, tags, color }, i) => (
          <motion.div key={title}
            variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            whileHover={{ x: 6 }}
            style={{ display: "flex", gap: "2rem", padding: "2rem", border: "1px solid rgba(240,236,228,0.07)", borderRadius: 4, background: "rgba(240,236,228,0.02)", cursor: "default", alignItems: "flex-start" }}
          >
            <div style={{ minWidth: 4, height: 60, background: color, borderRadius: 2, marginTop: 4 }} />
            <div style={{ flex: 1 }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", color: "#f0ece4", fontWeight: 600 }}>
                  {title}
                </h3>
                <ExternalLink size={16} style={{ color: "#8a8070", marginTop: 4, flexShrink: 0 }} />
              </div>
              <p style={{ color: "#8a8070", lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1.2rem" }}>{desc}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded-sm"
                    style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  const experiences = [
    {
      role: "OJT Trainee — Tourism Office",
      org: "Local Government Unit of Baao, Camarines Sur",
      period: "2025 – 2026",
      desc: "On-the-Job Training under Tourism Operations Officer Angelito Amacox B. Sangcap. Assisted in digitizing tourism data, document processing, and office systems support.",
    },
    {
      role: "ACT Student",
      org: "Baao Community College",
      period: "2024 – Present",
      desc: "Pursuing an Associate in Computer Technology degree with focus on web development, database systems, and software applications.",
    },
  ];

  return (
    <Section id="experience">
      <SectionLabel>Background</SectionLabel>
      <SectionTitle>Experience</SectionTitle>

      <div className="relative">
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(201,168,76,0.2)" }} />
        <div className="flex flex-col gap-12 pl-8">
          {experiences.map(({ role, org, period, desc }, i) => (
            <motion.div key={role}
              variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <div style={{ position: "absolute", left: -4, width: 9, height: 9, borderRadius: "50%", background: "#c9a84c", marginTop: 6 }} />
              <span className="font-mono text-xs tracking-widest" style={{ color: "#c9a84c" }}>{period}</span>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.3rem", color: "#f0ece4", fontWeight: 600, margin: "0.5rem 0 0.3rem" }}>{role}</h3>
              <p className="font-mono text-xs mb-3" style={{ color: "#6e91c4" }}>{org}</p>
              <p style={{ color: "#8a8070", lineHeight: 1.7, fontSize: "0.9rem", maxWidth: 560 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <Section id="contact">
      <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
        <SectionLabel>Get In Touch</SectionLabel>
        <motion.h2
          variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f0ece4", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem" }}
        >
          Let's Build Something Together
        </motion.h2>
        <motion.p
          variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ color: "#8a8070", lineHeight: 1.8, marginBottom: "3rem" }}
        >
          Whether it's a collaboration, a question about my work, or just a hello —
          my inbox is open.
        </motion.p>

        <motion.div
          variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {[
            { icon: Mail, label: "Email Me", href: "mailto:johnrex@example.com" },
            { icon: Github, label: "GitHub", href: "https://github.com/oltiverosjohnrex1-oss" },
            { icon: MapPin, label: "Baao, Camarines Sur", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <a key={label} href={href}
              className="flex items-center gap-2 font-mono text-sm"
              style={{ color: "#8a8070", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9a84c"}
              onMouseLeave={e => e.currentTarget.style.color = "#8a8070"}
            >
              <Icon size={14} /> {label}
            </a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(240,236,228,0.06)", padding: "2rem 24px", textAlign: "center" }}>
      <p className="font-mono text-xs" style={{ color: "#4a4540" }}>
        © 2025–2026 John Rex R. Oltiveros · Built with React + Framer Motion
      </p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ backgroundColor: "#0c0b09", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0c0b09; }
        ::-webkit-scrollbar-thumb { background: #c9a84c40; border-radius: 2px; }
      `}</style>

      <Grain />
      <Navbar />
      <Hero />

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", margin: "0 10%" }} />

      <Skills />

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(240,236,228,0.06), transparent)", margin: "0 10%" }} />

      <Projects />

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(240,236,228,0.06), transparent)", margin: "0 10%" }} />

      <Experience />

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)", margin: "0 10%" }} />

      <Contact />
      <Footer />
    </div>
  );
}
