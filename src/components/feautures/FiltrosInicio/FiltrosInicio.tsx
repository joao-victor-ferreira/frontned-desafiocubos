import React, { useState } from 'react';

import DrawerAdicionarFilme from '../AdicionarFilmes/DrawerAdicionarFilmes';
import ModalFiltros, { FiltrosData } from '../AdicionarFilmes/ModalFilmes';
import './FiltroInicio.css';

function FiltrosInicio() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalFiltrosOpen, setIsModalFiltrosOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenFiltros = () => {
    setIsModalFiltrosOpen(true);
  };

  const handleCloseFiltros = () => {
    setIsModalFiltrosOpen(false);
  };

  const handleApplyFilters = (filters: FiltrosData) => {
    console.log('Filtros aplicados:', filters);
    // Aqui você pode fazer a chamada para a API com os filtros
  };

  return (
    <>
      <div className='filtrosinicio-container'>
        <div className='row-filtrosinicio'>
          <div>
            <input 
              className='input-pequisarfilme-filtros' 
              placeholder='Pesquise por filmes' 
            />
          </div>

          <div>
            <button 
              className='btn-filtros-filtros'
              onClick={handleOpenFiltros}
            >
              Filtros
            </button>
            <button 
              className='btn-adicionarfilmes-filtros'
              onClick={handleOpenDrawer}
            >
              Adicionar Filme
            </button>
          </div>
        </div>
      </div>

      <DrawerAdicionarFilme 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer} 
      />

      <ModalFiltros
        isOpen={isModalFiltrosOpen}
        onClose={handleCloseFiltros}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}

export default FiltrosInicio;