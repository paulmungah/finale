import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

const Addproducts = () => {
  const [product_name, setProductName] = useState("");
  const [product_description, setProductDescription] = useState("");
  const [product_cost, setProductCost] = useState("");
  const [product_photo, setProductPhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      formData.append("product_photo", product_photo);

      const response = await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/add_product",
        formData
      );

      setSuccess(response.data.message);
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);

      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-primary mb-3 text-center">Add New Product</h3>

            {loading && <Loader />}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="form-control"
                  required
                  value={product_name}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  placeholder="Product Description"
                  className="form-control"
                  required
                  value={product_description}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Product Price"
                  className="form-control"
                  required
                  value={product_cost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Photo</label>
                <input
                  type="file"
                  className="form-control"
                  required
                  accept="image/*"
                  onChange={(e) => setProductPhoto(e.target.files[0])}
                />
              </div>

              <button type="submit" className="btn btn-outline-primary w-100">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproducts;