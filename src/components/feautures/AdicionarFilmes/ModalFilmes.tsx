import React, { useState } from 'react';

import './ModalFilmes.css';

interface ModalFiltrosProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FiltrosData) => void;
}

export interface FiltrosData {
  generos: string[];
  anoInicio: string;
  anoFim: string;
  ratingMinimo: number;
  classificacao: string[];
  situacao: string[];
  idioma: string;
  duracaoMinima: string;
  duracaoMaxima: string;
}

const GENEROS_DISPONIVEIS = [
  'Ação',
  'Aventura',
  'Animação',
  'Comédia',
  'Crime',
  'Documentário',
  'Drama',
  'Família',
  'Fantasia',
  'Faroeste',
  'Ficção Científica',
  'Guerra',
  'História',
  'Mistério',
  'Musical',
  'Romance',
  'Suspense',
  'Terror',
];

const CLASSIFICACOES = ['Livre', '10 anos', '12 anos', '14 anos', '16 anos', '18 anos'];

const SITUACOES = ['Lançado', 'Em breve', 'Em produção'];

const IDIOMAS = [
  'Português',
  'Inglês',
  'Espanhol',
  'Francês',
  'Alemão',
  'Italiano',
  'Japonês',
  'Coreano',
  'Mandarim',
];

function ModalFilmes({ isOpen, onClose, onApplyFilters }: ModalFiltrosProps) {
  const [filtros, setFiltros] = useState<FiltrosData>({
    generos: [],
    anoInicio: '',
    anoFim: '',
    ratingMinimo: 0,
    classificacao: [],
    situacao: [],
    idioma: '',
    duracaoMinima: '',
    duracaoMaxima: '',
  });

  const handleGeneroToggle = (genero: string) => {
    setFiltros(prev => ({
      ...prev,
      generos: prev.generos.includes(genero)
        ? prev.generos.filter(g => g !== genero)
        : [...prev.generos, genero],
    }));
  };

  const handleClassificacaoToggle = (classificacao: string) => {
    setFiltros(prev => ({
      ...prev,
      classificacao: prev.classificacao.includes(classificacao)
        ? prev.classificacao.filter(c => c !== classificacao)
        : [...prev.classificacao, classificacao],
    }));
  };

  const handleSituacaoToggle = (situacao: string) => {
    setFiltros(prev => ({
      ...prev,
      situacao: prev.situacao.includes(situacao)
        ? prev.situacao.filter(s => s !== situacao)
        : [...prev.situacao, situacao],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: name === 'ratingMinimo' ? Number(value) : value,
    }));
  };

  const handleLimpar = () => {
    setFiltros({
      generos: [],
      anoInicio: '',
      anoFim: '',
      ratingMinimo: 0,
      classificacao: [],
      situacao: [],
      idioma: '',
      duracaoMinima: '',
      duracaoMaxima: '',
    });
  };

  const handleAplicar = () => {
    onApplyFilters(filtros);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-filtros-overlay" onClick={onClose} />

      <div className="modal-filtros-container">
        <div className="modal-filtros-header">
          <h2>Filtros</h2>
          <button className="modal-filtros-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-filtros-content">
          {/* Gêneros */}
          <div className="filtro-section">
            <h3 className="filtro-label">Gêneros</h3>
            <div className="filtro-chips">
              {GENEROS_DISPONIVEIS.map(genero => (
                <button
                  key={genero}
                  type="button"
                  className={`chip ${filtros.generos.includes(genero) ? 'active' : ''}`}
                  onClick={() => handleGeneroToggle(genero)}
                >
                  {genero}
                </button>
              ))}
            </div>
          </div>

          {/* Ano de Lançamento */}
          <div className="filtro-section">
            <h3 className="filtro-label">Ano de Lançamento</h3>
            <div className="filtro-row">
              <div className="filtro-input-group">
                <label>De</label>
                <input
                  type="number"
                  name="anoInicio"
                  value={filtros.anoInicio}
                  onChange={handleChange}
                  placeholder="2000"
                  min="1900"
                  max="2030"
                />
              </div>
              <div className="filtro-input-group">
                <label>Até</label>
                <input
                  type="number"
                  name="anoFim"
                  value={filtros.anoFim}
                  onChange={handleChange}
                  placeholder="2024"
                  min="1900"
                  max="2030"
                />
              </div>
            </div>
          </div>

          {/* Rating Mínimo */}
          <div className="filtro-section">
            <h3 className="filtro-label">Avaliação Mínima: {filtros.ratingMinimo.toFixed(1)} ⭐</h3>
            <input
              type="range"
              name="ratingMinimo"
              value={filtros.ratingMinimo}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.5"
              className="filtro-range"
            />
            <div className="range-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          {/* Classificação Etária */}
          <div className="filtro-section">
            <h3 className="filtro-label">Classificação Etária</h3>
            <div className="filtro-chips">
              {CLASSIFICACOES.map(classificacao => (
                <button
                  key={classificacao}
                  type="button"
                  className={`chip ${filtros.classificacao.includes(classificacao) ? 'active' : ''}`}
                  onClick={() => handleClassificacaoToggle(classificacao)}
                >
                  {classificacao}
                </button>
              ))}
            </div>
          </div>

          {/* Situação */}
          <div className="filtro-section">
            <h3 className="filtro-label">Situação</h3>
            <div className="filtro-chips">
              {SITUACOES.map(situacao => (
                <button
                  key={situacao}
                  type="button"
                  className={`chip ${filtros.situacao.includes(situacao) ? 'active' : ''}`}
                  onClick={() => handleSituacaoToggle(situacao)}
                >
                  {situacao}
                </button>
              ))}
            </div>
          </div>

          {/* Idioma */}
          <div className="filtro-section">
            <h3 className="filtro-label">Idioma</h3>
            <select
              name="idioma"
              value={filtros.idioma}
              onChange={handleChange}
              className="filtro-select"
            >
              <option value="">Todos os idiomas</option>
              {IDIOMAS.map(idioma => (
                <option key={idioma} value={idioma}>
                  {idioma}
                </option>
              ))}
            </select>
          </div>

          {/* Duração */}
          <div className="filtro-section">
            <h3 className="filtro-label">Duração (minutos)</h3>
            <div className="filtro-row">
              <div className="filtro-input-group">
                <label>Mínima</label>
                <input
                  type="number"
                  name="duracaoMinima"
                  value={filtros.duracaoMinima}
                  onChange={handleChange}
                  placeholder="60"
                  min="0"
                />
              </div>
              <div className="filtro-input-group">
                <label>Máxima</label>
                <input
                  type="number"
                  name="duracaoMaxima"
                  value={filtros.duracaoMaxima}
                  onChange={handleChange}
                  placeholder="180"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-filtros-footer">
          <button type="button" className="btn-limpar" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-aplicar" onClick={handleAplicar}>
            Aplicar Filtros
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalFilmes;
