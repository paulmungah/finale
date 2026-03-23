import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {
  const { product } = useLocation().state || {};
  const navigate = useNavigate();
  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/";

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("phone", number);
      formdata.append("amount", product.product_cost);

      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata);

      setLoading(false);
      setSuccess(response.data.message);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  if (!product) {
    return <h2 className="text-danger text-center mt-5">No product selected.</h2>;
  }

  return (
    <div 
      className="d-flex flex-column align-items-center py-5"
      style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea, #764ba2)" }}
    >
      <h1 className="text-white mb-4" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>
        Make Payment - Lipa na M-Pesa
      </h1>

      <button
        className="btn btn-light mb-4"
        onClick={() => navigate("/")}
        style={{ fontWeight: "bold" }}
      >
        &larr; Back
      </button>

      <div 
        className="card p-4 shadow-lg rounded-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff"
        }}
      >
        <img 
          src={img_url + product.product_photo} 
          alt={product.product_name} 
          className="img-fluid rounded mb-3"
          style={{ maxHeight: "250px", objectFit: "cover" }}
        />

        <div className="card-body text-center">
          <h2 className="mb-2">{product.product_name}</h2>
          <p>{product.product_description}</p>
          <b className="text-warning mb-3 d-block">Ksh {product.product_cost}</b>

          <form onSubmit={handlesubmit}>
            {loading && <Loader />}
            {success && <h4 className="text-success">{success}</h4>}
            {error && <h4 className="text-danger">{error}</h4>}

            <input
              type="number"
              className="form-control mb-3"
              placeholder="Enter Phone number 254XXXXXXX"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{
                borderRadius: "10px",
                padding: "12px",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "none",
                transition: "all 0.3s"
              }}
            />

            <input
              type="submit"
              value="Make Payment"
              className="btn w-100 btn-success"
              style={{
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "bold",
                transition: "all 0.3s",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;