import React, { useState } from 'react';

import '../assets/css/Global.css';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import FiltrosInicio from '../components/feautures/FiltrosInicio/FiltrosInicio';
import FilmesCartaz from '../components/feautures/FilmesCartaz/FilmesCartaz';
import Paginacao from '../components/feautures/Paginacao/Paginacao';

function Inicio() {
  const [searchTerm, setSearchTerm] = useState(''); // <-- estado de pesquisa

  return (
    <div>
      <Header />
      <div className="background-overlay" />
      <div className="container-filmecartaz">
        {/* Passa searchTerm e setSearchTerm para o input */}
        <FiltrosInicio searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Passa searchTerm para filtrar filmes */}
        <FilmesCartaz searchTerm={searchTerm} />

        <Paginacao />
      </div>
      <Footer />
    </div>
  );
}

export default Inicio;
