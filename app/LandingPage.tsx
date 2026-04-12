"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════
   בַּבּוֹץ — אברהם זיסמן
   Premium, photo-driven landing page.
   Desert. Mud. Hands. Earth. Quiet power.
   ═══════════════════════════════════════════════════════════════ */

/* ── Palette ── */
const clr = {
  creamSand: "#E6CBB8",
  softClay: "#C59F86",
  warmEarth: "#C88562",
  terracottaDust: "#AC7157",
  deepSoil: "#8A5D4B",
  darkMud: "#4A291B",
  paperLight: "#F0ECE6",
  mineralTaupe: "#CEBCA5",
  bg: "#F4F0EB",
  surface: "#FDFBF8",
  textPrimary: "#3A2518",
  textSecondary: "#6B5544",
  textMuted: "#9A8878",
  white: "#FFFFFF",
  border: "#E6DDD3",
}

/* ── Content ── */
const C = {
  brand: "בַּבּוֹץ",
  owner: "אברהם זיסמן",
  tagline: "לגעת בחומר.\nלחזור לאדמה.",
  subtitle: "ערכות בוץ טבעי ליצירה, מגע וחיבור — לבית ולקליניקה.",
  phone: "050-0000000",
  whatsapp: "972500000000",
  email: "info@babotz.co.il",
  address: "ישראל",
  about: {
    headline: "בוץ. פשוט. אמיתי.",
    p1: "בַּבּוֹץ נולד מתוך אמונה שלמגע עם חומר אמיתי יש כוח. לא צעצוע, לא גימיק — חומר גלם מהאדמה, ביחסים הנכונים, שמזמין לגעת, ליצור ולהרגיש.",
    p2: "הערכות שלנו מביאות את החוויה הזאת הביתה ולקליניקה. בצורה נגישה, נקייה ומקצועית.",
  },
  services: [
    { title: "ערכה ביתית", desc: "חוויה חושית ויצירתית למשפחות וילדים. פשוט פותחים ומתחילים.", label: "לבית" },
    { title: "ערכה קלינית", desc: "בוץ באיכות טיפולית למרפאים בעיסוק וארט תרפיסטים. יחסי חומרים מדויקים.", label: "למטפלים" },
    { title: "התאמה אישית", desc: "הרכבים מותאמים — מרקם, צבע, כמות. לפי דרישת המטפל או הלקוח.", label: "בהזמנה" },
    { title: "סדנאות", desc: "סדנאות בוץ לקבוצות, צוותים ומוסדות חינוך. חוויה חושית משותפת.", label: "חוויה" },
  ],
  testimonials: [
    { text: "הערכה הגיעה מוכנה ומושלמת. הילדים היו בעננים — שעתיים של יצירה ושקט.", name: "ל., אמא לשלושה" },
    { text: "אני משתמשת בערכות הקליניות בטיפולי ריפוי בעיסוק. החומר פשוט מעולה — טבעי ונעים למגע.", name: "ד., מרפאה בעיסוק" },
    { text: "הזמנו לאירוע גיבוש. החוויה הייתה משהו אחר לגמרי.", name: "ר., מנהל צוות" },
  ],
  formOptions: ["ערכה ביתית", "ערכה קלינית", "הזמנה מרובה / מוסדות", "סדנה / אירוע", "התאמה אישית", "אחר"],
}

/* ── Reveal animation ── */
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.25, 1, 0.35, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ── Parallax image ── */
function ParallaxImage({ src, alt, height = "70vh", speed = 0.15 }: { src: string; alt: string; height?: string; speed?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])
  return (
    <div ref={ref} style={{ height, overflow: "hidden", position: "relative" }}>
      <motion.img
        src={src} alt={alt}
        style={{
          y,
          position: "absolute", top: "-15%", left: 0, width: "100%", height: "130%",
          objectFit: "cover",
        }}
      />
    </div>
  )
}

/* ── Wrap ── */
function Wrap({ children, max = 1060, style }: { children: React.ReactNode; max?: number; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: max, margin: "0 auto", padding: "0 32px", ...style }}>{children}</div>
}

/* ═══════════════════════════════════════
   MAIN
   ═══════════════════════════════════════ */
