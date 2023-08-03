import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="main_footer">
      <div className="container">

        <div className="col-md-4 footer-head">

          <h4>Ready to unleash your care services' full potential?</h4>

        <div>
        <NavLink to="#" className="btn">Get Started</NavLink>
        </div>
        </div>
        <hr />
        <div className="col-md-12 text-center logo_footer">
      <NavLink to=""> <img alt="" src={`${process.env.PUBLIC_URL}/images/logo.svg`}/></NavLink>
      </div>
       <ul>
          <li><NavLink to="/">Home</NavLink></li> 
          <li><NavLink to="/segments">Segments</NavLink></li> 
          <li><NavLink to="/features">Features</NavLink></li> 
          <li><NavLink to="/plans">Plans</NavLink></li> 
          <li><NavLink to="/contact">Contact Us</NavLink></li> 
          <li><NavLink to="/blog">Blog</NavLink></li> 
      </ul>
      <div className="copyright">
      <NavLink to="/terms">Terms of Use</NavLink> <span>|</span> <NavLink to="/privacy">Privacy Policy</NavLink> <span>|</span>  © 2020 - 2021 by Auriga Magnus Care Limited. All Rights Reserved. 
      </div>
      </div>
  </footer>
  );
}

export default Footer;