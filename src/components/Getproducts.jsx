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
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      <h2
        className="text-center mb-5"
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#00ffe7",
          textShadow: "0 0 10px #00ffe7, 0 0 20px #00ffe7",
        }}
      >
        Available Instruments
      </h2>

      {loading && <Loader />}
      {error && <h4 className="text-danger text-center">{error}</h4>}

      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
            <div
              className="card p-3 rounded-4"
              style={{
                width: "100%",
                maxWidth: "260px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 25px rgba(0,255,231,0.2)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,255,231,0.5)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,255,231,0.2)";
              }}
            >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="img-fluid rounded mb-3"
                style={{ height: "160px", objectFit: "cover", width: "100%" }}
              />
              <div className="card-body text-center">
                <h5
                  className="mb-2"
                  style={{
                    fontWeight: "bold",
                    color: "#00ffe7",
                    textShadow: "0 0 5px #00ffe7",
                  }}
                >
                  {product.product_name}
                </h5>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#c0f9f4",
                  }}
                >
                  {product.product_description?.slice(0, 100)}...
                </p>
                <h6
                  className="mb-3"
                  style={{
                    fontWeight: "bold",
                    color: "#ffcb00",
                    textShadow: "0 0 5px #ffcb00",
                  }}
                >
                  Ksh {product.product_cost}
                </h6>
                <button
                  className="btn w-100"
                  onClick={() => navigate("/makepayment", { state: { product } })}
                  style={{
                    background: "linear-gradient(45deg, #00ffe7, #00b8f5)",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    padding: "10px 0",
                    boxShadow: "0 4px 20px rgba(0,255,231,0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Getproducts;