import React from "react";
import { useNavigate } from "react-router-dom";

import "./Header.css";

import logo from "../../../assets/image/logo-desktop.png"; 
import sun from "../../../assets/image/sun.png"; 

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token e dados do usuário
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redireciona para a tela de login
    navigate("/", { replace: true });
  };

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

        <button className="header-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
