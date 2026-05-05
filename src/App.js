import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Components
import Signup from './components/Signup';
import Signin from './components/Signin'; 
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Loader from './components/Loader';
import Makepayment from './components/Makepayment';
import AboutUs from './components/AboutUs';
import Lessons from './components/Lessons';
import Footer from './components/Footer';

function App() {

  // ================= AUTH STATE =================
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ================= SYNC AUTH STATE =================
  useEffect(() => {

    const syncAuth = () => {
      const auth = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(auth === "true");
    };

    // initial check
    syncAuth();

    // listen for login/logout changes
    window.addEventListener("authChange", syncAuth);
    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("authChange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };

  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    // notify entire app instantly
    window.dispatchEvent(new Event("authChange"));

    // redirect to signin
    window.location.href = "/signin";
  };

  return (
    <Router>
      <div style={styles.appContainer}>

        {/* ================= NAVBAR ================= */}
        <nav className="navbar navbar-expand-lg sticky-top" style={styles.navbar}>
          <div className="container">

            {/* BRAND */}
            <NavLink to="/getproducts" style={styles.brand}>
              <span style={{ fontWeight: '300' }}>MUSIC</span>
              <span style={{ color: '#00d2ff', fontWeight: '900' }}>BASE</span>
            </NavLink>

            {/* MOBILE BUTTON */}
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* NAV LINKS */}
            <div className="collapse navbar-collapse" id="navbarNav">

              <ul className="navbar-nav mx-auto" style={styles.navLinks}>

                <li className="nav-item">
                  <NavLink to="/getproducts" style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                    COLLECTION
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/lessons" style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                    LESSONS
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/aboutus" style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                    ABOUT US
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/addproducts" style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                    ADD INVENTORY
                  </NavLink>
                </li>

              </ul>

              {/* ================= AUTH BUTTONS ================= */}
              <div className="d-flex align-items-center gap-3">

                {!isLoggedIn && (
                  <>
                    <NavLink to="/signin" style={styles.loginBtn}>
                      SIGN IN
                    </NavLink>

                    <NavLink to="/" style={styles.joinBtn}>
                      JOIN US
                    </NavLink>
                  </>
                )}

                {isLoggedIn && (
                  <button
                    onClick={handleLogout}
                    style={{
                      background: "transparent",
                      border: "1px solid #00d2ff",
                      color: "#00d2ff",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      cursor: "pointer"
                    }}
                  >
                    LOG OUT
                  </button>
                )}

              </div>

            </div>
          </div>
        </nav>

        {/* ================= ROUTES ================= */}
        <main style={styles.mainWrapper}>
          <Routes>

            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/getproducts" element={<Getproducts />} />
            <Route path="/addproducts" element={<Addproducts />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/makepayment" element={<Makepayment />} />

          </Routes>
        </main>

        <Footer />

      </div>
    </Router>
  );
}

// ================= STYLES =================
const styles = {
  appContainer: {
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#050505',
  },
  navbar: {
    background: 'rgba(5,5,5,0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    padding: '18px 0'
  },
  brand: {
    textDecoration: 'none',
    fontSize: '1.4rem',
    color: '#fff'
  },
  navLinks: {
    gap: '30px'
  },
  navLink: {
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.6)'
  },
  activeLink: {
    color: '#00d2ff',
    borderBottom: '2px solid #00d2ff'
  },
  loginBtn: {
    textDecoration: 'none',
    color: '#fff'
  },
  joinBtn: {
    textDecoration: 'none',
    background: '#fff',
    color: '#000',
    padding: '10px 24px',
    borderRadius: '10px'
  },
  mainWrapper: {
    flex: 1
  }
};

export default App;