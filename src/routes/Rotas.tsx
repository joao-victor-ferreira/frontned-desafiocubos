import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Registrar from '../pages/Registrar';
import Inicio from '../pages/Inicio';
import FilmesDetalhes from '../pages/FilmesDetalhes';

import { PublicRoute } from '../components/PublicRoutes';
import { PrivateRoute } from '../components/PrivateRoutes';

// Importa o sistema de toast
import { ToastProvider } from '../components/toast/useToast';
import { ToastContainer } from '../components/toast/ToastContainer';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <ToastProvider>
                <Login />
                <ToastContainer />
              </ToastProvider>
            </PublicRoute>
          }
        />

        <Route
          path="/registrar"
          element={
            <PublicRoute>
              <ToastProvider>
                <Registrar />
                <ToastContainer />
              </ToastProvider>
            </PublicRoute>
          }
        />

        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <ToastProvider>
                <Inicio />
                <ToastContainer />
              </ToastProvider>
            </PrivateRoute>
          }
        />

        <Route
          path="/filmesdetalhes/:id"
          element={
            <PrivateRoute>
              <ToastProvider>
                <FilmesDetalhes />
                <ToastContainer />
              </ToastProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
