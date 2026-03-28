import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Makepayment = () => {

  const { product } = useLocation().state || {}
  const navigate = useNavigate()

  const img_url = "https://paul-mungah001.alwaysdata.net/static/images/"

  const [number , setNumber ] = useState("")
  const [loading , setLoading] = useState(false);
  const [success , setSuccess] = useState ("");
  const [error , setError] = useState("");

  const handlesubmit = async (e) =>{
    e.preventDefault()
    setLoading(true)

    try{
      const formdata = new FormData()
      formdata.append("phone",number);
      formdata.append("amount",product.product_cost)

      const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

      setLoading(false)
      setSuccess(response.data.message)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0f9d58, #34a853)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >

      <div 
        className="shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          background: "#fff"
        }}
      >

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button 
            className="btn btn-outline-success btn-sm"
            onClick={()=>navigate("/")}
          >
            ← Back
          </button>

          <h5 style={{color:"#0f9d58", fontWeight:"700"}}>
            Lipa na M-Pesa 💳
          </h5>
        </div>

        {/* Product Image */}
        <div className="text-center mb-3">
          <img 
            src={img_url + product.product_photo} 
            alt="Product"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "15px"
            }}
          />
        </div>

        {/* Product Info */}
        <div className="text-center mb-3">
          <h4 style={{fontWeight:"700"}}>{product.product_name}</h4>
          <p className="text-muted" style={{fontSize:"14px"}}>
            {product.product_description}
          </p>
          <h5 style={{color:"#fbbc05", fontWeight:"700"}}>
            KES {product.product_cost}
          </h5>
        </div>

        {/* Messages */}
        {loading && <Loader/>}
        {success && <div className="alert alert-success text-center py-2">{success}</div>}
        {error && <div className="alert alert-danger text-center py-2">{error}</div>}

        {/* Form */}
        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <input 
              type="number"
              className="form-control"
              placeholder="📱 2547XXXXXXXX"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              style={{
                borderRadius: "30px",
                padding: "12px",
                border: "1px solid #ddd"
              }}
            />
          </div>

          <button 
            type="submit"
            className="w-100"
            style={{
              background: "#0f9d58",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "30px",
              fontWeight: "600",
              transition: "0.3s"
            }}
            onMouseOver={(e)=> e.target.style.background = "#0c7c45"}
            onMouseOut={(e)=> e.target.style.background = "#0f9d58"}
          >
            Pay Now 💰
          </button>

        </form>

      </div>
    </div>
  )
}

export default Makepayment