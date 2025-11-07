import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Inicio from "../pages/Inicio";
import FilmesDetalhes from "../pages/FilmesDetalhes";

import { PublicRoute } from "../components/PublicRoutes";
import { PrivateRoute } from "../components/PrivateRoutes";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/registrar"
          element={
            <PublicRoute>
              <Registrar />
            </PublicRoute>
          }
        />

        {/* Rotas privadas */}
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <Inicio />
            </PrivateRoute>
          }
        />
        <Route
          path="/filmesdetalhes/:id"
          element={
            <PrivateRoute>
              <FilmesDetalhes />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
