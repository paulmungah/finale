import React from 'react';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div style={styles.pageWrapper}>
      {/* 🚀 Hero Section - High Impact */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.contentContainer}>
          <h1 style={styles.glitchTitle}>OUR HARMONY</h1>
          <p style={styles.heroSubtitle}>
            Beyond the notes, we are building the future of sound. 
            Music Base is where the rhythm of technology meets the soul of the artist.
          </p>
        </div>
      </section>

      {/* 🧩 The Mission - Split Layout */}
      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div style={styles.imageCard}>
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80" 
                alt="Studio session" 
                style={styles.mainImg}
              />
              <div style={styles.imageAccent}></div>
            </div>
          </div>
          <div className="col-lg-6">
            <h2 style={styles.sectionTitle}>OUR STORY</h2>
            <p style={styles.description}>
              Founded in 2026, Music Base started in a small underground studio in Eldoret. 
              We noticed a gap: artists had the talent, but lacked the gear and the platform 
              to reach a global audience. 
            </p>
            <p style={styles.description}>
              Today, we are more than a store. We are a **Technological Hub** providing 
              professional-grade instruments, masterclasses, and a direct pipeline 
              for creators to monetize their passion.
            </p>
            <div className="d-flex gap-3 mt-4">
              <div style={styles.miniStat}>
                <h4 style={{color: '#00d2ff', margin: 0}}>500+</h4>
                <small style={{opacity: 0.6}}>Artists Signed</small>
              </div>
              <div style={styles.miniStat}>
                <h4 style={{color: '#00d2ff', margin: 0}}>24/7</h4>
                <small style={{opacity: 0.6}}>Expert Support</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⚡ Features - The "Extreme" Grid */}
      <section style={styles.featuresSection}>
        <div className="container text-center mb-5">
          <h2 style={styles.sectionTitleCenter}>WHY WE VIBRATE DIFFERENT</h2>
        </div>
        <div className="container">
          <div className="row g-4">
            <FeatureCard 
              icon="🔊" 
              title="Sonic Precision" 
              text="Every instrument in our collection is hand-tested for acoustic perfection before it hits your doorstep."
            />
            <FeatureCard 
              icon="🌍" 
              title="Global Stage" 
              text="We don't just sell gear; we give you access to our network of producers and global festivals."
            />
            <FeatureCard 
              icon="💳" 
              title="Artist Financing" 
              text="Flexible payment plans because we believe finances should never silence a beautiful voice."
            />
          </div>
        </div>
      </section>

      {/* 🎹 Call to Action */}
      <section className="container text-center py-5 my-5" style={styles.ctaBox}>
        <h2 style={{fontWeight: '900'}}>READY TO MAKE NOISE?</h2>
        <p style={{opacity: 0.8}} className="mb-4">Join the thousands of musicians already using Music Base gear.</p>
        <NavLink to="/getproducts" style={styles.ctaBtn}>
          START SHOPPING
        </NavLink>
      </section>
    </div>
  );
};

// Reusable Sub-component for the cards
const FeatureCard = ({ icon, title, text }) => (
  <div className="col-md-4">
    <div style={styles.featureCard}>
      <div style={styles.iconCircle}>{icon}</div>
      <h4 style={{fontWeight: '700', marginBottom: '15px'}}>{title}</h4>
      <p style={{color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6'}}>{text}</p>
    </div>
  </div>
);

const styles = {
  pageWrapper: {
    backgroundColor: '#050505',
    color: '#fff',
    minHeight: '100vh',
    overflowX: 'hidden',
  },
  heroSection: {
    height: '70vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundImage: "url('https://images.unsplash.com/photo-1514525253361-bee0483307a0?auto=format&fit=crop&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(5,5,5,0.4), #050505)',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    padding: '0 20px',
  },
  glitchTitle: {
    fontSize: 'clamp(3rem, 10vw, 6rem)',
    fontWeight: '900',
    letterSpacing: '-2px',
    textShadow: '3px 3px 0px #00d2ff',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: 0.8,
    lineHeight: '1.8',
    letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#00d2ff',
    marginBottom: '25px',
  },
  sectionTitleCenter: {
    fontSize: '2.5rem',
    fontWeight: '900',
    letterSpacing: '2px',
  },
  description: {
    fontSize: '1.1rem',
    color: '#ccc',
    lineHeight: '1.8',
    marginBottom: '20px',
  },
  imageCard: {
    position: 'relative',
    padding: '20px',
  },
  mainImg: {
    width: '100%',
    borderRadius: '30px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 2,
  },
  imageAccent: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '80%',
    height: '80%',
    border: '5px solid #00d2ff',
    borderRadius: '30px',
    zIndex: 1,
    transform: 'translate(-20px, -20px)',
  },
  miniStat: {
    padding: '15px 25px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '15px',
    borderLeft: '4px solid #00d2ff',
  },
  featuresSection: {
    padding: '100px 0',
    background: 'radial-gradient(circle at 50% 50%, #111, #050505)',
  },
  featureCard: {
    padding: '40px',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '25px',
    border: '1px solid rgba(255,255,255,0.05)',
    height: '100%',
    transition: '0.3s',
  },
  iconCircle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    display: 'inline-block',
  },
  ctaBox: {
    background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
    borderRadius: '30px',
    color: '#000',
    padding: '60px 20px',
  },
  ctaBtn: {
    display: 'inline-block',
    padding: '15px 40px',
    background: '#000',
    color: '#fff',
    borderRadius: '50px',
    textDecoration: 'none',
    fontWeight: '900',
    letterSpacing: '2px',
    transition: '0.3s',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  }
};

export default AboutUs;