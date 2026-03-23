import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("product_name", product_name);
      formdata.append("product_description", product_description);
      formdata.append("product_cost", product_cost);
      formdata.append("product_photo", product_photo);

      const response = await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/add_product",
        formdata
      );

      setLoading(false);
      setSuccess(response.data.message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#fff",
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#00ffe7", textShadow: "0 0 10px #00ffe7" }}
        >
          Add New Instrument
        </h2>

        {loading && <Loader />}
        {success && <h4 className="text-success text-center">{success}</h4>}
        {error && <h4 className="text-danger text-center">{error}</h4>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="form-control mb-3"
            required
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            style={{
              borderRadius: "10px",
              padding: "12px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              transition: "all 0.3s",
            }}
          />

          <input
            type="text"
            placeholder="Product Description"
            className="form-control mb-3"
            required
            value={product_description}
            onChange={(e) => setProductDescription(e.target.value)}
            style={{
              borderRadius: "10px",
              padding: "12px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              transition: "all 0.3s",
            }}
          />

          <input
            type="number"
            placeholder="Product Price"
            className="form-control mb-3"
            required
            value={product_cost}
            onChange={(e) => setProductCost(e.target.value)}
            style={{
              borderRadius: "10px",
              padding: "12px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              transition: "all 0.3s",
            }}
          />

          <label className="mb-2" style={{ color: "#00ffe7" }}>
            Product Photo
          </label>
          <input
            type="file"
            className="form-control mb-4"
            required
            accept="image/*"
            onChange={(e) => setProductPhoto(e.target.files[0])}
            style={{
              borderRadius: "10px",
              padding: "8px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
            }}
          />

          <input
            type="submit"
            value="Add Product"
            className="btn w-100"
            style={{
              background: "linear-gradient(45deg, #00ffe7, #00b8f5)",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "12px",
              padding: "12px",
              boxShadow: "0 4px 15px rgba(0,255,231,0.4)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </form>
      </div>
    </div>
  );
};

export default Addproducts;