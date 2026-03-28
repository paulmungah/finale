import React, { useState, useRef } from "react";
import axios from "axios";

// Dummy Loader component (replace with your Loader if you have one)
const Loader = () => (
  <div className="text-center my-3">
    <div className="spinner-border text-light" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ type: "", message: "", visible: false });

  const fileInputRef = useRef(null);

  const showPopup = (type, message) => {
    setPopup({ type, message, visible: true });
    setTimeout(() => setPopup({ type: "", message: "", visible: false }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("product_description", productDescription);
      formData.append("product_cost", productCost);
      if (productPhoto) formData.append("product_photo", productPhoto);

      const response = await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/add_product",
        formData
      );

      showPopup("success", response.data.message);

      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto(null);
      fileInputRef.current.value = "";
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.response?.statusText || err.message || "Something went wrong";
      showPopup("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg rounded-4 border-0 p-4 gradient-card">
            <h2 className="text-center text-white mb-4">🎵 Add New Instrument</h2>

            {loading && <Loader />}

            {/* Popup Message */}
            {popup.visible && (
              <div className={`popup-message ${popup.type === "success" ? "popup-success" : "popup-error"}`}>
                {popup.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="form-control shadow-sm rounded-pill form-input"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  placeholder="Product Description"
                  className="form-control shadow-sm rounded-3 form-input"
                  required
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Product Price"
                  className="form-control shadow-sm rounded-pill form-input"
                  required
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-white">Upload Product Photo</label>
                <input
                  type="file"
                  className="form-control shadow-sm rounded-pill form-input"
                  ref={fileInputRef}
                  accept="image/*"
                  required
                  onChange={(e) => setProductPhoto(e.target.files[0])}
                />
              </div>

              {productPhoto && (
                <div className="mb-3 text-center">
                  <div className="preview-frame shadow-lg rounded-4">
                    <img
                      src={URL.createObjectURL(productPhoto)}
                      alt="Preview"
                      className="img-fluid rounded-4 preview-img"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-gradient w-100 btn-lg shadow-lg"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .gradient-card {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
        }
        .form-input:focus {
          border-color: #ffdd59;
          box-shadow: 0 0 10px rgba(255, 221, 89, 0.5);
        }
        .btn-gradient {
          background: linear-gradient(90deg, #ff416c, #ff4b2b);
          border: none;
          color: white;
          font-weight: bold;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
        }
        .preview-frame {
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          border: 3px dashed rgba(255, 255, 255, 0.5);
          padding: 5px;
        }
        .preview-img {
          max-height: 200px;
          object-fit: cover;
        }
        .popup-message {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 25px;
          border-radius: 12px;
          font-weight: bold;
          z-index: 9999;
          animation: popupFade 0.5s ease-in-out;
        }
        .popup-success {
          background: #4ade80;
          color: #065f46;
        }
        .popup-error {
          background: #f87171;
          color: #7f1d1d;
        }
        @keyframes popupFade {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AddProducts;