import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Inicio from "../pages/Inicio";
import FilmesDetalhes from "../pages/FilmesDetalhes";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/inicio" element={<Inicio />} />
            <Route path="/filmesdetalhes/:id" element={<FilmesDetalhes />} />
      </Routes>
    </BrowserRouter>
  );
}
