import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "50px"
      }}
    >
      <div className="container">

        <div className="row">

          {/* 🎵 About Section */}
          <div className="col-md-6 mb-4">
            <h4 className="fw-bold">🎵 Music Base</h4>
            <p style={{ color: "#ccc" }}>
              Music Base is your ultimate destination for discovering and purchasing 
              high-quality music products. Whether you're looking for headphones, 
              speakers, or instruments, we bring the best sound experience closer to you. 
              Feel the rhythm, live the music, and elevate your vibe with us.
            </p>
          </div>

          {/* 📱 Social Media Section */}
          <div className="col-md-6 text-md-end">
            <h5 className="fw-bold mb-3">Follow Us</h5>

            <div className="d-flex justify-content-md-end gap-3">

              {/* Instagram */}
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  style={{ width: "35px", cursor: "pointer" }}
                />
              </a>

              {/* Twitter */}
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="Twitter"
                  style={{ width: "35px", cursor: "pointer" }}
                />
              </a>

              {/* Facebook */}
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  style={{ width: "35px", cursor: "pointer" }}
                />
              </a>

            </div>
          </div>

        </div>

        {/* Divider */}
        <hr style={{ borderColor: "#444" }} />

        {/* Bottom Text */}
        <div className="text-center" style={{ color: "#aaa" }}>
          <small>
            © {new Date().getFullYear()} Music Base. All rights reserved.
          </small>
        </div>

      </div>
    </div>
  );
};

export default Footer;