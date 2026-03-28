import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword]= useState("");

  const [loading, setLoading] = useState("");
  const [success , setSuccess]=useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading("Please wait while we authenticate your account...");

    try{ 
      const data = new FormData()
      data.append("email",email);
      data.append("password",password);

      const response =  await axios.post("https://paul-mungah001.alwaysdata.net/api/login",data);

      setLoading("");

      if(response.data){
        navigate("/");
      }
      else{
        setError("Login failed. Please try again........");
      }
    }
    catch(error){
      setLoading("");
      setError("login failed.try again later.......");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)" }}
    >
      
      <div 
        className="card shadow-lg border-0 p-4"
        style={{ width: "400px", borderRadius: "20px", backgroundColor: "#FFFFFF" }}
      >
        
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: "#4F46E5" }}>
            Welcome Back 👋
          </h2>
          <p className="text-muted">Sign in to continue</p>
        </div>

        {/* Messages */}
        {loading && (
          <div className="alert alert-info py-2 text-center">
            {loading}
          </div>
        )}
        {success && (
          <div className="alert alert-success py-2 text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handlesubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input 
              type="email"
              placeholder="Enter your email"
              className="form-control"
              style={{
                borderRadius: "30px",
                padding: "10px 15px",
                border: "1px solid #ddd"
              }}
              required 
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password"
              placeholder="Enter your password"
              className="form-control"
              style={{
                borderRadius: "30px",
                padding: "10px 15px",
                border: "1px solid #ddd"
              }}
              required 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button 
            type="submit"
            className="w-100 fw-bold"
            style={{
              backgroundColor: "#4F46E5",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              padding: "10px",
              transition: "0.3s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#4338CA"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4F46E5"}
          >
            Sign In
          </button>

          {/* Footer */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Don’t have an account?{" "}
              <Link 
                to="/signup" 
                style={{ color: "#4F46E5", textDecoration: "none", fontWeight: "600" }}
              >
                Sign up
              </Link>
            </small>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signin;