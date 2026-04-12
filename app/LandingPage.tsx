"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

/* ═══════════════════════════════════════════════════════════
   בַּבּוֹץ
   ערכות בוץ טיפוליות ליצירה, מגע וחיבור לחומר

   Design principles:
   - Paper-like, layered, mineral
   - Soft edges, breathing, quiet warmth
   - Subtle asymmetry, no icons, no playfulness
   - Premium without being flashy
   - Typography: stable and soft
   ═══════════════════════════════════════════════════════════ */

const C = {
  brand: "בַּבּוֹץ",
  ownerName: "אברהם זיסמן",
  tagline: "לגעת בחומר.\nלחזור לאדמה.",
  subtitle: "ערכות בוץ טבעי ליצירה, מגע וחיבור — לבית ולקליניקה.\nחומר אמיתי, מהאדמה, ישר לידיים.",
  phone: "050-0000000",
  whatsapp: "972500000000",
  email: "info@babotz.co.il",
  address: "ישראל",
  ctaText: "השאירו פרטים",
  services: [
    {
      title: "ערכה ביתית",
      desc: "ערכת בוץ מוכנה לשימוש בבית — חוויה חושית ויצירתית למשפחות, ימי הולדת ופעילות עם ילדים.",
      label: "לבית",
    },
    {
      title: "ערכה קלינית",
      desc: "ערכות בוץ באיכות טיפולית למרפאים בעיסוק, ארט תרפיסטים ומטפלים. יחסי חומרים מדויקים, מרקם נכון.",
      label: "למטפלים",
    },
    {
      title: "התאמה אישית",
      desc: "הרכבים מותאמים לצרכים ספציפיים — מרקם, צבע, כמות ותכונות. לפי דרישת המטפל או הלקוח.",
      label: "בהזמנה",
    },
    {
      title: "סדנאות",
      desc: "סדנאות בוץ לקבוצות, צוותים, מוסדות חינוך ואירועים. חוויה חושית משותפת עם חומר אמיתי.",
      label: "חוויה",
    },
  ],
  about: {
    headline: "בוץ. פשוט. אמיתי.",
    text: "בַּבּוֹץ נולד מתוך אמונה שלמגע עם חומר אמיתי יש כוח. לא צעצוע, לא גימיק — חומר גלם מהאדמה, ביחסים הנכונים, שמזמין לגעת, ליצור ולהרגיש.",
    secondary: "הערכות שלנו מביאות את החוויה הזאת הביתה ולקליניקה. בצורה נגישה, נקייה ומקצועית.",
    points: [
      "חומרי גלם טבעיים מהאדמה הישראלית",
      "מותאם לשימוש ביתי וטיפולי כאחד",
      "פיתוח עצמי — מהרכב ועד אריזה",
      "איכות מקצועית בגישה אישית",
    ],
  },
  testimonials: [
    { text: "הערכה הגיעה מוכנה ומושלמת. הילדים היו בעננים — שעתיים של יצירה ושקט.", name: "ל., אמא לשלושה" },
    { text: "אני משתמשת בערכות הקליניות בטיפולי ריפוי בעיסוק. החומר פשוט מעולה — טבעי ונעים למגע.", name: "ד., מרפאה בעיסוק" },
    { text: "הזמנו לאירוע גיבוש. החוויה הייתה משהו אחר לגמרי. כולם דיברו על זה אחר כך.", name: "ר., מנהל צוות" },
  ],
  formOptions: [
    "ערכה ביתית",
    "ערכה קלינית",
    "הזמנה מרובה / מוסדות",
    "סדנה / אירוע",
    "התאמה אישית",
    "אחר",
  ],
}

