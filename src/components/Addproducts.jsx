import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // --- VAULT SECURITY STATE ---
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [vaultError, setVaultError] = useState("");
  
  // The specific allowed passcodes you requested
  const allowedPasscodes = ["admin", "admin1", "admin2", "admin3"];

  const handleVaultUnlock = (e) => {
    e.preventDefault();
    if (allowedPasscodes.includes(passcode.toLowerCase())) {
      setIsUnlocked(true);
      setVaultError("");
    } else {
      setVaultError("INVALID ACCESS KEY");
      setPasscode("");
    }
  };

  const fileInputRef = useRef(null);

  const triggerSpecialConfetti = () => {
    confetti({
      particleCount: 220,
      spread: 100,
      origin: { y: 0.7 },
      colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff9900']
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setProductPhoto(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!productName || !productDescription || !productCost || !productPhoto) {
      setError("All fields are required to add your instrument");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_description", productDescription);
      formData.append("product_cost", productCost);
      if (productPhoto) formData.append("product_photo", productPhoto);

      await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/add_product",
        formData
      );

      setSuccess("✨ Instrument successfully added to the Music Base vault!");
      triggerSpecialConfetti();

      setTimeout(() => {
        setProductName("");
        setProductDescription("");
        setProductCost("");
        setProductPhoto(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Failed to add instrument. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Neon Grid Background */}
      <div style={styles.gridBackground} />

      {/* SECURITY OVERLAY (Positioned absolute so Navbar stays visible) */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            style={styles.vaultOverlay}
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              style={styles.vaultCard}
            >
              <div style={{fontSize: "50px", marginBottom: "10px"}}>🔐</div>
              <h2 style={{color: "#fff", letterSpacing: "3px", marginBottom: "10px"}}>ADMIN ACCESS</h2>
              <p style={{color: "#a5b4fc", fontSize: "14px", marginBottom: "20px"}}>Enter passcode to unlock the Studio Drop</p>
              
              <form onSubmit={handleVaultUnlock}>
                <input 
                  type="password" 
                  placeholder="Passcode..." 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={styles.vaultInput}
                  autoFocus
                />
                {vaultError && <p style={styles.vaultError}>{vaultError}</p>}
                <button type="submit" style={styles.vaultBtn}>UNLOCK VAULT</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN FORM CONTENT (Hidden/Blurred until unlocked) */}
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.6s ease",
        filter: isUnlocked ? "none" : "blur(25px) brightness(0.4)",
        pointerEvents: isUnlocked ? "all" : "none"
      }}>
        {/* Floating Vinyl Decorations */}
        <motion.div 
          style={styles.vinyl1} 
          animate={{ rotate: 360 }} 
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }} 
        />
        <motion.div 
          style={styles.vinyl2} 
          animate={{ rotate: -360 }} 
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }} 
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isUnlocked ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: "backOut" }}
          style={styles.card}
        >
          <div style={styles.headerGlow} />

          <div style={styles.header}>
            <div style={styles.iconContainer}>
              <span style={styles.mainIcon}>🎛️</span>
            </div>
            <h1 style={styles.title}>STUDIO DROP</h1>
            <p style={styles.subtitle}>Add a new sound to the collective</p>
          </div>

          <AnimatePresence mode="wait">
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={styles.successBox}
              >
                {success}
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={styles.errorBox}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>INSTRUMENT NAME</label>
              <input
                type="text"
                placeholder="What is this beauty called?"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>STORY & SPECIFICATIONS</label>
              <textarea
                placeholder="Tell the community about this instrument..."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                style={styles.textarea}
                rows={6}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>PRICE (KES)</label>
              <input
                type="number"
                placeholder="45000"
                value={productCost}
                onChange={(e) => setProductCost(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* Photo Upload */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>VISUAL DROP</label>
              <div 
                style={styles.specialUploadArea} 
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={styles.hiddenInput}
                  required
                />

                {!previewUrl ? (
                  <div style={styles.uploadContent}>
                    <div style={styles.uploadIconBig}>📷</div>
                    <p style={styles.uploadText}>DROP YOUR PHOTO HERE</p>
                  </div>
                ) : (
                  <div style={styles.previewWrapper}>
                    <img src={previewUrl} alt="preview" style={styles.previewImage} />
                    <button 
                      type="button" 
                      onClick={removePhoto} 
                      style={styles.removePhotoBtn}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              style={styles.submitButton}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.985 }}
            >
              {loading ? "SENDING TO THE VAULT..." : "RELEASE INTO THE BASE"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

// ==================== STYLES ====================
const styles = {
  // Security Overlay Styles (Corrected to Absolute)
  vaultOverlay: {
    position: "absolute",
    inset: 0,
    zIndex: 10, // Sits above form but below typical Navbar (usually z-index 100+)
    background: "rgba(5, 5, 10, 0.75)",
    backdropFilter: "blur(15px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },
  vaultCard: {
    background: "rgba(20, 20, 45, 0.95)",
    padding: "40px",
    borderRadius: "24px",
    border: "1px solid rgba(139, 92, 246, 0.5)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 0 50px rgba(139, 92, 246, 0.3)"
  },
  vaultInput: {
    width: "100%",
    padding: "15px",
    background: "#0a0a0f",
    border: "1px solid #444",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "18px",
    textAlign: "center",
    outline: "none"
  },
  vaultBtn: {
    width: "100%",
    padding: "15px",
    marginTop: "15px",
    background: "linear-gradient(90deg, #7c3aed, #ec4899)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  vaultError: { color: "#f87171", fontSize: "12px", marginTop: "10px", fontWeight: "bold" },

  // Original UI Styles
  wrapper: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  gridBackground: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 100, 255, 0.06) 1px, transparent 1px)`,
    backgroundSize: "50px 50px",
    zIndex: 0,
  },
  vinyl1: {
    position: "absolute",
    width: "280px",
    height: "280px",
    background: "radial-gradient(circle, #1a1a2e 0%, #0a0a0f 70%)",
    border: "12px solid #ff00ff",
    borderRadius: "50%",
    top: "15%",
    left: "-80px",
    opacity: 0.15,
    zIndex: 1,
  },
  vinyl2: {
    position: "absolute",
    width: "220px",
    height: "220px",
    background: "radial-gradient(circle, #1a1a2e 0%, #0a0a0f 70%)",
    border: "12px solid #00ffff",
    borderRadius: "50%",
    bottom: "20%",
    right: "-60px",
    opacity: 0.12,
    zIndex: 1,
  },
  card: {
    width: "100%",
    maxWidth: "540px",
    background: "rgba(15, 15, 35, 0.92)",
    border: "1px solid rgba(120, 80, 255, 0.3)",
    borderRadius: "24px",
    padding: "48px 42px",
    boxShadow: "0 0 80px rgba(80, 60, 255, 0.25)",
    position: "relative",
    zIndex: 2,
  },
  headerGlow: {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "140px",
    height: "140px",
    background: "radial-gradient(circle, rgba(180, 80, 255, 0.4), transparent)",
    filter: "blur(40px)",
    zIndex: -1,
  },
  header: { textAlign: "center", marginBottom: "40px" },
  mainIcon: { fontSize: "62px", filter: "drop-shadow(0 0 20px #a855f7)" },
  title: { fontSize: "38px", fontWeight: "900", background: "linear-gradient(90deg, #c084fc, #67e8f9, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-2px", margin: "0 0 8px 0" },
  subtitle: { color: "#a5b4fc", fontSize: "16px", fontWeight: "500" },
  inputGroup: { marginBottom: "28px" },
  label: { color: "#c4b5fd", fontSize: "13.5px", letterSpacing: "1.5px", fontWeight: "700", marginBottom: "10px", display: "block" },
  input: { width: "100%", padding: "18px 22px", background: "rgba(30, 30, 60, 0.6)", border: "1px solid rgba(167, 139, 250, 0.3)", borderRadius: "16px", color: "#e0e7ff", fontSize: "17px", outline: "none" },
  textarea: { width: "100%", padding: "18px 22px", background: "rgba(30, 30, 60, 0.6)", border: "1px solid rgba(167, 139, 250, 0.3)", borderRadius: "16px", color: "#e0e7ff", fontSize: "16.5px", resize: "vertical", minHeight: "138px", outline: "none" },
  specialUploadArea: { border: "2px dashed #8b5cf6", borderRadius: "20px", padding: "50px 30px", textAlign: "center", cursor: "pointer", transition: "all 0.4s ease", background: "rgba(30, 30, 60, 0.4)" },
  uploadIconBig: { fontSize: "58px", marginBottom: "16px" },
  uploadText: { fontSize: "18px", fontWeight: "600", marginBottom: "6px" },
  hiddenInput: { display: "none" },
  previewWrapper: { position: "relative", borderRadius: "16px", overflow: "hidden" },
  previewImage: { width: "100%", maxHeight: "280px", objectFit: "cover" },
  removePhotoBtn: { position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.75)", color: "#fff", border: "none", width: "36px", height: "36px", borderRadius: "50%", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  submitButton: { width: "100%", padding: "20px", marginTop: "12px", background: "linear-gradient(90deg, #7c3aed, #ec4899, #f43f5e)", color: "#fff", border: "none", borderRadius: "16px", fontSize: "17.5px", fontWeight: "800", letterSpacing: "1px", cursor: "pointer", boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)" },
  successBox: { background: "rgba(163, 230, 187, 0.15)", color: "#86efac", padding: "18px", borderRadius: "16px", marginBottom: "24px", textAlign: "center", border: "1px solid #4ade80" },
  errorBox: { background: "rgba(248, 113, 113, 0.15)", color: "#fda4af", padding: "18px", borderRadius: "16px", marginBottom: "24px", textAlign: "center", border: "1px solid #f87171" },
};

export default AddProducts;