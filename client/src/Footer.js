import React from "react";
import "./Footer.css";
import github from "./images/github-logo.png";
import fb from "./images/fb-logo.png";
import instagram from "./images/instagram-logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-div">
          <p>
            <b>Contact Us:</b>
          </p>
          <p>Phone: +380 99 999 99 99</p>
          <p>Email: support@frigginblog.com</p>
        </div>
        <div className="footer-div">
          <div className="logos-div">
            <div>
              <img src={github} alt="github-logo" />
            </div>
            <div>
              <img src={fb} alt="fb-logo" />
            </div>
            <img src={instagram} alt="instagram-logo" />
          </div>
        </div>
        <div className="footer-div-right">
          <p>&copy; Lukas Bakšys</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