/* ── Palette ── */
const clr = {
  // Core earth
  creamSand: "#E6CBB8",
  softClay: "#C59F86",
  warmEarth: "#C88562",
  terracottaDust: "#AC7157",
  deepSoil: "#8A5D4B",
  darkMud: "#4A291B",
  // Neutrals
  paperLight: "#F0ECE6",
  mineralTaupe: "#CEBCA5",
  // Functional
  bg: "#F6F2ED",
  surface: "#FDFBF8",
  textPrimary: "#4A291B",
  textSecondary: "#8A5D4B",
  textTertiary: "#AC7157",
  textMuted: "#B8A494",
  accent: "#C88562",
  border: "#E6DDD3",
  borderSoft: "#EDE7DF",
}

/* ── Animations ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 1, 0.35, 1] },
  }),
}

function Section({ children, id, style }: { children: React.ReactNode; id?: string; style?: React.CSSProperties }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      style={{ ...style }}>
      {children}
    </motion.section>
  )
}

function Wrap({ children, max = 1040, style }: { children: React.ReactNode; max?: number; style?: React.CSSProperties }) {
  return <div style={{ maxWidth: max, margin: "0 auto", padding: "0 28px", ...style }}>{children}</div>
}

/* ── Brand logo — earth + sky circle with בַּבּוֹץ ──
   Based on reference: flowing earth layers with sky blue accent.
   Text sits in the cream hilltop area (upper-right).
   Sky-blue (תכלת) replaces the dark layer — gives air to warm tones.
   ── */
function BrandLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: 48, md: 64, lg: 120 }[size]
  const fs = { sm: 28, md: 28, lg: 28 }[size]
  const uid = `bl-${Math.random().toString(36).slice(2, 8)}`

  const lc = {
    cream: "#F0E4D6",
    taupe: "#B8A48E",
    sky: "#8BAEBF",
    brown: "#7A4E30",
    terracotta: "#B5724A",
    caramel: "#C8935E",
    sand: "#D4AA78",
    mud: "#4A2D1A",
  }

  return (
    <svg width={s} height={s} viewBox="0 0 200 200" fill="none" style={{ display: "block" }}>
      <defs>
        <clipPath id={uid}><circle cx="100" cy="100" r="98" /></clipPath>
      </defs>
      <g clipPath={`url(#${uid})`}>
        {/* Base — warm cream */}
        <rect width="200" height="200" fill={lc.cream} />

        {/* Taupe hill — sweeps from top-right down across to left,
            leaves cream space at top-right for the text */}
        <path
          d="M210 -10 C180 10, 140 20, 100 50 C60 80, 30 60, -10 80 L-10 120 C30 100, 70 110, 110 85 C150 60, 185 45, 210 30 Z"
          fill={lc.taupe}
        />

        {/* Sky / תכלת — the breathing layer, S-curve through the middle */}
        <path
          d="M-10 80 C30 60, 70 110, 110 85 C150 60, 180 90, 210 70 L210 130 C175 145, 140 110, 100 135 C60 160, 25 125, -10 140 Z"
          fill={lc.sky}
        />

        {/* Dark brown — below sky, contrasts warm */}
        <path
          d="M-10 140 C25 125, 60 160, 100 135 C140 110, 175 145, 210 130 L210 165 C180 175, 145 155, 105 170 C65 185, 30 165, -10 178 Z"
          fill={lc.brown}
        />

        {/* Terracotta — warm mid-layer */}
        <path
          d="M-10 170 C30 158, 65 178, 105 164 C145 150, 180 168, 210 158 L210 190 C175 196, 140 182, 100 192 C60 202, 25 188, -10 198 Z"
          fill={lc.terracotta}
        />

        {/* Caramel — golden warmth */}
        <path
          d="M-10 192 C25 184, 60 198, 100 188 C140 178, 175 192, 210 186 L210 210 L-10 210 Z"
          fill={lc.caramel}
        />

        {/* Sand — bottom base glow */}
        <path
          d="M-10 204 C40 198, 80 206, 120 200 C160 194, 190 202, 210 198 L210 210 L-10 210 Z"
          fill={lc.sand}
        />
      </g>

      {/* בַּבּוֹץ — sitting in the cream hilltop, upper-right area */}
      <text
        x="132" y="38"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Frank Ruhl Libre', serif"
        fontSize={fs}
        fontWeight="700"
        fill={lc.mud}
      >
        {C.brand}
      </text>

      {/* Subtle outer rim */}
      <circle cx="100" cy="100" r="97.5" stroke={lc.mud} strokeWidth="1" opacity="0.07" />
    </svg>
  )
}

