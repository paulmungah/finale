import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Component Imports
import Signup from './components/Signup';
import Signin from './components/Signin'; 
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Loader from './components/Loader';
import Makepayment from './components/Makepayment';
import AboutUs from './components/AboutUs';
import Lessons from './components/Lessons'; // ✅ Added Lessons Import
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        
        {/* ✅ Premium Glass Navbar */}
        <nav className="navbar navbar-expand-lg sticky-top" style={styles.navbar}>
          <div className="container">

            {/* Logo Section */}
            <NavLink to="/getproducts" style={styles.brand}>
              <span style={{ fontWeight: '300' }}>MUSIC</span>
              <span style={{ color: '#00d2ff', fontWeight: '900' }}>BASE</span>
            </NavLink>

            {/* Mobile Toggler */}
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              style={{ filter: 'invert(1)' }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto" style={styles.navLinks}>
                <li className="nav-item">
                  <NavLink 
                    to="/getproducts" 
                    style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                  >
                    COLLECTION
                  </NavLink>
                </li>

                {/* ✅ Added Lessons Link */}
                <li className="nav-item">
                  <NavLink 
                    to="/lessons" 
                    style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                  >
                    LESSONS
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    to="/aboutus" 
                    style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                  >
                    ABOUT US
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    to="/addproducts" 
                    style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                  >
                    ADD INVENTORY 
                  </NavLink>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="d-flex align-items-center gap-3">
                <NavLink to="/signin" style={styles.loginBtn}>
                  SIGN IN
                </NavLink>

                <NavLink to="/" className="join-hover" style={styles.joinBtn}>
                  JOIN US
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* ✅ Main Content Area */}
        <main style={styles.mainWrapper}>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/getproducts" element={<Getproducts />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addproducts" element={<Addproducts />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/lessons" element={<Lessons />} /> {/* ✅ Added Lessons Route */}
            <Route path="/loader" element={<Loader />} />
            <Route path="/makepayment" element={<Makepayment />} />

            {/* 404 Page Coordinate */}
            <Route 
              path="*" 
              element={
                <div className="text-center py-5" style={{ marginTop: '100px' }}>
                  <h2 style={{ color: '#00d2ff', fontWeight: '900', fontSize: '4rem' }}>404</h2>
                  <p className="text-light-50 uppercase tracking-widest">Signal lost. The beat has dropped.</p>
                  <NavLink to="/getproducts" style={{ color: '#00d2ff', textDecoration: 'none' }}>Return to Collection</NavLink>
                </div>
              } 
            />
          </Routes>
        </main>

        {/* ✅ Footer Component */}
        <Footer />

      </div>

      {/* Global CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap');
        
        body {
          background-color: #050505 !important;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .navbar-toggler:focus {
          box-shadow: none;
        }

        .nav-item a:hover {
          color: #00d2ff !important;
          text-shadow: 0 0 10px rgba(0, 210, 255, 0.4);
        }

        .join-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }

        main {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </Router>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#050505',
    backgroundImage: 'radial-gradient(circle at 50% -20%, #1a2a3a 0%, #050505 70%)',
  },
  navbar: {
    background: 'rgba(5, 5, 5, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '18px 0',
    zIndex: 1000
  },
  brand: {
    textDecoration: 'none',
    fontSize: '1.4rem',
    letterSpacing: '2px',
    color: '#fff',
    transition: '0.3s'
  },
  navLinks: {
    gap: '30px'
  },
  navLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: 'all 0.3s ease'
  },
  activeLink: {
    textDecoration: 'none',
    color: '#00d2ff',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '1px',
    borderBottom: '2px solid #00d2ff',
    paddingBottom: '5px'
  },
  loginBtn: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: '700',
    letterSpacing: '1px'
  },
  joinBtn: {
    textDecoration: 'none',
    background: '#fff',
    color: '#000',
    padding: '10px 24px',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontWeight: '900',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
  },
  mainWrapper: {
    flex: 1, 
    position: 'relative'
  }
};

export default App;