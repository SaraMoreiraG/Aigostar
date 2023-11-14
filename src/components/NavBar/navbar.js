import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo-black.png";
import "./navbar.css";
import cart from "../../assets/images/icon-basket-full.png";

function NavBar() {
  const [isSmallScreen] = useState(window.innerWidth < 700);

  return (
    <div className={`nav-bar ${isSmallScreen ? "nav-bar-small" : ""}`}>
      <div className={isSmallScreen ? "col-4 p-3" : "col-5"}>
        <Link to="/">
          <img src={logo} alt="aigostar logo" className="img-fluid" />
        </Link>
      </div>
      {isSmallScreen ? (
        <div className="d-flex justify-content-end col-8">
          <div className="small-menu">
            <div className="nav-buy-small-container">
              <Link to="/shopping-cart">
                <img src={cart} alt="Icon" className="nav-buy-small" />
              </Link>
            </div>
            <div className="bars">
              <div>
                <i className="fa-solid fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex">
          <Link to="/airfryers" className="nav-links">
            <span className="nav-text-links">Freidoras de aire</span>
          </Link>
          <Link to="/accesorios" className="nav-links">
            <span className="nav-text-links">Accesorios</span>
          </Link>
          <Link to="/recetas" className="nav-links">
            <span className="nav-text-links">Recetas</span>
          </Link>
          <div className="nav-buy-container">
            <Link to="/shopping-cart">
              <img src={cart} alt="Icon" className="nav-buy" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
