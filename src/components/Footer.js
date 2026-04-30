import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side - Brand + Description */}
          <div className="col-lg-6 mb-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "linear-gradient(135deg, #ff00cc, #3333ff)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                ♫
              </div>
              <h2 className="fw-bold mb-0" style={{ fontSize: "2.1rem" }}>
                Music Base
              </h2>
            </div>

            <p style={{ color: "#bbb", lineHeight: "1.8", maxWidth: "460px" }}>
              Beyond just selling gear — we're building a community for those who 
              live and breathe music. From bedroom producers to stage legends, 
              we curate the finest sound tools to help you create, perform, and feel every beat.
            </p>

            <p style={{ color: "#888", fontSize: "0.95rem", marginTop: "20px" }}>
              Sound is emotion. We help you express it louder.
            </p>
          </div>

          {/* Right Side - Social Media */}
          <div className="col-lg-6 text-lg-end">
            <h5 className="text-uppercase mb-4" style={{ letterSpacing: "2px", fontSize: "0.95rem" }}>
              Connect with the vibe
            </h5>

            <div className="d-flex justify-content-lg-end gap-4 mb-5">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  style={{ width: "42px" }}
                />
              </a>

              {/* X / Twitter */}
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                  alt="X"
                  style={{ width: "42px" }}
                />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  style={{ width: "42px" }}
                />
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on TikTok"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3046/3046124.png"
                  alt="TikTok"
                  style={{ width: "42px" }}
                />
              </a>
            </div>

            <div style={{ color: "#666", fontSize: "0.9rem" }}>
              Made with <span style={{ color: "#ff3366" }}>♥</span> for music lovers in Nairobi &amp; beyond
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-5" style={{ borderColor: "#222" }} />

        <div 
          className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start"
          style={{ color: "#555", fontSize: "0.9rem" }}
        >
          <div>© {currentYear} Music Base • All Rights Reserved</div>
          <div className="mt-3 mt-md-0">
            Privacy Policy • Terms of Service • Contact Us
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;