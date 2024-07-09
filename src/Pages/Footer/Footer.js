import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-body" id="community">
        <div className="footer">
          <h1>JOIN OUR COMMUNITY</h1>
          <p>Come Join Us Now!</p>
        </div>
        <div class="flex justify-center space-x-4 mt-3">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            <i class="fab fa-twitter"></i> Twitter
          </button>
          <button class="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full">
            <i class="fab fa-instagram"></i> Instagram
          </button>
        </div>
        <p className="m-6 text-center">
          Copyright &copy; 2024 by MURINE
        </p>
      </div>
    </>
  );
};

export default Footer;
