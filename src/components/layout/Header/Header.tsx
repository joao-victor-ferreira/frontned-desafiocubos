import React from "react";


import "./Header.css";

import logo from "../../../assets/image/logo-desktop.png"; 
import sun from "../../../assets/image/sun.png"; 

const Header: React.FC = () => {
  return (
    <div className="topbar">


      <div className="left-topbar-row">
        <img className="logo-topbar-desktop" src={logo} alt="logo" />
        <h1 className="header-h1-movies">Movies</h1>
      </div>

      <div className="right">

        <button className="header-btn-theme-toggle">
            <img className="iconetoggler-topbar-desktop" src={sun} alt="icone-sun" />
        </button>

        <button className="header-btn-logout">Logout</button>
      </div>
    </div>
  );
};

export default Header;
