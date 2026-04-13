"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ═══════════════════════════════════════════════════════
   אברהם זיסמן — ערכות בוץ וסדנאות
   Design: Earthy desert tones, artistic, raw materials
   feel, Arava landscape colors, creative & warm
   ═══════════════════════════════════════════════════════ */

const C = {
  name: "אברהם זיסמן",
  brand: "בוץ — יצירה מהאדמה",
  tagline: "לגעת באדמה.\nליצור משהו אמיתי.",
  subtitle: "ערכות בוץ ביתיות ליצירת פסלים וכלים, וסדנאות חוויתיות בכל הארץ. כי האדמה הכי טובה מגיעה מהערבה.",
  heroLabel: "ערכות בוץ | סדנאות יצירה | אומנות מהטבע",
  phone: "050-0000000",
  whatsapp: "972500000000",
  email: "avraham@example.com",
  ctaText: "להזמנת ערכה או סדנא",
  products: [
    {
      icon: "🏺",
      title: "ערכת פיסול ביתית",
      desc: "בוץ טבעי מהערבה, כלי עבודה ומדריך מצולם. הכל בקופסה אחת — פשוט לפתוח וליצור.",
      tag: "מוצר הדגל",
    },
    {
      icon: "🫙",
      title: "ערכת כלי שימוש",
      desc: "ליצירת קערות, צלחות וכוסות מבוץ טבעי. כולל הדרכה לצריבה ביתית.",
      tag: "",
    },
    {
      icon: "🎨",
      title: "ערכת ילדים",
      desc: "מותאמת לגילאי 5-12. בוץ בצבעים טבעיים, תבניות ומדריך משחקי.",
      tag: "חדש",
    },
  ],
  workshops: [
    {
      title: "סדנה משפחתית",
      desc: "חוויה משותפת להורים וילדים — 3 שעות של יצירה מהבוץ באווירה חופשית.",
      duration: "3 שעות",
    },
    {
      title: "סדנת צוות / גיבוש",
      desc: "פעילות גיבוש יצירתית לצוותי עבודה. מתאימה ל-10-50 משתתפים.",
      duration: "4 שעות",
    },
    {
      title: "סדנה למתקדמים",
      desc: "טכניקות פיסול מתקדמות — עבודה על הגלגל, חיבורים ועיצוב חופשי.",
      duration: "5 שעות",
    },
  ],
  about: {
    headline: "מהאדמה של הערבה — לידיים שלכם.",
    text: "אני אברהם, ומעל 15 שנה אני עובד עם בוץ מהמצוקים של הערבה. התחלתי כאומן, והיום אני מביא את החוויה הזו לכל בית בישראל — דרך ערכות שמכילות הכל, וסדנאות שפותחות את הידיים ואת הלב.",
  },
  formOptions: [
    "ערכת פיסול ביתית",
    "ערכת כלי שימוש",
    "ערכת ילדים",
    "סדנה משפחתית",
    "סדנת צוות / גיבוש",
    "סדנה למתקדמים",
    "שאלה כללית",
  ],
}

// ── Colors — Desert earth tones, Arava landscape ──
const clr = {
  clay: "#B5654A",
  clayDark: "#8B4A35",
  clayLight: "#D4956F",
  sand: "#D4C5A9",
  sandLight: "#EDE6D6",
  sandDark: "#B0A48A",
  earth: "#6B5B4A",
  earthDark: "#4A3D30",
  warmWhite: "#FBF8F3",
  cream: "#F5EFE6",
  terracotta: "#C67D5B",
  ochre: "#C49A3C",
  ochreLight: "#E8D48B",
  textDark: "#3D3529",
  textMuted: "#6B6358",
  textLight: "#9A9186",
  white: "#FFFFFF",
  border: "#E0D8CC",
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i: number = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      style={{ padding: "90px 24px", ...style }}>
      {children}
    </motion.section>
  )
}

function Wrap({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: 1060, margin: "0 auto", ...style }}>{children}</div>
}

