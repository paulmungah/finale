import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Lessons = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const lessonData = [
    {
      title: "Piano Lessons",
      description: "From classical foundations to modern jazz improvisation. Our piano sessions focus on posture, theory, and emotional expression.",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop",
      tag: "Melody & Harmony"
    },
    {
      title: "Drum Lessons",
      description: "Find your rhythm. Master everything from basic backbeats to complex polyrhythms in a high-energy environment.",
      image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop",
      tag: "Pulse & Power"
    },
    {
      title: "Guitar Lessons",
      description: "Acoustic or Electric. We cover fingerstyle, shredding, and chord theory to help you write your own anthems.",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop",
      tag: "Strings & Soul"
    },
    {
      title: "Brass Lessons",
      description: "Master the Trumpet, Trombone, or Saxophone. Focus on breath control, tone production, and section playing.",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop",
      tag: "Wind & Brass"
    }
  ];

  // Manual navigation functions
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % lessonData.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + lessonData.length) % lessonData.length);

  // Auto-play effect with fix for ESLint exhaustive-deps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % lessonData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [lessonData.length]);

  return (
    <div style={styles.container}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <header style={styles.header}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.mainTitle}
        >
          Master Your <span style={styles.gradientText}>Craft</span>
        </motion.h1>
        <p style={styles.subtitle}>Human-led music education designed for the modern creator.</p>
      </header>

      <section style={styles.carouselContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            style={styles.carouselCard}
          >
            <div style={styles.imageSide}>
              <img src={lessonData[activeSlide].image} alt={lessonData[activeSlide].title} style={styles.carouselImg} />
              <div style={styles.tagBadge}>{lessonData[activeSlide].tag}</div>
            </div>
            <div style={styles.textSide}>
              <h2 style={styles.lessonTitle}>{lessonData[activeSlide].title}</h2>
              <p style={styles.lessonDesc}>{lessonData[activeSlide].description}</p>
              
              <div style={styles.directContactBox}>
                <p style={styles.contactInstruction}>To enroll, contact us directly:</p>
                <div style={styles.contactItem}><span style={styles.miniIcon}>📞</span> 0756705088</div>
                <div style={styles.contactItem}><span style={styles.miniIcon}>✉️</span> musicbase@gmail.com</div>
                <div style={styles.contactItem}><span style={styles.miniIcon}>📍</span> Eldoret, Elgon View</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div style={styles.controls}>
          <button onClick={prevSlide} style={styles.arrowBtn}>←</button>
          <div style={styles.dots}>
            {lessonData.map((_, i) => (
              <div key={i} style={{ ...styles.dot, backgroundColor: activeSlide === i ? "#00d2ff" : "#333" }} />
            ))}
          </div>
          <button onClick={nextSlide} style={styles.arrowBtn}>→</button>
        </div>
      </section>

      <section style={styles.gridSection}>
        <h3 style={styles.sectionHeading}>Explore Programs</h3>
        <div style={styles.grid}>
          {lessonData.map((item, index) => (
            <motion.div 
              key={index} 
              style={styles.smallCard}
              whileHover={{ y: -10, borderColor: "#00d2ff" }}
            >
              <img src={item.image} alt={item.title} style={styles.smallImg} />
              <h4 style={styles.smallTitle}>{item.title}</h4>
              <p style={{fontSize: '0.8rem', color: '#00d2ff', marginTop: '5px', fontWeight: '600'}}>Elgon View, Eldoret</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={styles.contactSection}>
        <div style={styles.contactCard}>
          <h2 style={styles.contactHeading}>Let's Start Your Journey</h2>
          <p style={styles.contactText}>Visit our studio or reach out to the Music Base team.</p>
          
          <div style={styles.infoWrapper}>
            <div style={styles.infoBox}>
              <span style={styles.contactIcon}>📞</span>
              <div>
                <p style={styles.infoLabel}>Call Us</p>
                <p style={styles.infoValue}>0756705088</p>
              </div>
            </div>
            
            <div style={styles.infoBox}>
              <span style={styles.contactIcon}>✉️</span>
              <div>
                <p style={styles.infoLabel}>Email Us</p>
                <p style={styles.infoValue}>musicbase@gmail.com</p>
              </div>
            </div>

            <div style={styles.infoBox}>
              <span style={styles.contactIcon}>📍</span>
              <div>
                <p style={styles.infoLabel}>Location</p>
                <p style={styles.infoValue}>Eldoret, Elgon View</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#050505",
    color: "#fff",
    padding: "120px 20px 60px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif"
  },
  blob1: { position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0, 210, 255, 0.15) 0%, transparent 70%)", top: "-200px", right: "-100px", zIndex: 0 },
  blob2: { position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)", bottom: "-100px", left: "-100px", zIndex: 0 },
  header: { textAlign: "center", marginBottom: "80px", position: "relative", zIndex: 1 },
  mainTitle: { fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: "900", letterSpacing: "-2px" },
  gradientText: { background: "linear-gradient(90deg, #00d2ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", maxWidth: "600px", margin: "10px auto" },
  carouselContainer: { maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 },
  carouselCard: { 
    display: "flex", 
    background: "rgba(20, 20, 25, 0.6)", 
    borderRadius: "40px", 
    overflow: "hidden", 
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    minHeight: "500px",
    flexWrap: "wrap"
  },
  imageSide: { flex: "1 1 400px", position: "relative", minHeight: "300px" },
  carouselImg: { width: "100%", height: "100%", objectFit: "cover" },
  tagBadge: { position: "absolute", top: "25px", left: "25px", background: "rgba(0, 210, 255, 0.2)", backdropFilter: "blur(5px)", padding: "10px 20px", borderRadius: "30px", fontSize: "13px", border: "1px solid #00d2ff", fontWeight: "700" },
  textSide: { flex: "1 1 400px", padding: "40px 60px", display: "flex", flexDirection: "column", justifyContent: "center" },
  lessonTitle: { fontSize: "3rem", fontWeight: "800", marginBottom: "15px" },
  lessonDesc: { color: "rgba(255,255,255,0.7)", lineHeight: "1.6", marginBottom: "25px", fontSize: "1.1rem" },
  directContactBox: {
    background: "rgba(255,255,255,0.05)",
    padding: "25px",
    borderRadius: "24px",
    borderLeft: "4px solid #00d2ff",
    backdropFilter: "blur(5px)"
  },
  contactInstruction: { fontSize: "0.85rem", color: "#00d2ff", fontWeight: "800", marginBottom: "12px", textTransform: 'uppercase', letterSpacing: '1px' },
  contactItem: { fontSize: "1.1rem", fontWeight: "600", color: "#fff", marginBottom: "8px", display: 'flex', alignItems: 'center' },
  miniIcon: { marginRight: '12px', fontSize: '1.2rem', width: '20px', textAlign: 'center' },
  controls: { display: "flex", alignItems: "center", justifyContent: "center", marginTop: "40px", gap: "25px" },
  arrowBtn: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", width: "55px", height: "55px", borderRadius: "50%", cursor: "pointer", fontSize: "20px", transition: "0.3s" },
  dots: { display: "flex", gap: "12px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", transition: "0.4s" },
  gridSection: { maxWidth: "1100px", margin: "120px auto", position: "relative", zIndex: 1 },
  sectionHeading: { fontSize: "1.8rem", marginBottom: "40px", fontWeight: "700", textAlign: "center", color: "#00d2ff" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "30px" },
  smallCard: { background: "rgba(255,255,255,0.03)", borderRadius: "25px", padding: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "0.3s" },
  smallImg: { width: "100%", height: "160px", objectFit: "cover", borderRadius: "20px", marginBottom: "20px" },
  smallTitle: { fontSize: "1.2rem", fontWeight: "700" },
  contactSection: { maxWidth: "1000px", margin: "120px auto 40px", position: "relative", zIndex: 1 },
  contactCard: { 
    background: "linear-gradient(145deg, rgba(30, 30, 40, 0.4), rgba(10, 10, 15, 0.6))", 
    padding: "80px 40px", 
    borderRadius: "50px", 
    textAlign: "center",
    border: "1px solid rgba(0, 210, 255, 0.2)",
    backdropFilter: "blur(20px)"
  },
  contactHeading: { fontSize: "3rem", fontWeight: "900", marginBottom: "15px" },
  contactText: { color: "rgba(255,255,255,0.5)", marginBottom: "50px", fontSize: "1.1rem" },
  infoWrapper: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px" },
  infoBox: { display: "flex", alignItems: "center", gap: "20px", textAlign: "left", minWidth: '240px' },
  contactIcon: { fontSize: "36px", filter: "drop-shadow(0 0 10px #00d2ff)" },
  infoLabel: { fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0, textTransform: "uppercase", letterSpacing: "1px" },
  infoValue: { fontSize: "1.25rem", fontWeight: "800", color: "#fff", margin: 0 }
};

export default Lessons;