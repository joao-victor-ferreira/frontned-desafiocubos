import React from 'react'

import './FiltroInicio.css'

function FiltrosInicio() {
  return (
    <div className='filtrosinicio-container'>
        
        <div className='row-filtrosinicio'>
            <div>
            <input className='input-pequisarfilme-filtros' placeholder='Pesquise por filmes' />
            </div>

            <div>
            <button className='btn-filtros-filtros'>Filtros</button>
            <button className='btn-adicionarfilmes-filtros'>Adicionar Filme</button>

             </div>
        </div>

    </div>
  )
}

export default FiltrosInicio