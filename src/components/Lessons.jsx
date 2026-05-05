import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Lessons = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const lessonData = [
    {
      title: "Piano Lessons",
      description: "From classical foundations to modern jazz improvisation. Our piano sessions focus on posture, theory, and emotional expression.",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop",
      tag: "Melody & Harmony",
      color: "#00d2ff",
      icon: "🎹",
      level: "All Levels",
    },
    {
      title: "Drum Lessons",
      description: "Find your rhythm. Master everything from basic backbeats to complex polyrhythms in a high-energy environment.",
      image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop",
      tag: "Pulse & Power",
      color: "#ff6b35",
      icon: "🥁",
      level: "Beginner → Pro",
    },
    {
      title: "Guitar Lessons",
      description: "Acoustic or Electric. We cover fingerstyle, shredding, and chord theory to help you write your own anthems.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop",
      tag: "Strings & Soul",
      color: "#a855f7",
      icon: "🎸",
      level: "All Levels",
    },
    {
      title: "Brass Lessons",
      description: "Master the Trumpet, Trombone, or Saxophone. Focus on breath control, tone production, and section playing.",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
      tag: "Wind & Brass",
      color: "#fbbf24",
      icon: "🎺",
      level: "Intermediate",
    }
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % lessonData.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + lessonData.length) % lessonData.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % lessonData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [lessonData.length]);

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const active = lessonData[activeSlide];

  return (
    <div ref={containerRef} style={{ ...S.page, background: "#03040a" }}>

      {/* Cursor glow */}
      <div style={{
        position: "fixed",
        left: mousePos.x - 200,
        top: mousePos.y - 200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${active.color}18 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 0,
        transition: "left 0.1s, top 0.1s",
      }} />

      {/* Background grid */}
      <div style={S.grid} />

      {/* Ambient blobs */}
      <div style={{ ...S.blob, background: `radial-gradient(circle, ${active.color}22 0%, transparent 65%)`, top: "-200px", right: "-100px", transition: "background 0.8s" }} />
      <div style={{ ...S.blob, width: 500, height: 500, background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)", bottom: "-100px", left: "-100px" }} />

      {/* ── HERO HEADER ── */}
      <header style={S.header}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={S.eyebrow}>
            <span style={{ ...S.eyebrowDot, background: active.color, boxShadow: `0 0 10px ${active.color}` }} />
            MUSIC BASE ACADEMY — ELDORET
          </div>
          <h1 style={S.mainTitle}>
            Master Your{" "}
            <span style={{ ...S.gradientText, backgroundImage: `linear-gradient(90deg, ${active.color}, #a855f7)` }}>
              Craft
            </span>
          </h1>
          <p style={S.subtitle}>Human-led music education designed for the modern creator.</p>
        </motion.div>
      </header>

      {/* ── MAIN CAROUSEL ── */}
      <section style={S.carouselWrap}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={S.carouselCard}
          >
            {/* Glow border */}
            <div style={{ ...S.cardGlow, background: `linear-gradient(135deg, ${active.color}40, transparent, #a855f740)` }} />

            {/* Image side */}
            <div style={S.imageSide}>
              <img src={active.image} alt={active.title} style={S.carouselImg} />
              <div style={S.imageOverlay} />

              {/* Floating tag */}
              <div style={{ ...S.tagBadge, borderColor: active.color, color: active.color, background: `${active.color}18` }}>
                {active.tag}
              </div>

              {/* Level badge */}
              <div style={S.levelBadge}>{active.level}</div>

              {/* Big icon */}
              <div style={{ ...S.bigIcon, textShadow: `0 0 30px ${active.color}` }}>
                {active.icon}
              </div>
            </div>

            {/* Text side */}
            <div style={S.textSide}>
              <div style={{ ...S.accentLine, background: active.color, boxShadow: `0 0 20px ${active.color}` }} />

              <h2 style={{ ...S.lessonTitle, color: "#fff" }}>
                {active.title}
              </h2>

              <p style={S.lessonDesc}>{active.description}</p>

              {/* Stats row */}
              <div style={S.statsRow}>
                {[
                  { label: "Duration", value: "1hr / session" },
                  { label: "Format", value: "1-on-1" },
                  { label: "Location", value: "Elgon View" },
                ].map((s, i) => (
                  <div key={i} style={S.statItem}>
                    <span style={{ ...S.statValue, color: active.color }}>{s.value}</span>
                    <span style={S.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Contact box */}
              <div style={{ ...S.contactBox, borderColor: `${active.color}50` }}>
                <p style={{ ...S.contactInstruction, color: active.color }}>
                  ✦ ENROLL NOW — CONTACT US
                </p>
                {[
                  { icon: "📞", text: "0756705088" },
                  { icon: "✉️", text: "musicbase@gmail.com" },
                  { icon: "📍", text: "Eldoret, Elgon View" },
                ].map((c, i) => (
                  <div key={i} style={S.contactItem}>
                    <span style={S.miniIcon}>{c.icon}</span>
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div style={S.controls}>
          <button
            onClick={prevSlide}
            style={{ ...S.arrowBtn, borderColor: `${active.color}50` }}
            onMouseEnter={e => e.currentTarget.style.background = `${active.color}20`}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >←</button>

          <div style={S.dots}>
            {lessonData.map((l, i) => (
              <div
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  ...S.dot,
                  width: activeSlide === i ? "32px" : "10px",
                  background: activeSlide === i ? active.color : "rgba(255,255,255,0.2)",
                  boxShadow: activeSlide === i ? `0 0 10px ${active.color}` : "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            style={{ ...S.arrowBtn, borderColor: `${active.color}50` }}
            onMouseEnter={e => e.currentTarget.style.background = `${active.color}20`}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
          >→</button>
        </div>
      </section>

      {/* ── PROGRAM CARDS GRID ── */}
      <section style={S.gridSection}>
        <div style={S.sectionLabel}>
          <span style={{ ...S.eyebrowDot, background: "#00d2ff", boxShadow: "0 0 10px #00d2ff" }} />
          ALL PROGRAMS
        </div>
        <h3 style={S.sectionHeading}>Explore Every Discipline</h3>

        <div style={S.grid2}>
          {lessonData.map((item, index) => (
            <motion.div
              key={index}
              style={{
                ...S.smallCard,
                borderColor: hoveredCard === index ? item.color : "rgba(255,255,255,0.06)",
                boxShadow: hoveredCard === index ? `0 20px 60px ${item.color}20` : "none",
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div style={S.smallImgWrap}>
                <img src={item.image} alt={item.title} style={S.smallImg} />
                <div style={{ ...S.smallOverlay, background: `linear-gradient(to top, ${item.color}60, transparent)` }} />
                <span style={S.smallIcon}>{item.icon}</span>
              </div>

              <div style={S.smallBody}>
                <div style={{ ...S.smallTag, color: item.color, borderColor: `${item.color}40`, background: `${item.color}10` }}>
                  {item.tag}
                </div>
                <h4 style={S.smallTitle}>{item.title}</h4>
                <p style={S.smallLocation}>📍 Elgon View, Eldoret</p>

                <div style={{ ...S.smallBar, background: `${item.color}20` }}>
                  <div style={{ ...S.smallBarFill, background: item.color, width: hoveredCard === index ? "100%" : "0%" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section style={S.contactSection}>
        <motion.div
          style={S.contactCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Top glow strip */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #00d2ff, #a855f7, transparent)" }} />

          <div style={S.contactLabel}>
            <span style={{ ...S.eyebrowDot, background: "#00d2ff", boxShadow: "0 0 10px #00d2ff" }} />
            GET IN TOUCH
          </div>

          <h2 style={S.contactHeading}>Let's Start Your <span style={{ ...S.gradientText, backgroundImage: "linear-gradient(90deg, #00d2ff, #a855f7)" }}>Journey</span></h2>
          <p style={S.contactText}>Visit our studio or reach out to the Music Base team.</p>

          <div style={S.infoWrapper}>
            {[
              { icon: "📞", label: "Call Us", value: "0756705088", color: "#00d2ff" },
              { icon: "✉️", label: "Email Us", value: "musicbase@gmail.com", color: "#a855f7" },
              { icon: "📍", label: "Location", value: "Eldoret, Elgon View", color: "#fbbf24" },
            ].map((info, i) => (
              <motion.div
                key={i}
                style={{ ...S.infoBox, borderColor: `${info.color}30` }}
                whileHover={{ y: -5, borderColor: info.color }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span style={{ ...S.contactIcon, filter: `drop-shadow(0 0 12px ${info.color})` }}>{info.icon}</span>
                <div>
                  <p style={{ ...S.infoLabel, color: info.color }}>{info.label}</p>
                  <p style={S.infoValue}>{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

const S = {
  page: {
    minHeight: "100vh",
    color: "#fff",
    padding: "120px 20px 60px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  grid: {
    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
  },
  blob: { position: "absolute", width: 700, height: 700, borderRadius: "50%", zIndex: 0, filter: "blur(120px)", pointerEvents: "none" },

  // Header
  header: { textAlign: "center", marginBottom: "80px", position: "relative", zIndex: 1 },
  eyebrow: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.4)", marginBottom: "20px", textTransform: "uppercase" },
  eyebrowDot: { width: 8, height: 8, borderRadius: "50%", display: "inline-block", flexShrink: 0 },
  mainTitle: { fontSize: "clamp(2.8rem, 8vw, 5rem)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 1.05, fontFamily: "'Syne', sans-serif", margin: "0 0 16px" },
  gradientText: { WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  subtitle: { color: "rgba(255,255,255,0.45)", fontSize: "1.15rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 },

  // Carousel
  carouselWrap: { maxWidth: "1200px", margin: "0 auto 100px", position: "relative", zIndex: 1 },
  carouselCard: {
    display: "flex", flexWrap: "wrap",
    background: "rgba(12,14,20,0.85)",
    borderRadius: "32px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    minHeight: "520px",
    position: "relative",
    boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
  },
  cardGlow: { position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none", zIndex: 0 },
  imageSide: { flex: "1 1 420px", position: "relative", minHeight: "320px", overflow: "hidden" },
  carouselImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imageOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(12,14,20,0.9))" },
  tagBadge: { position: "absolute", top: "24px", left: "24px", padding: "8px 18px", borderRadius: "30px", fontSize: "12px", fontWeight: 700, border: "1px solid", letterSpacing: "1px", backdropFilter: "blur(10px)" },
  levelBadge: { position: "absolute", bottom: "24px", left: "24px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 600 },
  bigIcon: { position: "absolute", bottom: "20px", right: "20px", fontSize: "60px", opacity: 0.25 },

  textSide: { flex: "1 1 400px", padding: "50px 50px 50px 40px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 },
  accentLine: { width: "40px", height: "4px", borderRadius: "2px", marginBottom: "24px" },
  lessonTitle: { fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.1, fontFamily: "'Syne', sans-serif" },
  lessonDesc: { color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "28px", fontSize: "1.05rem" },

  statsRow: { display: "flex", gap: "24px", marginBottom: "28px", flexWrap: "wrap" },
  statItem: { display: "flex", flexDirection: "column", gap: "2px" },
  statValue: { fontSize: "15px", fontWeight: 700 },
  statLabel: { fontSize: "11px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1px" },

  contactBox: { background: "rgba(255,255,255,0.04)", padding: "22px 24px", borderRadius: "20px", border: "1px solid" },
  contactInstruction: { fontSize: "10px", fontWeight: 800, marginBottom: "14px", letterSpacing: "2px" },
  contactItem: { fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "10px", display: "flex", alignItems: "center" },
  miniIcon: { marginRight: "12px", fontSize: "16px", width: "20px", textAlign: "center" },

  controls: { display: "flex", alignItems: "center", justifyContent: "center", marginTop: "32px", gap: "24px" },
  arrowBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid", color: "#fff", width: "52px", height: "52px", borderRadius: "50%", cursor: "pointer", fontSize: "18px", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center" },
  dots: { display: "flex", gap: "8px", alignItems: "center" },
  dot: { height: "10px", borderRadius: "5px", transition: "all 0.4s ease" },

  // Grid
  gridSection: { maxWidth: "1200px", margin: "0 auto 120px", position: "relative", zIndex: 1 },
  sectionLabel: { display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.35)", marginBottom: "16px", textTransform: "uppercase" },
  sectionHeading: { fontSize: "clamp(1.8rem, 4vw, 2.8rem)", marginBottom: "48px", fontWeight: 900, fontFamily: "'Syne', sans-serif" },
  grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" },
  smallCard: { background: "rgba(255,255,255,0.03)", borderRadius: "24px", overflow: "hidden", border: "1px solid", cursor: "pointer", transition: "border-color 0.3s, box-shadow 0.3s" },
  smallImgWrap: { position: "relative", height: "180px", overflow: "hidden" },
  smallImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" },
  smallOverlay: { position: "absolute", inset: 0 },
  smallIcon: { position: "absolute", bottom: "12px", right: "12px", fontSize: "28px" },
  smallBody: { padding: "20px" },
  smallTag: { display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", padding: "4px 12px", borderRadius: "20px", border: "1px solid", marginBottom: "10px" },
  smallTitle: { fontSize: "1.15rem", fontWeight: 800, margin: "0 0 6px", fontFamily: "'Syne', sans-serif" },
  smallLocation: { fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "0 0 14px" },
  smallBar: { height: "3px", borderRadius: "2px", overflow: "hidden" },
  smallBarFill: { height: "100%", borderRadius: "2px", transition: "width 0.4s ease" },

  // Contact
  contactSection: { maxWidth: "1000px", margin: "0 auto 60px", position: "relative", zIndex: 1 },
  contactCard: { background: "rgba(12,14,20,0.8)", padding: "80px 40px", borderRadius: "40px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" },
  contactLabel: { display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.35)", marginBottom: "20px", textTransform: "uppercase" },
  contactHeading: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, margin: "0 0 16px", fontFamily: "'Syne', sans-serif" },
  contactText: { color: "rgba(255,255,255,0.45)", marginBottom: "50px", fontSize: "1.1rem" },
  infoWrapper: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" },
  infoBox: { display: "flex", alignItems: "center", gap: "20px", textAlign: "left", background: "rgba(255,255,255,0.03)", padding: "24px 32px", borderRadius: "20px", border: "1px solid", transition: "all 0.3s", minWidth: "240px" },
  contactIcon: { fontSize: "32px" },
  infoLabel: { fontSize: "11px", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 },
  infoValue: { fontSize: "1.1rem", fontWeight: 800, color: "#fff", margin: 0 },
};

export default Lessons;