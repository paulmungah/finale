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
      <div>
        

        {/* ✅ Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
          <div className="container-fluid">

            <NavLink to="/" className="navbar-brand fw-bold fs-4">
              🎵 Music Base
            </NavLink>

            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">

              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      "nav-link " + (isActive ? "fw-bold text-primary" : "")
                    }
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    to="/addproducts" 
                    className={({ isActive }) => 
                      "nav-link " + (isActive ? "fw-bold text-primary" : "")
                    }
                  >
                    Add Instruments
                  </NavLink>
                </li>
              </ul>

              <div className="d-flex gap-2">
                <NavLink to="/signin" className="btn btn-outline-light btn-sm">
                  Sign In
                </NavLink>

                <NavLink to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </NavLink>
              </div>

            </div>
          </div>
        </nav>

        {/* ✅ Header */}
        <div className="bg-light text-center py-3 shadow-sm">
          <h4 className="m-0">Welcome to Music Base</h4>
        </div>

        {/* ✅ Main Content */}
        <div className="container mt-4">
          <Routes>
             
            <Route path="/" element={<Getproducts />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addproducts" element={<Addproducts />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/makepayment" element={<Makepayment />} />

            <Route 
              path="*" 
              element={<h2 className="text-center text-danger">Page not found</h2>} 
            />
          </Routes>
        </div>

        {/* ✅ Footer (ADD HERE) */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;