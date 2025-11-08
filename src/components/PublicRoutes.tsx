import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/css/Global.css';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (token) {
      setShowModal(true);

      const timer = setTimeout(() => {
        navigate('/inicio', { replace: true });
      }, 5000); // espera 5 segundos antes de redirecionar

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowModal(false);
  };

  return (
    <>
      {children}

      {token && showModal && (
        <div className="modal-overlay-redirecionamento">
          <div className="modal-redirecionamento">
            <h2>Você já está logado!</h2>
            <p>Redirecionando para a página inicial em alguns segundos...</p>
            <button onClick={handleLogout}>Trocar de conta</button>
          </div>
        </div>
      )}
    </>
  );
};