/* ── Decorative mineral layer bar ── */
function MineralBar({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      width: "100%", height: 4, borderRadius: 2,
      background: `linear-gradient(90deg, ${clr.creamSand} 0%, ${clr.softClay} 30%, ${clr.warmEarth} 55%, ${clr.terracottaDust} 75%, ${clr.deepSoil} 100%)`,
      opacity: 0.45,
      ...style,
    }} />
  )
}

/* ── Earth layers visual (packaging reference) ── */
function EarthLayers({ style }: { style?: React.CSSProperties }) {
  const layers = [
    { color: clr.paperLight, flex: 12 },
    { color: clr.creamSand, flex: 10 },
    { color: clr.softClay, flex: 14 },
    { color: clr.warmEarth, flex: 12 },
    { color: clr.terracottaDust, flex: 14 },
    { color: clr.deepSoil, flex: 10 },
    { color: clr.darkMud, flex: 8 },
  ]
  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      borderRadius: 16, overflow: "hidden",
      ...style,
    }}>
      {layers.map((l, i) => (
        <div key={i} style={{
          flex: l.flex, background: l.color, width: "100%",
          opacity: 0.92 + (i * 0.01),
        }} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN
   ═══════════════════════════════════════ */
export default function LandingPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" })
  const [sent, setSent] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
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
    width: "100%", padding: "14px 16px", borderRadius: 10,
    border: `1px solid ${clr.borderSoft}`, background: clr.bg,
    fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.25s", color: clr.textPrimary,
  }

  return (
    <div dir="rtl" style={{
      fontFamily: "'Heebo', system-ui, sans-serif",
      color: clr.textPrimary, background: clr.bg, overflowX: "hidden",
      WebkitFontSmoothing: "antialiased",
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Frank+Ruhl+Libre:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
        ::selection { background: ${clr.creamSand}; color: ${clr.darkMud}; }
      `}</style>

      {/* ════════ HEADER ════════ */}
      <motion.header
        initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 36px", height: 72,
          background: scrolled ? `${clr.bg}ee` : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? `1px solid ${clr.borderSoft}` : "none",
          transition: "all 0.5s ease", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <BrandLogo size="md" />
        <button onClick={() => scrollTo("contact")} style={{
          background: "transparent", color: clr.deepSoil,
          border: `1px solid ${clr.border}`,
          padding: "7px 20px", borderRadius: 6, fontSize: 12.5,
          fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
          transition: "all 0.3s", letterSpacing: "0.02em",
        }}
          onMouseOver={(e) => { e.currentTarget.style.background = clr.darkMud; e.currentTarget.style.color = clr.paperLight; e.currentTarget.style.borderColor = clr.darkMud }}
          onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = clr.deepSoil; e.currentTarget.style.borderColor = clr.border }}
        >
          {C.ctaText}
        </button>
      </motion.header>

      {/* ════════ HERO ════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: clr.bg,
        padding: "100px 0 80px", position: "relative",
      }}>
        <Wrap max={1100} style={{ display: "grid", gridTemplateColumns: "1fr 0.75fr", gap: 100, alignItems: "center", position: "relative", zIndex: 2 }}>
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}
              style={{ marginBottom: 40 }}>
              <MineralBar style={{ width: 64, marginBottom: 32 }} />
              <p style={{
                fontSize: 12.5, fontWeight: 500, color: clr.textMuted,
                letterSpacing: "0.12em", textTransform: "uppercase",
                margin: 0,
              }}>
                ערכות בוץ טיפוליות ויצירתיות
              </p>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
              style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: "clamp(2.6rem, 5vw, 3.8rem)",
                fontWeight: 700, lineHeight: 1.15, margin: "0 0 28px 0",
                color: clr.darkMud, whiteSpace: "pre-line",
                letterSpacing: "-0.02em",
              }}>
              {C.tagline}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                fontSize: 16.5, lineHeight: 1.85, color: clr.textSecondary,
                margin: "0 0 40px 0", maxWidth: 440, whiteSpace: "pre-line",
              }}>
              {C.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <button onClick={() => scrollTo("contact")} style={{
                background: clr.darkMud, color: clr.paperLight, border: "none",
                padding: "13px 32px", borderRadius: 8, fontSize: 14,
                fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.3s", letterSpacing: "0.01em",
              }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {C.ctaText}
              </button>
              <a href={`https://wa.me/${C.whatsapp}?text=${encodeURIComponent("היי, אשמח לשמוע עוד על ערכות הבוץ")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: "13px 24px", borderRadius: 8,
                  border: `1px solid ${clr.border}`, background: "transparent",
                  color: clr.textSecondary, fontSize: 13.5, fontWeight: 500,
                  textDecoration: "none", fontFamily: "inherit",
                  transition: "all 0.3s",
                }}>
                WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Hero — earth layers block, like the packaging */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.25, 1, 0.35, 1] }}
            style={{ position: "relative" }}>
            <div style={{
              width: "100%", aspectRatio: "3 / 4", position: "relative",
            }}>
              <EarthLayers style={{
                boxShadow: `0 24px 64px ${clr.darkMud}12, 0 8px 24px ${clr.darkMud}08`,
              }} />
              {/* Brand mark on layers */}
              <div style={{ position: "absolute", top: 24, right: 24 }}>
                <BrandLogo size="sm" />
              </div>
            </div>
          </motion.div>
        </Wrap>
      </section>

      {/* ════════ VALUES ════════ */}
      <section style={{ background: clr.surface, borderTop: `1px solid ${clr.borderSoft}`, borderBottom: `1px solid ${clr.borderSoft}` }}>
        <Wrap style={{ padding: "72px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 56 }}>
            {[
              { title: "חומר אמיתי", text: "בוץ טבעי מהאדמה הישראלית. ללא תוספים מלאכותיים, ללא צבעי מאכל. חומר גלם." },
              { title: "יחסי חומרים נכונים", text: "כל ערכה עוברת פיתוח — הרכב מדויק שמבטיח חוויה טובה בכל פתיחה." },
              { title: "מניסיון אמיתי", text: "נולד מתוך שנים של עבודה עם בוץ וסדנאות. לא ממעבדה — מהשטח." },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}>
                <div style={{
                  width: 32, height: 2, background: clr.accent, opacity: 0.5,
                  marginBottom: 20, borderRadius: 1,
                }} />
                <h3 style={{
                  fontSize: 15, fontWeight: 700, color: clr.textPrimary,
                  margin: "0 0 8px 0", letterSpacing: "0.01em",
                }}>{v.title}</h3>
                <p style={{
                  fontSize: 13.5, lineHeight: 1.75, color: clr.textSecondary, margin: 0,
                }}>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ════════ SERVICES ════════ */}
      <Section id="services" style={{ padding: "100px 0", background: clr.bg }}>
        <Wrap>
          <motion.div variants={fadeUp} style={{ marginBottom: 56 }}>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: clr.accent, letterSpacing: "0.14em", marginBottom: 12 }}>
              מה בפנים
            </p>
            <h2 style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: clr.darkMud, margin: 0,
              letterSpacing: "-0.01em",
            }}>
              הבוץ שלנו, בדרך שלכם.
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {C.services.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                style={{
                  padding: "36px 32px", borderRadius: 14,
                  background: clr.surface, border: `1px solid ${clr.borderSoft}`,
                  transition: "border-color 0.3s",
                }}
                onMouseOver={(e: any) => e.currentTarget.style.borderColor = clr.border}
                onMouseOut={(e: any) => e.currentTarget.style.borderColor = clr.borderSoft}
              >
                <span style={{
                  display: "inline-block", fontSize: 10, fontWeight: 600,
                  color: clr.accent, letterSpacing: "0.1em",
                  marginBottom: 16,
                }}>
                  {s.label}
                </span>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: clr.textPrimary, margin: "0 0 10px 0" }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: clr.textSecondary, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ════════ ABOUT ════════ */}
      <Section id="about" style={{
        padding: "100px 0",
        background: clr.surface,
        borderTop: `1px solid ${clr.borderSoft}`,
      }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 80, alignItems: "center" }}>
            <motion.div variants={fadeUp}>
              <p style={{ fontSize: 11.5, fontWeight: 600, color: clr.accent, letterSpacing: "0.14em", marginBottom: 12 }}>
                הסיפור
              </p>
              <h2 style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: "clamp(1.7rem, 3vw, 2.3rem)", fontWeight: 700, color: clr.darkMud, margin: "0 0 24px 0",
                letterSpacing: "-0.01em",
              }}>
                {C.about.headline}
              </h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: clr.textSecondary, margin: "0 0 12px 0" }}>
                {C.about.text}
              </p>
              <p style={{ fontSize: 15.5, lineHeight: 1.9, color: clr.textSecondary, margin: "0 0 36px 0" }}>
                {C.about.secondary}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {C.about.points.map((p, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i + 1}
                    style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                      background: clr.accent, marginTop: 7, opacity: 0.6,
                    }} />
                    <span style={{ fontSize: 13.5, lineHeight: 1.6, color: clr.textSecondary }}>{p}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} style={{ display: "flex", justifyContent: "center" }}>
              <div style={{
                width: 280, height: 360, position: "relative",
                transform: "rotate(-1.5deg)",
              }}>
                <EarthLayers style={{
                  boxShadow: `0 20px 48px ${clr.darkMud}10`,
                }} />
              </div>
            </motion.div>
          </div>
        </Wrap>
      </Section>

      {/* ════════ TESTIMONIALS ════════ */}
      <Section style={{ padding: "100px 0", background: clr.bg }}>
        <Wrap>
          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: clr.accent, letterSpacing: "0.14em", marginBottom: 12 }}>
              מה אומרים
            </p>
            <h2 style={{
              fontFamily: "'Frank Ruhl Libre', serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: clr.darkMud, margin: 0,
              letterSpacing: "-0.01em",
            }}>
              קולות מהשטח
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {C.testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}
                style={{
                  padding: "32px 28px", borderRadius: 14,
                  background: clr.surface, border: `1px solid ${clr.borderSoft}`,
                  position: "relative",
                }}>
                <div style={{
                  fontFamily: "'Frank Ruhl Libre', serif",
                  fontSize: 40, color: clr.creamSand, lineHeight: 1,
                  marginBottom: 8, opacity: 0.7,
                }}>
                  ״
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: clr.textSecondary, margin: "0 0 20px 0" }}>
                  {t.text}
                </p>
                <div style={{ width: 24, height: 1.5, background: clr.creamSand, borderRadius: 1, marginBottom: 10 }} />
                <span style={{ fontSize: 12, color: clr.textMuted, fontWeight: 500 }}>{t.name}</span>
              </motion.div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ════════ CONTACT ════════ */}
      <Section id="contact" style={{
        padding: "100px 0",
        background: clr.surface,
        borderTop: `1px solid ${clr.borderSoft}`,
      }}>
        <Wrap>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <motion.div variants={fadeUp}>
              <p style={{ fontSize: 11.5, fontWeight: 600, color: clr.accent, letterSpacing: "0.14em", marginBottom: 12 }}>
                יצירת קשר
              </p>
              <h2 style={{
                fontFamily: "'Frank Ruhl Libre', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color: clr.darkMud, margin: "0 0 16px 0",
              }}>
                בואו נדבר.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: clr.textSecondary, margin: "0 0 40px 0", maxWidth: 380 }}>
                רוצים לשמוע עוד, להזמין ערכה או לתאם סדנה? השאירו פרטים ונחזור אליכם.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[C.phone, C.email, C.address].map((label) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: "50%", flexShrink: 0,
                      background: clr.accent, opacity: 0.5,
                    }} />
                    <span style={{ fontSize: 14, color: clr.textSecondary }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              {sent ? (
                <div style={{
                  padding: "60px 40px", textAlign: "center", borderRadius: 14,
                  background: clr.bg, border: `1px solid ${clr.borderSoft}`,
                }}>
                  <MineralBar style={{ width: 48, margin: "0 auto 28px" }} />
                  <h3 style={{ fontSize: 19, fontWeight: 700, color: clr.darkMud, margin: "0 0 8px 0" }}>תודה. הפרטים נשלחו.</h3>
                  <p style={{ color: clr.textSecondary, fontSize: 14 }}>נחזור אליכם בקרוב.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{
                  padding: "40px 36px", borderRadius: 14,
                  background: clr.bg, border: `1px solid ${clr.borderSoft}`,
                  display: "flex", flexDirection: "column", gap: 20,
                }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: clr.darkMud, margin: "0 0 4px 0" }}>השאירו פרטים</h3>
                    <p style={{ fontSize: 13, color: clr.textMuted, margin: 0 }}>ונחזור אליכם בהקדם.</p>
                  </div>
                  {[
                    { name: "name", label: "שם", type: "text", ph: "השם שלכם" },
                    { name: "phone", label: "טלפון", type: "tel", ph: "050-0000000" },
                  ].map(({ name, label, type, ph }) => (
                    <div key={name}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textSecondary, marginBottom: 6 }}>{label}</label>
                      <input type={type} placeholder={ph} value={formData[name as keyof typeof formData]}
                        onChange={(e) => setFormData((p) => ({ ...p, [name]: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = clr.accent)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = clr.borderSoft)}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: clr.textSecondary, marginBottom: 6 }}>מה מעניין אתכם?</label>
                    <select value={formData.service} onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                      style={{ ...inputStyle, cursor: "pointer" }}>
                      <option value="">בחרו נושא</option>
                      {C.formOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button type="submit" style={{
                    width: "100%", padding: "14px", borderRadius: 10, border: "none",
                    background: clr.darkMud, color: clr.paperLight, fontSize: 14, fontWeight: 600,
                    fontFamily: "inherit", cursor: "pointer", transition: "opacity 0.3s",
                    letterSpacing: "0.01em",
                  }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}>
                    שליחה
                  </button>
                  <p style={{ fontSize: 10.5, color: clr.textMuted, textAlign: "center", margin: 0 }}>
                    הפרטים שלכם מאובטחים ולא יועברו לגורם שלישי.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </Wrap>
      </Section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{
        padding: "32px 0",
        background: clr.darkMud,
        borderTop: `1px solid ${clr.deepSoil}30`,
      }}>
        <Wrap style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <BrandLogo size="sm" />
            <span style={{ fontSize: 10.5, color: `${clr.creamSand}45`, display: "block", marginTop: 6, letterSpacing: "0.02em" }}>
              © {new Date().getFullYear()} {C.ownerName}
            </span>
          </div>
          <span style={{ fontSize: 11.5, color: `${clr.creamSand}50` }}>{C.phone}</span>
        </Wrap>
      </footer>

      {/* ════════ FLOATING WHATSAPP ════════ */}
      <motion.a href={`https://wa.me/${C.whatsapp}`} target="_blank" rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 3, duration: 0.4 }}
        whileHover={{ scale: 1.06 }}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          width: 48, height: 48, borderRadius: "50%",
          background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center",
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(37,211,102,0.2)",
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
          h1 { font-size: 2.1rem !important; }
        }
      `}</style>
    </div>
  )
}
