import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';
import { Sun } from 'lucide-react'; // ícone do pacote lucide-react

import logoDesktop from '../../../assets/image/logo-desktop.png';
import logoMobile from '../../../assets/image/logo-mobile.png';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  return (
    <div className="topbar">
      <div className="left-topbar-row">
        <img className="logo-topbar-desktop" src={logoDesktop} alt="logo desktop" />
        <img className="logo-topbar-mobile" src={logoMobile} alt="logo mobile" />
        <h1 className="header-h1-movies">Movies</h1>
      </div>

      <div className="right">
        <button className="header-btn-theme-toggle">
          {/* Ícone do Sun com cor personalizada */}
          <Sun className="header-btn-icone" />
        </button>

        <button className="header-btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
