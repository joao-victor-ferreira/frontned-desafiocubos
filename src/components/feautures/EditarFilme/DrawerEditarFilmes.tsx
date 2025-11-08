// components/feautures/FilmesDetalhesComponents/DrawerEditarFilmes.tsx
import React, { useState, useEffect } from 'react';

import './DrawerEditarFilmes.css';
import { filmeService } from '../../../services/filme.service';
import { useToast } from '../../toast/useToast';

export interface MovieFormData {
  id?: number;
  titulo: string;
  tituloOriginal: string;
  subtitulo: string;
  sinopse: string;
  classificacao: string;
  votos: number;
  duracao: number;
  lancamento: string;
  idioma: string;
  situacao: string;
  orcamento: number;
  receita: number;
  lucro: number;
  genero: string[];
  rating: number;
  bannerUrl: string;
  trailerUrl: string;
}

interface DrawerEditarFilmeProps {
  isOpen: boolean;
  onClose: () => void;
  filmeParaEditar?: MovieFormData; // Se houver, o Drawer será de edição
  onFilmeAtualizado?: (filme: MovieFormData) => void; // callback após atualização
}

const TODOS_GENEROS = [
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

const DrawerEditarFilmes: React.FC<DrawerEditarFilmeProps> = ({
  isOpen,
  onClose,
  filmeParaEditar,
  onFilmeAtualizado,
}) => {
  const { showToast } = useToast();
  const [carregando, setCarregando] = useState(false);

  const [formData, setFormData] = useState<MovieFormData>({
    titulo: '',
    tituloOriginal: '',
    subtitulo: '',
    sinopse: '',
    classificacao: '',
    votos: 0,
    duracao: 0,
    lancamento: '',
    idioma: '',
    situacao: 'Lançado',
    orcamento: 0,
    receita: 0,
    lucro: 0,
    genero: [],
    rating: 0,
    bannerUrl: '',
    trailerUrl: '',
  });

  // Preenche o formulário se estiver editando
  useEffect(() => {
    if (filmeParaEditar) {
      setFormData(filmeParaEditar);
    } else {
      setFormData({
        titulo: '',
        tituloOriginal: '',
        subtitulo: '',
        sinopse: '',
        classificacao: '',
        votos: 0,
        duracao: 0,
        lancamento: '',
        idioma: '',
        situacao: 'Lançado',
        orcamento: 0,
        receita: 0,
        lucro: 0,
        genero: [],
        rating: 0,
        bannerUrl: '',
        trailerUrl: '',
      });
    }
  }, [filmeParaEditar]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['votos', 'duracao', 'orcamento', 'receita', 'lucro', 'rating'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleGenerosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, genero: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      showToast('O campo Título é obrigatório', 'erro');
      return;
    }
    if (!formData.tituloOriginal.trim()) {
      showToast('O campo Título Original é obrigatório', 'erro');
      return;
    }
    if (formData.genero.length === 0) {
      showToast('Selecione pelo menos um gênero', 'erro');
      return;
    }

    setCarregando(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado. Faça login novamente.');

      if (filmeParaEditar) {
        // Atualiza o filme existente
        await filmeService.atualizarFilme(filmeParaEditar.id!, formData, token);
        showToast('Filme atualizado com sucesso!', 'sucesso');
        onFilmeAtualizado?.(formData);
      } else {
        // Cria novo filme
        await filmeService.criarFilme(formData, token);
        showToast('Filme adicionado com sucesso!', 'sucesso');
      }

      onClose();
    } catch (err: any) {
      showToast(err.message || 'Erro ao salvar filme', 'erro');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>{filmeParaEditar ? 'Editar Filme' : 'Adicionar Filme'}</h2>
          <button className="drawer-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="drawer-form" onSubmit={handleSubmit}>
          <div className="drawer-scroll-content">
            {/* Informações Básicas */}
            <div className="form-section">
              <div className="form-group">
                <label>Título *</label>
                <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Título Original *</label>
                <input
                  type="text"
                  name="tituloOriginal"
                  value={formData.tituloOriginal}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Subtítulo</label>
                <input
                  type="text"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Sinopse</label>
                <textarea
                  name="sinopse"
                  value={formData.sinopse}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            {/* Classificação e Avaliação */}
            <div className="form-section">
              <h3 className="section-title">⭐ Classificação e Avaliação</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Classificação</label>
                  <select
                    name="classificacao"
                    value={formData.classificacao}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="Livre">Livre</option>
                    <option value="10 anos">10 anos</option>
                    <option value="12 anos">12 anos</option>
                    <option value="14 anos">14 anos</option>
                    <option value="16 anos">16 anos</option>
                    <option value="18 anos">18 anos</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating (0-10)</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Votos</label>
                <input type="number" name="votos" value={formData.votos} onChange={handleChange} />
              </div>
            </div>

            {/* Produção */}
            <div className="form-section">
              <h3 className="section-title">🎬 Detalhes de Produção</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Duração (minutos)</label>
                  <input
                    type="number"
                    name="duracao"
                    value={formData.duracao}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Data de Lançamento</label>
                  <input
                    type="date"
                    name="lancamento"
                    value={formData.lancamento}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Idioma</label>
                  <input
                    type="text"
                    name="idioma"
                    value={formData.idioma}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Situação</label>
                  <select name="situacao" value={formData.situacao} onChange={handleChange}>
                    <option value="Lançado">Lançado</option>
                    <option value="Em breve">Em breve</option>
                    <option value="Em produção">Em produção</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Gêneros *</label>
                <select
                  multiple
                  name="generos"
                  value={formData.genero}
                  onChange={handleGenerosChange}
                >
                  {TODOS_GENEROS.map((g, i) => (
                    <option key={i} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <small>Segure Ctrl (Windows) ou ⌘ Cmd (Mac) para selecionar vários</small>
              </div>
            </div>

            {/* Finanças */}
            <div className="form-section">
              <h3 className="section-title">💰 Informações Financeiras</h3>
              <div className="form-group">
                <label>Orçamento (USD)</label>
                <input
                  type="number"
                  name="orcamento"
                  value={formData.orcamento}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Receita (USD)</label>
                <input
                  type="number"
                  name="receita"
                  value={formData.receita}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Lucro (manual)</label>
                <input type="number" name="lucro" value={formData.lucro} onChange={handleChange} />
              </div>
            </div>

            {/* Mídia */}
            <div className="form-section">
              <h3 className="section-title">🔗 Mídia</h3>
              <div className="form-group">
                <label>URL do Banner</label>
                <input
                  type="url"
                  name="bannerUrl"
                  value={formData.bannerUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>URL do Trailer (YouTube)</label>
                <input
                  type="url"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="drawer-footer">
            <button type="button" className="btn-cancelar" onClick={onClose} disabled={carregando}>
              Cancelar
            </button>
            <button type="submit" className="btn-adicionar" disabled={carregando}>
              {carregando
                ? filmeParaEditar
                  ? 'Atualizando...'
                  : 'Adicionando...'
                : filmeParaEditar
                  ? 'Atualizar Filme'
                  : 'Adicionar Filme'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DrawerEditarFilmes;
