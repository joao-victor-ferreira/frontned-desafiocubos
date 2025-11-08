import React, { useState, useEffect } from 'react';
import './Paginacao.css';

interface PaginacaoProps {
  totalPages: number;
}

const Paginacao: React.FC<PaginacaoProps> = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPages = () => {
    if (isMobile) {
      const pages = [1, 2, 3]; // sempre mostra as três primeiras
      return (
        <>
          {pages.map(page => (
            <button
              key={page}
              className={`pagination-button pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
          {totalPages > 3 && <span className="pagination-dots">...</span>}
        </>
      );
    } else {
      // Desktop: todas as páginas
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`pagination-button pagination-number ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ));
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button pagination-arrow"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {renderPages()}

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
