import axios from 'axios';
import React, {useState} from 'react'
import { Link,NavLink } from 'react-router-dom'


const Signup = () => {
  const [username , setUsername]= useState(""); 
  const[email, setEmail] = useState("");
  const [password , setPassword]= useState(""); 
  const [phone , setNumber]= useState(""); 

  const[loading , setLoading] = useState("");
  const[success , setSuccess] = useState("");
  const[error, setError] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading("Please wait as registration is in progress....")

    try{
      const formdata = new FormData();
      formdata.append("username",username); 
      formdata.append("email",email);
      formdata.append("password",password);
      formdata.append("phone",phone); 

      const response = await axios.post("https://paul-mungah001.alwaysdata.net/api/signup",formdata)

      setLoading("");
      setSuccess(response.data.message)

      setUsername("");
      setPassword("");
      setEmail("");
      setNumber("");

      setTimeout(()=>{
        setSuccess("");
      },15000)

    }
    catch(error){
      setLoading("");
      setError(error.message)
    }
  }

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #4F46E5, #9333EA)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      
      <div 
        className="p-4 shadow-lg"
        style={{
          width: "420px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)"
        }}
      >
        
        {/* 🔥 App Title */}
        <div className="text-center mb-3">
          <h1 style={{
            fontWeight: "800",
            color: "#4F46E5",
            letterSpacing: "1px"
          }}>
            🎵 Music Base
          </h1>
          <p className="text-muted" style={{fontSize:"14px"}}>
            Your home for music
          </p>
        </div>

        {/* Section Title */}
        <div className="text-center mb-4">
          <h3 style={{fontWeight:"700"}}>Create Account 🚀</h3>
        </div>

        {/* Alerts */}
        {loading && <div className="alert alert-info text-center py-2">{loading}</div>}
        {success && <div className="alert alert-success text-center py-2">{success}</div>}
        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input 
              type="text"
              placeholder="👤 Username"
              className="form-control"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input 
              type="email"
              placeholder="📧 Email address"
              className="form-control"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input 
              type="password"
              placeholder="🔒 Password"
              className="form-control"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input 
              type="tel"
              placeholder="📱 Phone number"
              className="form-control"
              style={inputStyle}
              value={phone}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-100"
            style={{
              background: "linear-gradient(135deg, #4F46E5, #9333EA)",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "30px",
              fontWeight: "600",
              transition: "0.3s"
            }}
            onMouseOver={(e)=> e.target.style.opacity = "0.85"}
            onMouseOut={(e)=> e.target.style.opacity = "1"}
          >
            Sign Up
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to={'/signin'} style={{color:"#4F46E5", fontWeight:"600", textDecoration:"none"}}>
                Signin
              </Link>
            </small>
          </div>

        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  borderRadius: "30px",
  padding: "12px 15px",
  border: "1px solid #ddd",
}

export default Signup