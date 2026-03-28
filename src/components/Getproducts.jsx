import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://paul-mungah001.alwaysdata.net/api/get_product");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "25px",
          borderRadius: "10px"
        }}
      >

        {/* ✅ Heading */}
        <h2 className="text-center text-light fw-bold mb-4">
          🎵 Available Products
        </h2>

        {/* ✅ Loader / Error */}
        {loading && <Loader />}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="alert alert-warning text-center">
            No products available
          </div>
        )}

        {/* ✅ Products Grid */}
        <div className="row g-4">

          {products.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">

              <div className="card h-100 shadow border-0">

                {/* Image */}
                <img
                  src={
                    product.product_photo
                      ? img_url + product.product_photo
                      : "https://via.placeholder.com/300"
                  }
                  alt={product.product_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                {/* Content */}
                <div className="card-body d-flex flex-column">

                  <h5 className="fw-bold text-dark">
                    {product.product_name}
                  </h5>

                  <p className="text-muted small flex-grow-1">
                    {product.product_description?.slice(0, 80)}...
                  </p>

                  <h6 className="text-success fw-bold">
                    Ksh {product.product_cost}
                  </h6>

                  <button
                    className="btn btn-dark mt-2"
                    onClick={() =>
                      navigate("/makepayment", { state: { product } })
                    }
                  >
                    🛒 Purchase
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Getproducts;