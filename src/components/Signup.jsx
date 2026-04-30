import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "password") {
      calculateStrength(value);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (Object.values(formData).some(field => !field.trim())) {
      setError("❌ All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      setError("❌ Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      // Fixed: We no longer store response in a variable if not needed
      await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/signup",
        data,
        { timeout: 15000 }
      );

      setSuccess("🎵 Account created successfully! Welcome to Music Base.");
      triggerConfetti();

      // Redirect to Products page (Home) after success
      setTimeout(() => {
        navigate('/');
      }, 1800);

    } catch (err) {
      setError("❌ " + (err.response?.data?.message || err.message || "Failed to create account"));
    } finally {
      setLoading(false);
    }
  };

  // Auto clear success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.glow3} />

      <div style={styles.header}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.logoContainer}
        >
          <span style={{ fontSize: '42px' }}>🎵</span>
          <h1 style={styles.logo}>MUSIC BASE</h1>
        </motion.div>
        <p style={styles.subtitle}>Find Your Frequency • Build Your Legacy</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={styles.card}
      >
        <div style={styles.accentBar} />

        <h2 style={styles.title}>Create Your Sound Identity</h2>
        <p style={styles.cardSubtitle}>Join the new wave of artists & creators</p>

        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={styles.success}
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={styles.error}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={styles.inputGroup}>
            <span style={styles.inputIcon}>🎤</span>
            <input
              type="text"
              name="username"
              placeholder="Artist Name / Username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={styles.inputGroup}>
            <span style={styles.inputIcon}>✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={styles.inputGroup}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password (min 8 chars)"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </motion.div>

          {formData.password && (
            <div style={styles.strengthContainer}>
              <motion.div 
                style={{
                  ...styles.strengthBar,
                  width: `${passwordStrength}%`,
                  backgroundColor: passwordStrength > 75 ? "#22c55e" : passwordStrength > 50 ? "#eab308" : "#ef4444"
                }}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
              />
            </div>
          )}

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} style={styles.inputGroup}>
            <span style={styles.inputIcon}>📱</span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            style={styles.button}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "🔄 Creating Your Profile..." : "🚀 LAUNCH INTO MUSIC BASE"}
          </motion.button>

          <p style={styles.footer}>
            Already part of the wave?{" "}
            <Link to="/signin" style={styles.link}>Sign In</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

// Styles remain the same
const styles = {
  // ... (Keep all your styles exactly as they were before)
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0A0B14 0%, #1A0B2E 50%, #2A0B3D 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },

  glow1: { position: "absolute", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(168,85,247,0.32) 0%, transparent 60%)", top: "-200px", left: "-200px", filter: "blur(160px)", zIndex: 0 },
  glow2: { position: "absolute", width: "750px", height: "750px", background: "radial-gradient(circle, rgba(34,211,238,0.28) 0%, transparent 65%)", bottom: "-180px", right: "-180px", filter: "blur(150px)", zIndex: 0 },
  glow3: { position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(249,115,22,0.20) 0%, transparent 70%)", top: "45%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(140px)", zIndex: 0 },

  header: { textAlign: "center", marginBottom: "40px", zIndex: 3 },
  logoContainer: { display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "8px" },
  logo: {
    fontSize: "48px",
    fontWeight: "900",
    letterSpacing: "-3px",
    background: "linear-gradient(90deg, #c026d3, #22d3ee, #f97316)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: { color: "#a5b4fc", fontSize: "15px", fontWeight: "500" },

  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "40px 32px",
    borderRadius: "28px",
    background: "rgba(15, 18, 40, 0.93)",
    border: "1px solid rgba(165, 243, 252, 0.16)",
    backdropFilter: "blur(24px)",
    boxShadow: "0 40px 100px rgba(0, 0, 0, 0.85)",
    position: "relative",
    zIndex: 2,
  },

  accentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "6px",
    background: "linear-gradient(90deg, #c026d3, #22d3ee, #f97316)",
    borderTopLeftRadius: "28px",
    borderTopRightRadius: "28px",
  },

  title: { textAlign: "center", fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#e0e7ff" },
  cardSubtitle: { textAlign: "center", color: "#94a3b8", fontSize: "14.5px", marginBottom: "32px" },

  inputGroup: { position: "relative", marginBottom: "18px" },
  inputIcon: {
    position: "absolute",
    left: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "18px",
    zIndex: 2,
  },
  input: {
    width: "100%",
    padding: "15px 18px 15px 52px",
    borderRadius: "16px",
    border: "1px solid rgba(165, 243, 252, 0.18)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  },
  eyeButton: {
    position: "absolute",
    right: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#94a3b8",
  },

  strengthContainer: {
    height: "5px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "9999px",
    margin: "8px 0 20px 0",
    overflow: "hidden",
  },
  strengthBar: { height: "100%", transition: "width 0.4s ease" },

  button: {
    width: "100%",
    padding: "16px",
    marginTop: "10px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(90deg, #c026d3, #22d3ee, #f97316)",
    color: "#0f1228",
    fontSize: "16.5px",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 12px 35px rgba(192, 38, 211, 0.45)",
  },

  footer: { marginTop: "28px", textAlign: "center", fontSize: "14.5px", color: "#94a3b8" },
  link: { color: "#67e8f9", textDecoration: "none", fontWeight: "600" },

  success: {
    background: "rgba(168, 85, 247, 0.18)",
    color: "#c4b5fd",
    padding: "14px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
    borderLeft: "4px solid #a855f7",
  },
  error: {
    background: "rgba(248, 113, 113, 0.18)",
    color: "#fda4af",
    padding: "14px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
    borderLeft: "4px solid #f87171",
  },
};

export default Signup;