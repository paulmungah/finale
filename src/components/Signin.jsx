import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://paul-mungah001.alwaysdata.net/api/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);

      if (response.data) {
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Try again later.");
    }
  };

  return (
    <div 
      className='d-flex justify-content-center align-items-center'
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
    >
      <div 
        className='p-5 rounded shadow-lg text-center'
        style={{ maxWidth: '400px', width: '100%', backgroundColor: 'white' }}
      >
        <h1 className='mb-4 text-primary'>Sign In</h1>
        
        {loading && <div className='alert alert-info'>{loading ? "Please wait while we authenticate your account..." : ""}</div>}
        {error && <div className='alert alert-danger'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='mb-3 text-start'>
            <label className='form-label fw-bold'>Email</label>
            <input 
              type="email"
              placeholder='Enter your email'
              className='form-control form-control-lg'
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </div>

          <div className='mb-3 text-start'>
            <label className='form-label fw-bold'>Password</label>
            <input 
              type="password"
              placeholder='Enter your password'
              className='form-control form-control-lg'
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </div>

          <button 
            type="submit"
            className='btn btn-primary btn-lg w-100 mb-3'
            disabled={loading}
            style={{ backgroundColor: '#667eea', borderColor: '#667eea' }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className='text-muted'>
            Don't have an account? <Link to='/signup' className='text-decoration-none fw-bold'>Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;