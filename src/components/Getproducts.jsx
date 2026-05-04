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

  // Navigation States
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // 🔥 NEW: sorting state
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();
  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/";

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

  // Filter + SORT logic
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(p =>
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🔥 Sorting logic
    if (sortOption === "price_low_high") {
      result.sort((a, b) => a.product_cost - b.product_cost);
    } 
    else if (sortOption === "price_high_low") {
      result.sort((a, b) => b.product_cost - a.product_cost);
    } 
    else if (sortOption === "name_a_z") {
      result.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } 
    else if (sortOption === "name_z_a") {
      result.sort((a, b) => b.product_name.localeCompare(a.product_name));
    }

    setFilteredProducts(result);
  }, [searchTerm, activeCategory, products, sortOption]);

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

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
      {/* 🎡 Carousel */}
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
              <img src="/carousel/music 3.jpg" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} alt="" />
            </div>

            <div className="carousel-item" data-bs-interval="3000">
              <img src="/carousel/music 6.jpg" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} alt="" />
            </div>

            <div className="carousel-item" data-bs-interval="3000">
              <img src="/carousel/music4.jpg" className="d-block w-100" style={{ height: "350px", objectFit: "cover" }} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div style={{ backgroundColor: "rgba(0,0,0,0.7)", padding: "25px", borderRadius: "10px" }}>
          <h2 className="text-center text-light fw-bold mb-4">
            🎵 Explore Our Music Store
          </h2>

          {/* 🔍 SEARCH + SORT + CATEGORY */}
          <div className="row mb-4 g-3">

            {/* Search */}
            <div className="col-md-5">
              <input
                type="text"
                className="form-control border-0 shadow-sm"
                placeholder="Search instruments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* SORT DROPDOWN 🔥 */}
            <div className="col-md-3">
              <select
                className="form-select shadow-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="price_low_high">Price: Low → High</option>
                <option value="price_high_low">Price: High → Low</option>
                <option value="name_a_z">Name: A → Z</option>
                <option value="name_z_a">Name: Z → A</option>
              </select>
            </div>

            {/* Categories */}
            <div className="col-md-4 d-flex gap-2 justify-content-md-end overflow-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`btn btn-sm text-nowrap ${activeCategory === cat ? 'btn-warning fw-bold' : 'btn-outline-light'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {loading && <Loader />}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="alert alert-warning text-center">
              No products found matching your search
            </div>
          )}

          {/* PRODUCTS */}
          <div className="row g-4">
            {filteredProducts.map((product) => (
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