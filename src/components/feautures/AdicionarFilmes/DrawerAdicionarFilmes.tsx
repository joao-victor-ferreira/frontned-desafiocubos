import React, { useState } from 'react';
import './DrawerAdicionarFilmes.css';

interface DrawerAdicionarFilmeProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MovieFormData {
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

function DrawerAdicionarFilmes({ isOpen, onClose }: DrawerAdicionarFilmeProps) {
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState<'sucesso' | 'erro' | ''>('');

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'votos' ||
        name === 'duracao' ||
        name === 'orcamento' ||
        name === 'receita' ||
        name === 'lucro' ||
        name === 'rating'
          ? Number(value)
          : value,
    }));
  };

  const handleGenerosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, genero: selected }));
  };

  const limparFormulario = () => {
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
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMensagem('');
  setTipoMensagem('');

  if (!formData.titulo || !formData.tituloOriginal) {
    setMensagem('Título e título original são obrigatórios');
    setTipoMensagem('erro');
    return;
  }

  if (formData.genero.length === 0) {
    setMensagem('Selecione pelo menos um gênero');
    setTipoMensagem('erro');
    return;
  }

  setCarregando(true);

  try {
    // 🔑 Recupera o token do localStorage (ou de onde você estiver salvando)
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }

    const response = await fetch('http://localhost:5000/api/filmes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ⬅️ token enviado aqui
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Erro ao adicionar filme');

    const data = await response.json();

    setMensagem('Filme adicionado com sucesso!');
    setTipoMensagem('sucesso');

    setTimeout(() => {
      limparFormulario();
      onClose();
    }, 2000);

    console.log('Filme adicionado:', data);
  } catch (err: any) {
    setMensagem(err.message || 'Erro ao adicionar filme. Tente novamente.');
    setTipoMensagem('erro');
  } finally {
    setCarregando(false);
  }
};


  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className={`drawer-container ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Adicionar Filme</h2>
          <button className="drawer-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="drawer-form" onSubmit={handleSubmit}>
          <div className="drawer-scroll-content">
            {/* ---- Informações Básicas ---- */}
            <div className="form-section">
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Bumblebee"
                  required
                />
              </div>

              <div className="form-group">
                <label>Título Original *</label>
                <input
                  type="text"
                  name="tituloOriginal"
                  value={formData.tituloOriginal}
                  onChange={handleChange}
                  placeholder="Ex: Bumblebee"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subtítulo</label>
                <input
                  type="text"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={handleChange}
                  placeholder="Every adventure has a beginning"
                />
              </div>

              <div className="form-group">
                <label>Sinopse</label>
                <textarea
                  name="sinopse"
                  value={formData.sinopse}
                  onChange={handleChange}
                  placeholder="Digite a sinopse do filme..."
                  rows={4}
                />
              </div>
            </div>

            {/* ---- Classificação ---- */}
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
                    placeholder="6.8"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Votos</label>
                <input
                  type="number"
                  name="votos"
                  value={formData.votos}
                  onChange={handleChange}
                  placeholder="157000"
                />
              </div>
            </div>

            {/* ---- Produção ---- */}
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
                    placeholder="114"
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
                    placeholder="Inglês"
                  />
                </div>

                <div className="form-group">
                  <label>Situação</label>
                  <select
                    name="situacao"
                    value={formData.situacao}
                    onChange={handleChange}
                  >
                    <option value="Lançado">Lançado</option>
                    <option value="Em breve">Em breve</option>
                    <option value="Em produção">Em produção</option>
                  </select>
                </div>
              </div>

              {/* ---- Novo campo de gênero ---- */}
              <div className="form-group">
                <label>Gêneros *</label>
                <select
                  multiple
                  name="genero"
                  value={formData.genero}
                  onChange={handleGenerosChange}
                  className="select-generos"
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

            {/* ---- Finanças ---- */}
            <div className="form-section">
              <h3 className="section-title">💰 Informações Financeiras</h3>

              <div className="form-group">
                <label>Orçamento (USD)</label>
                <input
                  type="number"
                  name="orcamento"
                  value={formData.orcamento}
                  onChange={handleChange}
                  placeholder="135000000"
                />
              </div>

              <div className="form-group">
                <label>Receita (USD)</label>
                <input
                  type="number"
                  name="receita"
                  value={formData.receita}
                  onChange={handleChange}
                  placeholder="700000000"
                />
              </div>

              <div className="form-group">
                <label>Lucro (manual)</label>
                <input
                  type="number"
                  name="lucro"
                  value={formData.lucro}
                  onChange={handleChange}
                  placeholder="565000000"
                />
              </div>
            </div>

            {/* ---- Mídia ---- */}
            <div className="form-section">
              <h3 className="section-title">🔗 Mídia</h3>

              <div className="form-group">
                <label>URL do Banner</label>
                <input
                  type="url"
                  name="bannerUrl"
                  value={formData.bannerUrl}
                  onChange={handleChange}
                  placeholder="https://image.tmdb.org/t/p/original/..."
                />
              </div>

              <div className="form-group">
                <label>URL do Trailer (YouTube)</label>
                <input
                  type="url"
                  name="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
          </div>

          {/* ---- Footer ---- */}
          <div className="drawer-footer">
            <button
              type="button"
              className="btn-cancelar"
              onClick={onClose}
              disabled={carregando}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-adicionar" disabled={carregando}>
              {carregando ? 'Adicionando...' : 'Adicionar Filme'}
            </button>
          </div>

          {mensagem && (
            <div className={`drawer-alert ${tipoMensagem}`}>
              <span className="alert-icone">
                {tipoMensagem === 'sucesso' ? '✓' : '⚠'}
              </span>
              <p>{mensagem}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default DrawerAdicionarFilmes;
