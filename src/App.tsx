import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

// ─── Hook: intersection observer para animaciones on-scroll ───────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return { ref, visible }
}

// ─── Datos ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Inicio", "Sobre mí", "Experiencia", "Proyectos", "Habilidades", "Contacto"]

const EXPERIENCES = [
  {
    period: "Enero 2025 - Noviembre 2025",
    role: "Full Stack Developer",
    company: "Aumax SRL",
    desc: "Desarrollé aplicaciones para el control y mantenimiento de activos, con asignación de tareas, validación en campo y registro de incidentes. También implementé un sistema para hacer seguimiento del trabajo y asegurar la correcta ejecución de las tareas.",
  }
]

const PROJECTS = [
  {
    title: "Terminal de Punto de Venta",
    tag: "React · ExpressJS · PostgreSQL",
    desc: "Desarrollé una aplicación para una hamburguesería que cubre el flujo completo de compra del cliente, incluyendo integración con Mercado Pago, y una interfaz interna para la gestión de comandas.",
    link: "https://github.com/igna-buffaz21/McRaulo-Back.git",
  },
  {
    title: "Pagina de Torneo de Futbol",
    tag: "Angular · ExpressJS · PostgreSQL",
    desc: "Desarrollé una aplicación web informativa para un torneo de fútbol real, mostrando datos de equipos y jugadores almacenados en base de datos. La aplicación estuvo en producción durante el torneo.",
    link: "https://github.com/igna-buffaz21/TorneoVMF7-Back.git",
  },
  {
    title: "Nube de almacenamiento de archivos",
    tag: "React · ExpressJS · MySQL y MongoDB · Linux",
    desc: "Desarrollé una solución de almacenamiento personal para subir y gestionar archivos (fotos y videos), desplegada en un servidor Linux casero que configuré y mantuve.",
    link: "https://github.com/igna-buffaz21/Nube-Back.git",
  },
  {
    title: "Portfolio",
    tag: "React",
    desc: "Esta misma página web.",
    link: "https://github.com/igna-buffaz21/Portfolio",
  },
]

const SKILLS: { category: string; items: string[] }[] = [
  { category: "Frontend", items: ["React + Shadcn", "Angular + Material UI", "TailwindCSS"] },
  { category: "Backend", items: ["NodeJS + Express", "NodeJS + NestJS", "C# + .NET", "REST APIs", "SQLServer", "PostgreSQL", "MySQL"] },
  { category: "Herramientas", items: ["Git + GitHub", "Docker", "Figma", "Vercel", "Linux", "SmarterASP.NET", "Railway", "Nginx", "PM2"] },
  { category: "Soft Skills", items: ["Responsabilidad", "Autodidacta", "Comunicación", "Atención al detalle", "Liderazgo", "Trabajo en equipo"] },
]

// ─── Foto: reemplazá este string con el link/ruta de tu foto ──────────────────
// Ejemplos: "/foto.jpg"  |  "https://i.imgur.com/tuFoto.jpg"
const PHOTO_URL = "public/IMG_5745.webp"

