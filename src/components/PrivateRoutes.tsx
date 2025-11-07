import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode; // ✅ ReactNode é o tipo correto para JSX children
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Usuário não logado → redireciona
    return <Navigate to="/" replace />;
  }

  // Usuário logado → renderiza o conteúdo
  return <>{children}</>;
};
