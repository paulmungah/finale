import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './components/Signup';
import Signin from './components/Signin'; 
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Loader from './components/Loader';
import Makepayment from './components/Makepayment';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        
        {/* ✅ Premium Glass Navbar */}
        <nav className="navbar navbar-expand-lg sticky-top" style={styles.navbar}>
          <div className="container">

            <NavLink to="/getproducts" style={styles.brand}>
              <span style={{ fontWeight: '300' }}>MUSIC</span>
              <span style={{ color: '#00d2ff', fontWeight: '900' }}>BASE</span>
            </NavLink>

            <button 
              className="navbar-toggler border-0" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              style={{ filter: 'invert(1)' }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

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

                <li className="nav-item">
                  <NavLink 
                    to="/addproducts" 
                    style={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                  >
                  ADD  INVENTORY 
                  </NavLink>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3">
                <NavLink to="/signin" style={styles.loginBtn}>
                  SIGN IN
                </NavLink>

                <NavLink to="/" style={styles.joinBtn}>
                  JOIN US
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* ✅ Main Content Area */}
        <main style={styles.mainWrapper}>
          <Routes>
            <Route path="/getproducts" element={<Getproducts />} />
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addproducts" element={<Addproducts />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/makepayment" element={<Makepayment />} />

            <Route 
              path="*" 
              element={
                <div className="text-center py-5">
                  <h2 style={{color: '#ff4b2b', fontWeight: '900'}}>404</h2>
                  <p className="text-light-50">Signal lost. This coordinate does not exist.</p>
                </div>
              } 
            />
          </Routes>
        </main>

        {/* ✅ Footer */}
        <Footer />

      </div>

      {/* Global CSS for Smooth Transitions */}
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

        /* Smooth scrolling for the whole app */
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
  },
  navbar: {
    background: 'rgba(5, 5, 5, 0.8)',
    backdropFilter: 'blur(15px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '18px 0',
    zIndex: 1000
  },
  brand: {
    textDecoration: 'none',
    fontSize: '1.5rem',
    letterSpacing: '2px',
    color: '#fff',
  },
  navLinks: {
    gap: '30px'
  },
  navLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: 'color 0.3s ease'
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
    padding: '8px 20px',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: '900',
    letterSpacing: '1px',
    transition: 'transform 0.2s ease',
  },
  mainWrapper: {
    flex: 1, // Pushes footer to bottom
    position: 'relative'
  }
};

export default App;