// ─── Componente de sección animada ────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const sectionId = (label: string) =>
    label.toLowerCase().replace(" ", "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  return (
    <div className="bg-[#0a0a0a] text-[#e8e8e8] min-h-screen font-sans selection:bg-white selection:text-black">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; }
        .display { font-family: 'DM Serif Display', serif; }

        .grain {
          position: fixed; inset: 0; pointer-events: none; z-index: 50;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }

        .line-hover::after {
          content: ''; display: block; height: 1px;
          background: #e8e8e8; transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .line-hover:hover::after { transform: scaleX(1); }

        .card-hover { transition: border-color 0.3s ease, background 0.3s ease; }
        .card-hover:hover {
          border-color: rgba(255,255,255,0.2) !important;
          background: rgba(255,255,255,0.03) !important;
        }

        /* Gradiente en el texto del hero */
        .hero-name {
          background: linear-gradient(135deg, #ffffff 40%, #888888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* Padding para que las letras con descendentes no se corten */
          padding-bottom: 0.15em;
          display: block;
          overflow: visible;
        }

        .skill-tag {
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.65);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 300;
          letter-spacing: 0.02em;
          transition: border-color 0.2s, color 0.2s;
        }
        .skill-tag:hover { border-color: rgba(255,255,255,0.4); color: #fff; }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeDown { animation: fadeDown 0.5s ease forwards; }
      `}</style>

      <div className="grain" />

      {/* ── Navbar ──
          FIX: border-b solo se aplica cuando scrolled=true,
          así no aparece la línea blanca al navegar entre secciones */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            className="display text-xl tracking-tight text-white/90 hover:text-white transition-colors"
            onClick={() => scrollTo("inicio")}
          >
            IB<span className="text-white/30">.</span>
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(sectionId(link))}
                  className="line-hover text-sm font-light text-white/50 hover:text-white/90 transition-colors tracking-wide"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className={`block h-px w-6 bg-white/70 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-px w-6 bg-white/70 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-white/70 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden animate-fadeDown bg-[#0f0f0f] border-b border-white/5 px-6 py-6">
            <ul className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(sectionId(link))}
                    className="text-white/60 hover:text-white text-base font-light tracking-wide transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="inicio" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 w-full py-32 md:py-0">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-8 font-light">
              Disponibilidad full-time
            </p>

            {/* FIX: leading más amplio + overflow visible para que "Buffaz" no se corte */}
            <h1 className="display text-6xl md:text-8xl lg:text-9xl mb-10" style={{ lineHeight: 1.08, overflow: "visible" }}>
              <span className="hero-name">Ignacio</span>
              <span className="hero-name italic">Buffaz</span>
            </h1>

            {/* FIX: mt-2 para separar el párrafo del nombre */}
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12 mt-2">
              Estudiante avanzado de la carrera de Analista de Sistemas, con un año de experiencia en el sector IT.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                onClick={() => scrollTo("proyectos")}
                className="bg-white text-black hover:bg-white/90 rounded-none px-8 py-5 text-sm tracking-widest uppercase font-medium"
              >
                Ver proyectos
              </Button>
              <Button
                onClick={() => scrollTo("contacto")}
                variant="outline"
                className="border-white/15 text-white/60 hover:text-white hover:border-white/30 rounded-none px-8 py-5 text-sm tracking-widest uppercase font-light bg-transparent"
              >
                Contacto
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── SOBRE MÍ ── */}
      <section id="sobre-mi" className="py-28 md:py-36 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Section>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

              {/* Photo — FIX: listo para tu URL, solo completá PHOTO_URL arriba */}
            <div className="relative">
              <div className="aspect-[4/5] w-full max-w-sm mx-auto md:mx-0 overflow-hidden rounded-2xl">
                <div className="w-full h-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                  {PHOTO_URL ? (
                    <img
                      src={PHOTO_URL}
                      alt="Ignacio Buffaz"
                      className="w-full h-full object-cover scale-110 brightness-90"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-white/20">
                      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.75}
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <span className="text-xs tracking-widest uppercase font-light">Completá PHOTO_URL</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/30" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/30" />
                </div>
              </div>
            </div>

              {/* Text — FIX: sin "Código con propósito" ni stats */}
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-8">Sobre mí</p>
                <div className="space-y-4 text-white/45 font-light leading-relaxed text-base">
                  <p>
                    Me caracterizo por ser una persona responsable, proactiva y con muchas ganas de seguir aprendiendo.
                  </p>
                  <p>
                    Tengo experiencia en el desarrollo de aplicaciones utilizando .NET, SQL Server, Angular y desarrollo mobile con Kotlin, incluyendo la integración con dispositivos RFID.
                    He participado en todas las etapas del desarrollo de proyectos: análisis de requerimientos, desarrollo, despliegue y mantenimiento.
                  </p>
                  <p>
                    Busco seguir creciendo profesionalmente, aportando valor y enfrentando nuevos desafíos.
                  </p>
                </div>
              </div>

            </div>
          </Section>
        </div>
      </section>

      {/* ── EXPERIENCIA ── */}
      <section id="experiencia" className="py-28 md:py-36 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Section>
            <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-3">Trayectoria</p>
            <h2 className="display text-4xl md:text-5xl mb-16">Experiencia</h2>
          </Section>

          <div className="space-y-0">
            {EXPERIENCES.map((exp, i) => (
              <Section key={i}>
                <div className="card-hover grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 border-t border-white/8 group cursor-default">
                  <div>
                    <p className="text-xs font-light text-white/30 tracking-widest uppercase mt-1">{exp.period}</p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-medium tracking-tight">{exp.role}</h3>
                      <span className="text-white/30 text-sm font-light">— {exp.company}</span>
                    </div>
                    <p className="text-white/40 font-light text-sm leading-relaxed max-w-lg">{exp.desc}</p>
                  </div>
                </div>
              </Section>
            ))}
            <div className="border-t border-white/8" />
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="proyectos" className="py-28 md:py-36 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Section>
            <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-3">Trabajo selecto</p>
            <h2 className="display text-4xl md:text-5xl mb-16">Proyectos</h2>
          </Section>

          <div className="grid sm:grid-cols-2 gap-px bg-white/8">
            {PROJECTS.map((proj, i) => (
              <Section key={i}>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-hover bg-[#0a0a0a] border border-transparent p-8 md:p-10 flex flex-col gap-5 h-full group cursor-pointer block"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="display text-2xl md:text-3xl group-hover:text-white transition-colors">{proj.title}</h3>
                    <svg
                      className="w-5 h-5 text-white/20 group-hover:text-white/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0 mt-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <p className="text-white/35 font-light text-sm leading-relaxed flex-1">{proj.desc}</p>
                  <p className="text-xs text-white/20 font-light tracking-wide">{proj.tag}</p>
                </a>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── HABILIDADES ── */}
      <section id="habilidades" className="py-28 md:py-36 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Section>
            <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-3">Stack</p>
            <h2 className="display text-4xl md:text-5xl mb-16">Habilidades</h2>
          </Section>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {SKILLS.map((group, i) => (
              <Section key={i}>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/25 mb-5 font-light">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="py-28 md:py-40 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Section>
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.25em] uppercase text-white/25 mb-6">¿Hablamos?</p>
              <h2 className="display text-5xl md:text-7xl mb-8 leading-tight">
                Trabajemos<br />
                <span className="italic text-white/40">juntos</span>
              </h2>
              <p className="text-white/40 font-light text-lg mb-12 max-w-md leading-relaxed">
                Estas interesado en colaborar o tenés alguna propuesta? No dudes en escribirme, estoy abierto a escuchar tu proyecto y ver cómo puedo aportar.
              </p>
              <a
                href="https://mail.google.com/mail/?view=cm&to=ignaciobuffaz73@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white text-xl md:text-2xl display hover:gap-5 transition-all duration-300 group"
              >
                ignaciobuffaz73@gmail.com
                <svg className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>

              <div className="flex items-center gap-6 mt-14">
                {[
                  { label: "GitHub", href: "https://github.com/igna-buffaz21" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/ignacio-buffaz-9b707a276" },
                  { label: "Instagram", href: "https://www.instagram.com/ignabuffaz/" },
                  { label: "Whatsapp", href: "https://wa.me/5493534133580" }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="line-hover text-sm font-light text-white/30 hover:text-white/80 transition-colors tracking-wide"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-light tracking-widest uppercase">
            Desarrollado por Ignacio Buffaz — {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}