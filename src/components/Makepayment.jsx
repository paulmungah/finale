import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Loader from './Loader';

const Makepayment = () => {
  const location = useLocation();
  const { product, cart } = location.state || {};
  const navigate = useNavigate();

  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/";

  const isCartMode = Boolean(cart && cart.length > 0);
  const totalAmount = isCartMode
    ? cart.reduce((sum, item) => sum + Number(item.product_cost) * item.quantity, 0)
    : Number(product?.product_cost || 0);

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formatPhone = (value) => {
    let num = value.replace(/\D/g, '');
    if (num.startsWith('0')) num = '254' + num.slice(1);
    if (!num.startsWith('254')) num = '254' + num;
    return num.slice(0, 12);
  };

  const handleNumberChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setNumber(formatted);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const triggerSuccessConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0f9d58', '#34a853', '#fbbc05']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (number.length !== 12) {
      setError("Please enter a valid 254XXXXXXXXX number");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("phone", number);
      formData.append("amount", totalAmount);

      const response = await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/mpesa_payment",
        formData,
        { timeout: 45000 }
      );

      setSuccess(response.data.message || "STK Push sent! Check your phone to complete payment.");
      triggerSuccessConfetti();
      setTimeout(() => navigate('/'), 6500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to initiate payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!product && !isCartMode) {
    return (
      <div style={styles.notFound}>
        <h3>No product selected for payment</h3>
        <button onClick={() => navigate('/')} style={styles.backBtn}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.glow3} />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={styles.card}
      >
        <div style={styles.accentBar} />

        {/* Header */}
        <div style={styles.header}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            ← Back
          </motion.button>
          <div style={styles.logoContainer}>
            <span style={styles.mpesaIcon}>📱</span>
            <h2 style={styles.title}>Lipa na M-Pesa</h2>
          </div>
        </div>

        {/* CART MODE */}
        {isCartMode ? (
          <div style={styles.cartBox}>
            <h4 style={styles.cartTitle}>
              🛒 Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
            </h4>
            <div style={styles.cartList}>
              {cart.map(item => (
                <div key={item.id} style={styles.cartItem}>
                  <img
                    src={item.product_photo ? img_url + item.product_photo : "https://via.placeholder.com/50"}
                    alt={item.product_name}
                    style={styles.cartItemImg}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={styles.cartItemName}>{item.product_name}</p>
                    <p style={styles.cartItemPrice}>
                      Ksh {Number(item.product_cost).toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                  <span style={styles.cartItemTotal}>
                    Ksh {(Number(item.product_cost) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div style={styles.cartTotalRow}>
              <span style={styles.amountLabel}>Total Amount</span>
              <div style={styles.amount}>
                KES <span style={styles.amountValue}>{totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

        ) : (
          /* SINGLE PRODUCT MODE */
          <div style={styles.productCard}>
            <div style={styles.imageWrapper}>
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                style={styles.productImage}
              />
            </div>
            <div style={styles.productInfo}>
              <h3 style={styles.productName}>{product.product_name}</h3>
              <p style={styles.productDesc}>{product.product_description}</p>
              <div style={styles.amountContainer}>
                <span style={styles.amountLabel}>Total Amount</span>
                <div style={styles.amount}>
                  KES <span style={styles.amountValue}>{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={styles.divider} />

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {loading && <Loader />}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={styles.successBox}
            >
              🎉 {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={styles.errorBox}
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>M-PESA PHONE NUMBER</label>
            <div style={styles.inputWrapper}>
              <span style={styles.prefix}>254</span>
              <input
                type="tel"
                value={number.startsWith('254') ? number.slice(3) : number}
                onChange={handleNumberChange}
                placeholder="712345678"
                maxLength={9}
                style={styles.input}
                required
              />
            </div>
            <small style={styles.helper}>Enter your Safaricom number (9 digits after 254)</small>
          </div>

          <motion.button
            type="submit"
            disabled={loading || number.length !== 12}
            style={styles.payButton}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "SENDING STK PUSH..." : `PAY KES ${totalAmount.toLocaleString()} NOW`}
          </motion.button>
        </form>

        {/* Trust Footer */}
        <div style={styles.trustFooter}>
          <div style={styles.trustItem}>🔒 Secure Transaction</div>
          <div style={styles.trustItem}>⚡ Instant Confirmation</div>
          <div style={styles.trustItem}>🛡️ Powered by Safaricom</div>
        </div>

      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(145deg, #0a1f14 0%, #0b2e1f 40%, #0f9d58 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  glow1: { position: "absolute", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(52,168,83,0.45) 0%, transparent 60%)", top: "-200px", left: "-200px", filter: "blur(140px)" },
  glow2: { position: "absolute", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(251,188,5,0.35) 0%, transparent 65%)", bottom: "-150px", right: "-180px", filter: "blur(130px)" },
  glow3: { position: "absolute", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(15,157,88,0.25) 0%, transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(160px)" },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(15, 23, 20, 0.95)",
    borderRadius: "28px",
    padding: "32px 30px",
    border: "1px solid rgba(52, 168, 83, 0.3)",
    boxShadow: "0 40px 90px rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(20px)",
    position: "relative",
    zIndex: 2,
  },
  accentBar: {
    position: "absolute", top: 0, left: 0, right: 0, height: "6px",
    background: "linear-gradient(90deg, #0f9d58, #34a853, #fbbc05)",
    borderTopLeftRadius: "28px", borderTopRightRadius: "28px",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" },
  backButton: { background: "transparent", border: "1px solid #34a853", color: "#34a853", padding: "10px 18px", borderRadius: "50px", fontSize: "15px", cursor: "pointer" },
  logoContainer: { display: "flex", alignItems: "center", gap: "12px" },
  mpesaIcon: { fontSize: "32px" },
  title: { color: "#fff", fontSize: "26px", fontWeight: "800", margin: 0, letterSpacing: "-0.5px" },

  // Cart styles
  cartBox: { background: "rgba(255,255,255,0.06)", borderRadius: "20px", padding: "18px", border: "1px solid rgba(52,168,83,0.15)", marginBottom: "28px" },
  cartTitle: { color: "#fff", fontWeight: 700, fontSize: "16px", marginBottom: "14px" },
  cartList: { display: "flex", flexDirection: "column", gap: "10px", maxHeight: "240px", overflowY: "auto" },
  cartItem: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "10px" },
  cartItemImg: { width: "48px", height: "48px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 },
  cartItemName: { margin: 0, color: "#fff", fontSize: "14px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  cartItemPrice: { margin: "3px 0 0", color: "#8ab89c", fontSize: "13px" },
  cartItemTotal: { color: "#34a853", fontWeight: 700, fontSize: "14px", flexShrink: 0 },
  cartTotalRow: { marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(52,168,83,0.2)" },

  // Single product styles
  productCard: { display: "flex", gap: "20px", background: "rgba(255,255,255,0.06)", padding: "18px", borderRadius: "20px", marginBottom: "28px", border: "1px solid rgba(52,168,83,0.15)" },
  imageWrapper: { flexShrink: 0 },
  productImage: { width: "110px", height: "110px", objectFit: "cover", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" },
  productInfo: { flex: 1 },
  productName: { color: "#fff", fontSize: "21px", fontWeight: "700", marginBottom: "6px" },
  productDesc: { color: "#a1b5a8", fontSize: "14.5px", lineHeight: "1.45", marginBottom: "14px" },
  amountContainer: { marginTop: "8px" },

  amountLabel: { fontSize: "13px", color: "#8ab89c", fontWeight: "500", display: "block", marginBottom: "4px" },
  amount: { fontSize: "28px", fontWeight: "800", color: "#34a853" },
  amountValue: { fontSize: "32px" },

  divider: { height: "1px", background: "linear-gradient(90deg, transparent, rgba(52,168,83,0.3), transparent)", margin: "24px 0" },

  inputGroup: { marginBottom: "26px" },
  label: { color: "#c1e0ce", fontSize: "14.5px", fontWeight: "600", marginBottom: "9px", letterSpacing: "0.5px", display: "block" },
  inputWrapper: { position: "relative", display: "flex" },
  prefix: { position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", color: "#34a853", fontWeight: "700", fontSize: "17px", zIndex: 2 },
  input: { width: "100%", padding: "18px 20px 18px 68px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(52,168,83,0.4)", borderRadius: "18px", color: "#fff", fontSize: "17.5px", outline: "none" },
  helper: { marginTop: "8px", fontSize: "13px", color: "#8ab89c" },

  payButton: { width: "100%", padding: "18px", background: "linear-gradient(90deg, #0f9d58, #34a853)", color: "#fff", border: "none", borderRadius: "18px", fontSize: "17.5px", fontWeight: "800", letterSpacing: "0.6px", cursor: "pointer", boxShadow: "0 15px 35px rgba(15, 157, 88, 0.5)" },

  successBox: { background: "rgba(52, 168, 83, 0.15)", color: "#86efac", padding: "16px 20px", borderRadius: "16px", borderLeft: "5px solid #34a853", marginBottom: "20px", textAlign: "center" },
  errorBox: { background: "rgba(248, 113, 113, 0.15)", color: "#fda4af", padding: "16px 20px", borderRadius: "16px", borderLeft: "5px solid #f87171", marginBottom: "20px", textAlign: "center" },

  trustFooter: { display: "flex", justifyContent: "center", gap: "18px", marginTop: "32px", flexWrap: "wrap" },
  trustItem: { fontSize: "13px", color: "#a1b5a8", background: "rgba(52,168,83,0.1)", padding: "6px 14px", borderRadius: "30px", border: "1px solid rgba(52,168,83,0.2)" },

  notFound: { color: "#fff", textAlign: "center" },
  backBtn: { marginTop: "20px", padding: "12px 28px", background: "#34a853", color: "#fff", border: "none", borderRadius: "50px", cursor: "pointer" },
};

export default Makepayment;