export default function LandingPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", option: "" })
  const [sent, setSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return alert("נא למלא שם וטלפון")
    try {
      // TODO: webhook
      // @ts-ignore
      if (typeof window !== "undefined" && window.fbq) { // @ts-ignore
        window.fbq("track", "Lead")
      }
      setSent(true)
    } catch { alert("שגיאה, נסו שנית") }
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', system-ui, sans-serif", color: clr.textDark, background: clr.warmWhite, overflowX: "hidden" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Frank+Ruhl+Libre:wght@300;400;500;700&display=swap');
      `}</style>

      {/* ════════ HEADER ════════ */}
      <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 28px", height: 64,
          background: scrolled ? `${clr.warmWhite}f0` : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${clr.border}` : "none",
          transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: `linear-gradient(135deg, ${clr.clay}, ${clr.ochre})`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
          }}>🏺</div>
          <span style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 16, fontWeight: 700, color: clr.earthDark }}>{C.brand}</span>
        </div>
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {[{ l: "ערכות", id: "products" }, { l: "סדנאות", id: "workshops" }, { l: "הזמנה", id: "contact" }].map(({ l, id }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, color: clr.textMuted, fontFamily: "inherit" }}>{l}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: clr.clay, color: clr.white, border: "none",
            padding: "9px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          }}>{C.ctaText}</button>
        </nav>
      </motion.header>

      {/* ════════ HERO ════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: `linear-gradient(175deg, ${clr.warmWhite} 0%, ${clr.cream} 35%, ${clr.sandLight} 100%)`,
        padding: "110px 24px 80px", position: "relative", overflow: "hidden",
      }}>
        {/* Desert-inspired decorative shapes */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: `linear-gradient(to top, ${clr.sand}25, transparent)` }} />
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: `${clr.ochre}06` }} />
        <div style={{ position: "absolute", bottom: "15%", left: "-5%", width: 350, height: 350, borderRadius: "50%", background: `${clr.clay}05` }} />

        <Wrap style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "7px 18px", borderRadius: 8,
                background: `${clr.clay}10`, border: `1px solid ${clr.clay}20`,
                fontSize: 12, color: clr.clay, marginBottom: 24,
              }}>
              🌍 {C.heroLabel}
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                fontWeight: 700, lineHeight: 1.15, margin: "0 0 18px 0",
                color: clr.earthDark, whiteSpace: "pre-line",
              }}>
              {C.tagline}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ fontSize: 17, lineHeight: 1.75, color: clr.textMuted, margin: "0 0 32px 0", maxWidth: 480 }}>
              {C.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("products")} style={{
                background: clr.clay, color: clr.white, border: "none",
                padding: "14px 34px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", boxShadow: `0 4px 16px ${clr.clay}30`,
                transition: "all 0.3s",
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = clr.clayDark)}
                onMouseOut={(e) => (e.currentTarget.style.background = clr.clay)}>
                לערכות הבוץ 🏺
              </button>
              <button onClick={() => scrollTo("workshops")} style={{
                padding: "14px 28px", borderRadius: 10,
                border: `1.5px solid ${clr.border}`, background: clr.white,
                color: clr.textDark, fontSize: 14, fontWeight: 500,
                cursor: "pointer", fontFamily: "inherit",
              }}>
                לסדנאות →
              </button>
            </motion.div>
          </div>

          {/* Hero visual - product/landscape image area */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <div style={{
              width: "100%", aspectRatio: "4/3", borderRadius: 20, overflow: "hidden",
              background: `linear-gradient(135deg, ${clr.sand}, ${clr.sandLight})`,
              boxShadow: `0 20px 50px ${clr.earth}15`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: clr.textLight, fontSize: 14, position: "relative",
            }}>
              {/* Replace with hero image — products + desert landscape */}
              📸 תמונת מוצר + נוף ערבה
              <div style={{
                position: "absolute", bottom: 16, left: 16,
                background: `${clr.earthDark}dd`, color: clr.white,
                padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 500,
                backdropFilter: "blur(8px)",
              }}>
                בוץ טבעי מהמצוקים של הערבה
              </div>
            </div>
          </motion.div>
        </Wrap>
      </section>

      {/* ════════ PRODUCTS ════════ */}
      <Section id="products" style={{ background: clr.white }}>
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.clay, letterSpacing: "0.06em" }}>ערכות בוץ</span>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: clr.earthDark, margin: "10px 0 0 0" }}>
              הכל בקופסה. פשוט ליצור.
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {C.products.map((p, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} whileHover={{ y: -6 }}
                style={{
                  padding: "36px 28px", borderRadius: 20, position: "relative",
                  background: clr.cream, border: `1px solid ${clr.border}`,
                  transition: "all 0.3s",
                }}>
                {p.tag && (
                  <span style={{
                    position: "absolute", top: 16, left: 16,
                    background: p.tag === "מוצר הדגל" ? clr.clay : clr.ochre,
                    color: clr.white, padding: "4px 12px", borderRadius: 6,
                    fontSize: 11, fontWeight: 600,
                  }}>{p.tag}</span>
                )}
                <span style={{ fontSize: 36 }}>{p.icon}</span>
                <h3 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 20, fontWeight: 700, color: clr.earthDark, margin: "16px 0 10px 0" }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: clr.textMuted, margin: "0 0 20px 0" }}>{p.desc}</p>
                <button onClick={() => scrollTo("contact")} style={{
                  background: "none", border: `1.5px solid ${clr.clay}`, color: clr.clay,
                  padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}
                  onMouseOver={(e) => { e.currentTarget.style.background = clr.clay; e.currentTarget.style.color = clr.white }}
                  onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = clr.clay }}>
                  להזמנה →
                </button>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ════════ WORKSHOPS ════════ */}
      <Section id="workshops" style={{ background: clr.cream }}>
        <Wrap>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 50 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.ochre, letterSpacing: "0.06em" }}>סדנאות</span>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, color: clr.earthDark, margin: "10px 0 0 0" }}>
              ידיים באדמה. חוויה אמיתית.
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {C.workshops.map((w, i) => (
              <motion.div key={i} variants={scaleIn} custom={i} whileHover={{ y: -4 }}
                style={{
                  padding: "32px 26px", borderRadius: 20,
                  background: clr.white, border: `1px solid ${clr.border}`,
                  transition: "all 0.3s",
                }}>
                <div style={{
                  display: "inline-flex", padding: "5px 12px", borderRadius: 6,
                  background: `${clr.ochre}12`, fontSize: 11, fontWeight: 600, color: clr.ochre, marginBottom: 14,
                }}>
                  ⏱ {w.duration}
                </div>
                <h3 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: 19, fontWeight: 700, color: clr.earthDark, margin: "0 0 10px 0" }}>{w.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: clr.textMuted, margin: "0 0 18px 0" }}>{w.desc}</p>
                <button onClick={() => scrollTo("contact")} style={{
                  background: clr.ochre, color: clr.white, border: "none",
                  padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                }}
                  onMouseOver={(e) => (e.currentTarget.style.background = clr.clay)}
                  onMouseOut={(e) => (e.currentTarget.style.background = clr.ochre)}>
                  לפרטים והזמנה
                </button>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ════════ ABOUT ════════ */}
      <Section id="about" style={{ background: clr.white }}>
        <Wrap style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 60, alignItems: "center" }}>
          <motion.div variants={fadeUp}>
            <div style={{
              width: "100%", aspectRatio: "3/4", borderRadius: 20, overflow: "hidden",
              background: `linear-gradient(135deg, ${clr.sand}, ${clr.cream})`,
              boxShadow: `0 12px 40px ${clr.earth}10`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: clr.textLight, fontSize: 13,
            }}>
              📸 תמונת אברהם + מצוקים
            </div>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.clay, letterSpacing: "0.06em" }}>הסיפור</span>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 700, color: clr.earthDark, margin: "10px 0 18px 0", lineHeight: 1.2 }}>
              {C.about.headline}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: clr.textMuted, margin: 0 }}>{C.about.text}</p>
          </motion.div>
        </Wrap>
      </Section>

      {/* ════════ CONTACT ════════ */}
      <Section id="contact" style={{ background: clr.cream }}>
        <Wrap style={{ maxWidth: 560 }}>
          <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: 30 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: clr.clay, letterSpacing: "0.06em" }}>הזמנה</span>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: clr.earthDark, margin: "10px 0 8px 0" }}>
              בואו ניצור ביחד.
            </h2>
            <p style={{ fontSize: 14, color: clr.textMuted }}>השאירו פרטים ונחזור אליכם לגבי הזמנה או שאלות.</p>
          </motion.div>

          {sent ? (
            <motion.div variants={fadeUp} style={{ padding: 50, textAlign: "center", borderRadius: 24, background: clr.white, border: `1px solid ${clr.border}` }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>🏺</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: clr.earthDark, margin: "0 0 8px 0" }}>תודה! הפרטים נשלחו.</h3>
              <p style={{ color: clr.textMuted, fontSize: 14 }}>נחזור אליכם בהקדם.</p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} onSubmit={handleSubmit} style={{
              padding: "36px 32px", borderRadius: 24,
              background: clr.white, border: `1px solid ${clr.border}`,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              {[
                { name: "name", label: "שם מלא", type: "text", ph: "השם שלכם" },
                { name: "phone", label: "טלפון", type: "tel", ph: "050-0000000" },
              ].map(({ name, label, type, ph }) => (
                <div key={name}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textDark, marginBottom: 5 }}>{label}</label>
                  <input type={type} placeholder={ph} value={formData[name as keyof typeof formData]}
                    onChange={(e) => setFormData((p) => ({ ...p, [name]: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 10,
                      border: `1.5px solid ${clr.border}`, background: clr.warmWhite,
                      fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = clr.clay)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = clr.border)}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textDark, marginBottom: 5 }}>מה מעניין אתכם?</label>
                <select value={formData.option} onChange={(e) => setFormData((p) => ({ ...p, option: e.target.value }))}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${clr.border}`, background: clr.warmWhite, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box", cursor: "pointer" }}>
                  <option value="">בחרו אפשרות</option>
                  {C.formOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit" style={{
                width: "100%", padding: "14px", borderRadius: 10, border: "none",
                background: clr.clay, color: clr.white, fontSize: 15, fontWeight: 600,
                fontFamily: "inherit", cursor: "pointer", transition: "all 0.3s",
              }}
                onMouseOver={(e) => (e.currentTarget.style.background = clr.clayDark)}
                onMouseOut={(e) => (e.currentTarget.style.background = clr.clay)}>
                שליחה 🌍
              </button>
            </motion.form>
          )}
        </Wrap>
      </Section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ padding: "32px 24px", background: clr.earthDark, color: `${clr.white}70` }}>
        <Wrap style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} {C.brand} | {C.name}</span>
          <span style={{ fontSize: 12 }}>{C.phone}</span>
        </Wrap>
      </footer>

      {/* ════════ FLOATING WHATSAPP ════════ */}
      <motion.a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          width: 52, height: 52, borderRadius: "50%",
          background: "#25D366", color: clr.white,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, textDecoration: "none",
          boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
        }}>
        💬
      </motion.a>

      <style jsx global>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          section { padding: 60px 18px !important; }
          h1 { font-size: 2rem !important; }
        }
      `}</style>
    </div>
  )
}
