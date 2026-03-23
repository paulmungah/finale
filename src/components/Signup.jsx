import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [phone, setNumber] = useState(""); 

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as registration is in progress....");
    setError("");
    try {
      const formdata = new FormData();
      formdata.append("username", username); 
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone); 

      const response = await axios.post("https://paul-mungah001.alwaysdata.net/api/signup", formdata);
      setLoading("");
      setSuccess(response.data.message);

      setUsername("");
      setPassword("");
      setEmail("");
      setNumber("");

      setTimeout(() => setSuccess(""), 15000);
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "20px"
      }}
    >
      <div 
        className="p-5 rounded-4 shadow-lg"
        style={{
          maxWidth: "450px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.37)"
        }}
      >
        <h1 className="mb-4 text-center text-white fw-bold" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.3)" }}>Sign Up</h1>

        {loading && <div className="alert alert-info">{loading}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control form-control-lg"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                transition: "all 0.3s"
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control form-control-lg"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                transition: "all 0.3s"
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control form-control-lg"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                transition: "all 0.3s"
              }}
            />
          </div>

          <div className="mb-3">
            <input
              type="tel"
              placeholder="Phone"
              className="form-control form-control-lg"
              value={phone}
              onChange={(e) => { setNumber(e.target.value); setError(""); }}
              required
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                transition: "all 0.3s"
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "12px 0",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center mt-3" style={{ color: "#fff" }}>
            Already have an account? <Link to="/signin" className="fw-bold text-decoration-none" style={{ color: "#ffd700" }}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;