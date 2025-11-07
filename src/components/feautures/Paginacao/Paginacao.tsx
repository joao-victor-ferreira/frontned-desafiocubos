import React, { useState } from 'react';

import './Paginacao.css';

const Paginacao: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (

      <div className="pagination-container">
        {/* Botão Anterior */}
        <button
          className="pagination-button pagination-arrow"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          ‹
        </button>

        {/* Número da Página 1 */}
        <button
          className={`pagination-button pagination-number ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageClick(1)}
        >
          1
        </button>

        {/* Números das Páginas 2-5 */}
        {[2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`pagination-button pagination-number ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {/* Botão Próximo */}
        <button
          className="pagination-button pagination-arrow"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
   
  );
};

export default Paginacao;