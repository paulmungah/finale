import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();
  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/";

  // =========================
  // 🔐 ONLY AUTH FIX (NO UI CHANGE)
  // =========================
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

      {/* 🎡 YOUR ORIGINAL CAROUSEL (UNCHANGED 100%) */}
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

            {/* Slide 1 */}
            <div className="carousel-item active" data-bs-interval="3000">
              <img
                src="/carousel/music 3.jpg"
                className="d-block w-100"
                style={{ height: "350px", objectFit: "cover" }}
                alt="slide1"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded px-3">
                <h2 className="fw-bold text-warning">Unleash Your Rhythm</h2>
                <p className="fs-5">Save up to 20% on professional instruments</p>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="/carousel/music 6.jpg"
                className="d-block w-100"
                style={{ height: "350px", objectFit: "cover" }}
                alt="slide2"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded px-3">
                <h2 className="fw-bold text-info">Crafted for Excellence</h2>
                <p className="fs-5">New collection of instruments available</p>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="/carousel/music4.jpg"
                className="d-block w-100"
                style={{ height: "350px", objectFit: "cover" }}
                alt="slide3"
              />
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

      {/* PRODUCTS SECTION (UNCHANGED) */}
      <div className="container">
        <div style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "25px", borderRadius: "10px" }}>

          <h2 className="text-center text-light fw-bold mb-4">
            🎵 Explore Our Music Store
          </h2>

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
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
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
              <button onClick={resetFilters} className="btn btn-danger w-100">
                Reset
              </button>
            </div>

          </div>

          {loading && <Loader />}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row g-4">

            {filteredProducts.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">

                <div className="card h-100 shadow border-0 overflow-hidden">

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
                      className="btn btn-dark mt-2 w-100"
                      onClick={() => navigate("/makepayment", { state: { product } })}
                    >
                      🛒 Purchase Now
                    </button>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Getproducts;