export default function LandingPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" })
  const [sent, setSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return alert("נא למלא שם וטלפון")
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead")
      setSent(true)
    } catch { alert("שגיאה, נסו שנית") }
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 8,
    border: `1px solid ${clr.border}`, background: clr.bg,
    fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.3s", color: clr.textPrimary,
  }

  return (
    <div dir="rtl" style={{
      fontFamily: "'Heebo', system-ui, sans-serif",
      color: clr.textPrimary, background: clr.bg, overflowX: "hidden",
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Frank+Ruhl+Libre:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${clr.creamSand}; color: ${clr.darkMud}; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ════════ HEADER ════════ */}
      <motion.header
        initial={{ y: -70 }} animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 40px", height: 64,
          background: scrolled ? `rgba(244,240,235,0.92)` : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all 0.5s",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <span style={{
          fontFamily: "'Frank Ruhl Libre', serif",
          fontSize: 22, fontWeight: 700,
          color: scrolled ? clr.darkMud : clr.white,
          transition: "color 0.5s",
        }}>
          {C.brand}
        </span>
        <button onClick={() => scrollTo("contact")} style={{
          background: "transparent",
          color: scrolled ? clr.deepSoil : "rgba(255,255,255,0.9)",
          border: `1px solid ${scrolled ? clr.border : "rgba(255,255,255,0.3)"}`,
          padding: "8px 22px", borderRadius: 6, fontSize: 12.5,
          fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          transition: "all 0.5s", letterSpacing: "0.02em",
        }}>
          יצירת קשר
        </button>
      </motion.header>

      {/* ════════ HERO — Full-screen cinematic ════════ */}
      <section style={{
        height: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Background image — desert mud structure at sunset */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}>
          {/* Fallback gradient if no image */}
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(160deg, ${clr.darkMud} 0%, ${clr.deepSoil} 40%, ${clr.terracottaDust} 70%, ${clr.warmEarth} 100%)`,
            zIndex: -1,
          }} />
        </div>
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            style={{
              fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.2em", marginBottom: 24,
            }}
          >
            ערכות בוץ טבעי
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.25, 1, 0.35, 1] }}
            style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
              fontWeight: 700, lineHeight: 1.15,
              color: clr.white, whiteSpace: "pre-line",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 40px rgba(0,0,0,0.3)",
            }}
          >
            {C.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            style={{
              fontSize: 17, color: "rgba(255,255,255,0.75)", marginTop: 20,
              maxWidth: 440, marginLeft: "auto", marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            {C.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            style={{ marginTop: 40, display: "flex", gap: 14, justifyContent: "center" }}
          >
            <button onClick={() => scrollTo("contact")} style={{
              background: "rgba(255,255,255,0.12)", color: clr.white,
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "14px 36px", borderRadius: 8, fontSize: 14.5,
              fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
              backdropFilter: "blur(8px)", transition: "all 0.3s",
              letterSpacing: "0.02em",
            }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)" }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)" }}
            >
              לפרטים והזמנה
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          style={{
            position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1, height: 40, background: "rgba(255,255,255,0.3)",
              borderRadius: 1,
            }}
          />
        </motion.div>
      </section>

      {/* ════════ INTRO STRIP ════════ */}
      <section style={{ padding: "100px 0", background: clr.surface }}>
        <Wrap max={720}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 40, height: 2, background: clr.warmEarth, opacity: 0.4,
                margin: "0 auto 32px", borderRadius: 1,
              }} />
              <h2 style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 700, color: clr.darkMud,
                lineHeight: 1.3, letterSpacing: "-0.01em",
              }}>
                {C.about.headline}
              </h2>
              <p style={{
                fontSize: 16.5, lineHeight: 1.9, color: clr.textSecondary,
                marginTop: 24,
              }}>
                {C.about.p1}
              </p>
              <p style={{
                fontSize: 16.5, lineHeight: 1.9, color: clr.textSecondary,
                marginTop: 12,
              }}>
                {C.about.p2}
              </p>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* ════════ PHOTO — Full width parallax ════════ */}
      <ParallaxImage src="/images/hands.jpg" alt="ידיים בבוץ" height="65vh" />

      {/* ════════ SERVICES ════════ */}
      <section id="services" style={{ padding: "100px 0", background: clr.bg }}>
        <Wrap>
          <Reveal>
            <p style={{
              fontSize: 11.5, fontWeight: 600, color: clr.warmEarth,
              letterSpacing: "0.14em", marginBottom: 12,
            }}>מה בפנים</p>
            <h2 style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
              fontWeight: 700, color: clr.darkMud, marginBottom: 56,
              letterSpacing: "-0.01em",
            }}>
              הבוץ שלנו, בדרך שלכם.
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {C.services.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding: "40px 36px", borderRadius: 12,
                  background: clr.surface, border: `1px solid ${clr.border}`,
                  transition: "border-color 0.3s",
                  minHeight: 180,
                }}
                  onMouseOver={(e: any) => e.currentTarget.style.borderColor = clr.softClay}
                  onMouseOut={(e: any) => e.currentTarget.style.borderColor = clr.border}
                >
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: clr.warmEarth,
                    letterSpacing: "0.1em",
                  }}>{s.label}</span>
                  <h3 style={{
                    fontSize: 18, fontWeight: 700, color: clr.textPrimary,
                    margin: "14px 0 10px",
                  }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: clr.textSecondary }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ════════ PHOTO — Avraham with child ════════ */}
      <ParallaxImage src="/images/avraham.jpg" alt="אברהם עם ילד בסדנת בוץ" height="75vh" />

      {/* ════════ VALUES ════════ */}
      <section style={{ padding: "100px 0", background: clr.surface }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 60 }}>
            {[
              { title: "חומר אמיתי", text: "בוץ טבעי מהאדמה הישראלית. ללא תוספים מלאכותיים. חומר גלם." },
              { title: "יחסי חומרים נכונים", text: "כל ערכה עוברת פיתוח — הרכב מדויק שמבטיח חוויה טובה בכל פתיחה." },
              { title: "מניסיון אמיתי", text: "נולד מתוך שנים של עבודה עם בוץ, סדנאות וטיפול. מהשטח." },
            ].map((v, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <div>
                  <div style={{
                    width: 28, height: 2, background: clr.warmEarth, opacity: 0.4,
                    marginBottom: 20, borderRadius: 1,
                  }} />
                  <h3 style={{
                    fontSize: 15, fontWeight: 700, color: clr.textPrimary,
                    marginBottom: 8,
                  }}>{v.title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.75, color: clr.textSecondary }}>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ════════ PHOTO — Desert landscape ════════ */}
      <ParallaxImage src="/images/desert.jpg" alt="מבנה בוץ במדבר" height="60vh" />

      {/* ════════ TESTIMONIALS ════════ */}
      <section style={{ padding: "100px 0", background: clr.bg }}>
        <Wrap>
          <Reveal>
            <p style={{
              fontSize: 11.5, fontWeight: 600, color: clr.warmEarth,
              letterSpacing: "0.14em", marginBottom: 12,
            }}>מה אומרים</p>
            <h2 style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700, color: clr.darkMud, marginBottom: 48,
            }}>
              קולות מהשטח
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {C.testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{
                  padding: "36px 30px", borderRadius: 12,
                  background: clr.surface, border: `1px solid ${clr.border}`,
                }}>
                  <div style={{
                    fontFamily: "'Frank Ruhl Libre', serif",
                    fontSize: 36, color: clr.creamSand, lineHeight: 1,
                    marginBottom: 8, opacity: 0.6,
                  }}>״</div>
                  <p style={{
                    fontSize: 14.5, lineHeight: 1.8, color: clr.textSecondary,
                    marginBottom: 20,
                  }}>{t.text}</p>
                  <div style={{
                    width: 20, height: 1.5, background: clr.creamSand,
                    borderRadius: 1, marginBottom: 10,
                  }} />
                  <span style={{ fontSize: 12, color: clr.textMuted, fontWeight: 500 }}>{t.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ════════ PHOTO — Hands meeting in mud bowl ════════ */}
      <ParallaxImage src="/images/together.jpg" alt="ידיים נפגשות בבוץ" height="55vh" />

      {/* ════════ CONTACT ════════ */}
      <section id="contact" style={{ padding: "100px 0", background: clr.surface }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <div>
                <p style={{
                  fontSize: 11.5, fontWeight: 600, color: clr.warmEarth,
                  letterSpacing: "0.14em", marginBottom: 12,
                }}>יצירת קשר</p>
                <h2 style={{
                  fontFamily: "'Frank Ruhl Libre', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700, color: clr.darkMud, marginBottom: 16,
                }}>בואו נדבר.</h2>
                <p style={{
                  fontSize: 15, lineHeight: 1.75, color: clr.textSecondary,
                  marginBottom: 40, maxWidth: 380,
                }}>
                  רוצים לשמוע עוד, להזמין ערכה או לתאם סדנה? השאירו פרטים ונחזור אליכם.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[C.phone, C.email, C.address].map(label => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 4, height: 4, borderRadius: "50%", flexShrink: 0,
                        background: clr.warmEarth, opacity: 0.4,
                      }} />
                      <span style={{ fontSize: 14, color: clr.textSecondary }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              {sent ? (
                <div style={{
                  padding: "60px 40px", textAlign: "center", borderRadius: 12,
                  background: clr.bg, border: `1px solid ${clr.border}`,
                }}>
                  <div style={{
                    width: 40, height: 2, background: clr.warmEarth, opacity: 0.4,
                    margin: "0 auto 24px", borderRadius: 1,
                  }} />
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: clr.darkMud, marginBottom: 8 }}>תודה. הפרטים נשלחו.</h3>
                  <p style={{ color: clr.textSecondary, fontSize: 14 }}>נחזור אליכם בקרוב.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  padding: "40px 36px", borderRadius: 12,
                  background: clr.bg, border: `1px solid ${clr.border}`,
                  display: "flex", flexDirection: "column", gap: 20,
                }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: clr.darkMud, marginBottom: 4 }}>השאירו פרטים</h3>
                    <p style={{ fontSize: 13, color: clr.textMuted }}>ונחזור אליכם בהקדם.</p>
                  </div>
                  {[
                    { name: "name", label: "שם", type: "text", ph: "השם שלכם" },
                    { name: "phone", label: "טלפון", type: "tel", ph: "050-0000000" },
                  ].map(({ name, label, type, ph }) => (
                    <div key={name}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textSecondary, marginBottom: 6 }}>{label}</label>
                      <input type={type} placeholder={ph} value={formData[name as keyof typeof formData]}
                        onChange={(e) => setFormData(p => ({ ...p, [name]: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = clr.warmEarth)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = clr.border)}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textSecondary, marginBottom: 6 }}>מה מעניין אתכם?</label>
                    <select value={formData.service} onChange={(e) => setFormData(p => ({ ...p, service: e.target.value }))}
                      style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="">בחרו נושא</option>
                      {C.formOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" style={{
                    width: "100%", padding: "14px", borderRadius: 8, border: "none",
                    background: clr.darkMud, color: clr.paperLight, fontSize: 14, fontWeight: 600,
                    fontFamily: "inherit", cursor: "pointer", transition: "opacity 0.3s",
                  }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
                    שליחה
                  </button>
                  <p style={{ fontSize: 10.5, color: clr.textMuted, textAlign: "center" }}>
                    הפרטים שלכם מאובטחים ולא יועברו לגורם שלישי.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ padding: "36px 0", background: clr.darkMud }}>
        <Wrap style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: 16, fontWeight: 700, color: `${clr.creamSand}80`,
            }}>{C.brand}</span>
            <span style={{
              fontSize: 10.5, color: `${clr.creamSand}40`,
              display: "block", marginTop: 3,
            }}>© {new Date().getFullYear()} {C.owner}</span>
          </div>
          <span style={{ fontSize: 11.5, color: `${clr.creamSand}50` }}>{C.phone}</span>
        </Wrap>
      </footer>

      {/* ════════ FLOATING WHATSAPP ════════ */}
      <motion.a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, duration: 0.4 }}
        whileHover={{ scale: 1.06 }}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          width: 48, height: 48, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.2)",
        }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.67-1.227A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.288 0-4.4-.763-6.097-2.05a.5.5 0 00-.418-.087l-3.06.805.92-3.203a.5.5 0 00-.063-.407A9.946 9.946 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
        </svg>
      </motion.a>

      {/* ════════ RESPONSIVE ════════ */}
      <style jsx global>{`
        @media (max-width: 800px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          section { padding: 64px 0 !important; }
        }
      `}</style>
    </div>
  )
}
