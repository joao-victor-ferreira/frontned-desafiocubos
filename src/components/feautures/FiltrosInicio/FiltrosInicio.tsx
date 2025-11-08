import React, { useState } from 'react';

import DrawerAdicionarFilme from '../AdicionarFilmes/DrawerAdicionarFilmes';
import ModalFiltros, { FiltrosData } from '../AdicionarFilmes/ModalFilmes';
import './FiltroInicio.css';

interface FiltrosInicioProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const FiltrosInicio: React.FC<FiltrosInicioProps> = ({ searchTerm, setSearchTerm }) => {
  // Estados de abertura de modal/drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalFiltrosOpen, setIsModalFiltrosOpen] = useState(false);

  // Funções de controle
  const toggleDrawer = (open: boolean) => setIsDrawerOpen(open);
  const toggleModalFiltros = (open: boolean) => setIsModalFiltrosOpen(open);

  const handleApplyFilters = (filters: FiltrosData) => {
    console.log('Filtros aplicados:', filters);
    // Aqui você pode fazer a chamada para a API com os filtros aplicados
  };

  return (
    <>
      <div className="filtrosinicio-container">
        <div className="row-filtrosinicio">
          {/* Campo de pesquisa */}
          <input
            className="input-pequisarfilme-filtros"
            placeholder="Pesquise por filmes"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          {/* Botões */}
          <div className="filtrosinicio-buttons">
            <button
              className="btn-filtros-filtros"
              type="button"
              onClick={() => toggleModalFiltros(true)}
            >
              Filtros
            </button>

            <button
              className="btn-adicionarfilmes-filtros"
              type="button"
              onClick={() => toggleDrawer(true)}
            >
              Adicionar Filme
            </button>
          </div>
        </div>
      </div>

      {/* Drawer para adicionar filme */}
      <DrawerAdicionarFilme isOpen={isDrawerOpen} onClose={() => toggleDrawer(false)} />

      {/* Modal de filtros */}
      <ModalFiltros
        isOpen={isModalFiltrosOpen}
        onClose={() => toggleModalFiltros(false)}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default FiltrosInicio;
