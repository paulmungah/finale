import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/login",
        data,
        { timeout: 12000 }
      );

      // =========================
      // 🔐 AUTH STORAGE
      // =========================
      localStorage.setItem("token", response.data?.token || "true");
      localStorage.setItem("isLoggedIn", "true");

      // =========================
      // 🔥 FORCE NAVBAR UPDATE
      // =========================
      window.dispatchEvent(new Event("authChange"));

      setSuccess("🎵 Welcome back! Redirecting to Music Base...");

      setTimeout(() => {
        navigate('/getproducts');
      }, 1800);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>

      {/* Glow Effects */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.glow3} />

      {/* Header */}
      <div style={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.logoContainer}
        >
          <span style={{ fontSize: '48px' }}>🎵</span>
          <h1 style={styles.logo}>MUSIC BASE</h1>
        </motion.div>

        <p style={styles.subtitle}>
          Find Your Frequency • Build Your Legacy
        </p>
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={styles.card}
      >

        <div style={styles.accentBar} />

        <div style={styles.cardHeader}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.cardSubtitle}>
            Sign in to continue your musical journey
          </p>
        </div>

        {/* ERROR / SUCCESS */}
        <AnimatePresence>

          {success && (
            <motion.div style={styles.success}>
              {success}
            </motion.div>
          )}

          {error && (
            <motion.div style={styles.error}>
              {error}
            </motion.div>
          )}

        </AnimatePresence>

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>✉️</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <motion.button
            type="submit"
            style={styles.button}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? "🔄 Authenticating..." : "🚪 SIGN IN"}
          </motion.button>

          <p style={styles.footer}>
            New to Music Base?{" "}
            <Link to="/" style={styles.link}>
              Create Account
            </Link>
          </p>

        </form>
      </motion.div>

    </div>
  );
};

// =========================
// STYLES (UNCHANGED)
// =========================
const styles = {

  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0A0B14 0%, #1A0B2E 50%, #2A0B3D 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
  },

  glow1: { position: "absolute", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 60%)", top: "-200px", left: "-200px", filter: "blur(160px)" },
  glow2: { position: "absolute", width: "750px", height: "750px", background: "radial-gradient(circle, rgba(34,211,238,0.30) 0%, transparent 65%)", bottom: "-180px", right: "-180px", filter: "blur(150px)" },
  glow3: { position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(249,115,22,0.22) 0%, transparent 70%)", top: "45%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(140px)" },

  header: { textAlign: "center", marginBottom: "40px", zIndex: 3 },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px"
  },

  logo: {
    fontSize: "52px",
    fontWeight: "900",
    background: "linear-gradient(90deg, #c026d3, #22d3ee, #f97316)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: { color: "#a5b4fc" },

  card: {
    width: "100%",
    maxWidth: "440px",
    padding: "45px 35px",
    borderRadius: "28px",
    background: "rgba(15, 18, 40, 0.95)",
    border: "1px solid rgba(165, 243, 252, 0.18)",
    backdropFilter: "blur(24px)",
  },

  accentBar: {
    height: "6px",
    background: "linear-gradient(90deg, #c026d3, #22d3ee, #f97316)",
    borderTopLeftRadius: "28px",
    borderTopRightRadius: "28px",
  },

  cardHeader: { textAlign: "center", marginBottom: "32px" },

  title: { fontSize: "29px", fontWeight: "700" },

  cardSubtitle: { color: "#94a3b8" },

  inputGroup: { position: "relative", marginBottom: "22px" },

  inputIcon: {
    position: "absolute",
    left: "18px",
    top: "50%",
    transform: "translateY(-50%)"
  },

  input: {
    width: "100%",
    padding: "16px 18px 16px 54px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.06)",
    color: "#fff"
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    background: "linear-gradient(90deg, #c026d3, #22d3ee, #f97316)",
    fontWeight: "800",
    cursor: "pointer"
  },

  footer: { marginTop: "32px", textAlign: "center" },

  link: { color: "#67e8f9", textDecoration: "none" },

  success: {
    background: "rgba(168, 85, 247, 0.18)",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "20px"
  },

  error: {
    background: "rgba(248, 113, 113, 0.18)",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "20px"
  }
};

export default Signin;