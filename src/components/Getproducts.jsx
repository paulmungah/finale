import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Chatbot from './Musicbot';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const [chatOpen, setChatOpen] = useState(false);

  // ── Cart state ──────────────────────────────────────────────────────────────
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);

  const navigate = useNavigate();
  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://paul-mungah001.alwaysdata.net/api/get_product");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter(p =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "name-asc":
        result.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case "name-desc":
        result.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      case "price-low":
        result.sort((a, b) => Number(a.product_cost) - Number(b.product_cost));
        break;
      case "price-high":
        result.sort((a, b) => Number(b.product_cost) - Number(a.product_cost));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [searchTerm, activeCategory, sortOption, products]);

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const resetFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
    setSortOption("default");
  };

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const addToCart = (product) => {
    const key = product.id ?? product.product_id;
    setCart(prev => {
      const existing = prev.find(item => (item.id ?? item.product_id) === key);
      if (existing) {
        return prev.map(item =>
          (item.id ?? item.product_id) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setAddedProductId(key);
    setTimeout(() => setAddedProductId(null), 600);
  };

  const removeFromCart = (productId) =>
    setCart(prev => prev.filter(item => (item.id ?? item.product_id) !== productId));

  const updateQuantity = (productId, delta) =>
    setCart(prev =>
      prev
        .map(item =>
          (item.id ?? item.product_id) === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost  = cart.reduce((sum, item) => sum + Number(item.product_cost) * item.quantity, 0);

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingBottom: "50px"
      }}
    >

      {/* ── Floating Chatbot Trigger — BOTTOM LEFT ── */}
      <div
        onClick={() => setChatOpen(true)}
        title="Music Base Assistant"
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '24px',
          zIndex: 1050,
          cursor: 'pointer',
          width: '56px',
          height: '56px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a7a4a 0%, #25a065 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(26,122,74,0.50)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
            position: 'relative',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.12)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(26,122,74,0.65)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(26,122,74,0.50)';
          }}
        >
          <span style={{ fontSize: '24px', lineHeight: 1 }}>🎵</span>
          <span style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid rgba(26,122,74,0.5)',
            animation: 'chatPulse 2s ease-out infinite',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Tooltip */}
        <div style={{
          position: 'absolute',
          left: '64px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#1a7a4a',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          Music Base Assistant
          <span style={{
            position: 'absolute',
            left: '-6px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0, height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: '6px solid #1a7a4a',
          }} />
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot open={chatOpen} onClose={() => setChatOpen(false)} />

      {/* ── Floating Cart Icon — BOTTOM RIGHT ── */}
      <div
        onClick={() => setShowCart(true)}
        title="View Cart"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '24px',
          zIndex: 1050,
          cursor: 'pointer',
          width: '56px',
          height: '56px',
        }}
      >
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#1a73e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(26,115,232,0.50)',
          transition: 'transform 0.15s ease',
          position: 'relative',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>

          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#e53935',
              color: '#fff',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fff',
              pointerEvents: 'none',
            }}>
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* ── Cart Drawer ── */}
      {showCart && (
        <>
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.45)',
              zIndex: 1055,
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0, right: 0,
            width: '360px',
            maxWidth: '95vw',
            height: '100vh',
            background: '#fff',
            zIndex: 1060,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-4px 0 30px rgba(0,0,0,0.18)',
          }}>
            {/* Drawer Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e8e8e8',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#1a73e8',
              color: '#fff',
            }}>
              <h5 style={{ margin: 0, fontWeight: 700, fontSize: '18px' }}>
                🛒 My Cart ({totalItems})
              </h5>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none', color: '#fff',
                  borderRadius: '50%',
                  width: '32px', height: '32px',
                  cursor: 'pointer', fontSize: '18px', lineHeight: 1,
                }}
              >×</button>
            </div>

            {/* Drawer Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '60px', color: '#aaa' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <p style={{ marginTop: '12px', fontSize: '15px' }}>Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id ?? item.product_id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px', marginBottom: '10px',
                    borderRadius: '10px',
                    border: '1px solid #f0f0f0',
                    background: '#fafafa',
                  }}>
                    <img
                      src={item.product_photo ? img_url + item.product_photo : "https://via.placeholder.com/300"}
                      alt={item.product_name}
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.product_name}
                      </p>
                      <p style={{ margin: '2px 0 0', color: '#e53935', fontWeight: 700, fontSize: '13px' }}>
                        Ksh {item.product_cost}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => updateQuantity(item.id ?? item.product_id, -1)} style={qtyBtnStyle}>−</button>
                      <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id ?? item.product_id, 1)} style={qtyBtnStyle}>+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id ?? item.product_id)}
                      style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer', fontSize: '18px', padding: '0 4px' }}
                      title="Remove"
                    >🗑</button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div style={{ padding: '16px 24px', borderTop: '1px solid #e8e8e8', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontWeight: 600, fontSize: '16px' }}>Total</span>
                  <span style={{ fontWeight: 700, fontSize: '18px', color: '#1a73e8' }}>
                    Ksh {totalCost.toLocaleString()}
                  </span>
                </div>
                <button
                  style={{
                    width: '100%', padding: '13px',
                    background: '#1a73e8', color: '#fff',
                    border: 'none', borderRadius: '10px',
                    fontWeight: 700, fontSize: '15px',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1558b0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a73e8'}
                  onClick={() => { setShowCart(false); navigate('/makepayment', { state: { cart } }); }}
                >
                  Checkout →
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* CAROUSEL */}
      <div className="container">
        <div
          id="productCarousel"
          className="carousel slide shadow-lg mb-5 mx-auto"
          data-bs-ride="carousel"
          style={{ maxWidth: "900px", borderRadius: "15px", overflow: "hidden" }}
        >
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img src="/carousel/music 3.jpg" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} alt="slide1" />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded px-3">
                <h2 className="fw-bold text-warning">Unleash Your Rhythm</h2>
                <p className="fs-5">Save up to 20% on professional instruments</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src="/carousel/music 6.jpg" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} alt="slide2" />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded px-3">
                <h2 className="fw-bold text-info">Crafted for Excellence</h2>
                <p className="fs-5">New collection of instruments available</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img src="/carousel/music4.jpg" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} alt="slide3" />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded px-3">
                <h2 className="fw-bold text-success">Master Your Sound</h2>
                <p className="fs-5">Expert guidance with every purchase</p>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="container">
        <div style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "25px", borderRadius: "10px" }}>

          <h2 className="text-center text-light fw-bold mb-4">
            🎵 Explore Our Music Store
          </h2>

          {/* Filters */}
          <div className="row mb-4 g-3 align-items-end">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Search instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="default">Sort</option>
                <option value="name-asc">A-Z</option>
                <option value="name-desc">Z-A</option>
                <option value="price-low">Low Price</option>
                <option value="price-high">High Price</option>
              </select>
            </div>
            <div className="col-md-3 d-flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm ${activeCategory === cat ? "btn-warning" : "btn-outline-light"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="col-md-2">
              <button onClick={resetFilters} className="btn btn-danger w-100">Reset</button>
            </div>
          </div>

          {loading && <Loader />}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Products Grid */}
          <div className="row g-4">
            {filteredProducts.map(product => (
              <div key={product.id ?? product.product_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow border-0 overflow-hidden" style={{ position: 'relative' }}>

                  {/* Per-card cart icon */}
                  <div
                    onClick={() => addToCart(product)}
                    title="Add to Cart"
                    style={{
                      position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: addedProductId === (product.id ?? product.product_id) ? '#43a047' : '#fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.3s, transform 0.15s',
                      transform: addedProductId === (product.id ?? product.product_id) ? 'scale(1.2)' : 'scale(1)',
                    }}
                  >
                    {addedProductId === (product.id ?? product.product_id) ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    )}
                  </div>

                  <img
                    src={product.product_photo ? img_url + product.product_photo : "https://via.placeholder.com/300"}
                    alt={product.product_name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold text-dark">{product.product_name}</h5>
                    <p className="text-muted small flex-grow-1">
                      {product.product_description?.slice(0, 80)}...
                    </p>
                    <h6 className="text-success fw-bold">Ksh {product.product_cost}</h6>
                    <button
                      className="btn btn-dark mt-2 w-100 mb-2"
                      onClick={() => addToCart(product)}
                    >
                      🛒 Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      Purchase Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes chatPulse {
          0%   { transform: scale(1);    opacity: 0.8; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>

    </div>
  );
};

const qtyBtnStyle = {
  width: '26px', height: '26px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  background: '#fff',
  cursor: 'pointer',
  fontWeight: 700,
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};

export default Getproducts;