import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../assets/css/Global.css';
import Header from '../components/layout/Header/Header';
import HeaderFilmes from '../components/feautures/FilmesDetalhesComponents/HeaderFilmes';
import ClassificacaoFilmes from '../components/feautures/FilmesDetalhesComponents/ClassificaoFilmes';
import SinopseFilmes from '../components/feautures/FilmesDetalhesComponents/SinopseFilmes';
import Footer from '../components/layout/Footer/Footer';
import DrawerEditarFilmes, {
  MovieFormData,
} from '../components/feautures/EditarFilme/DrawerEditarFilmes';
import { filmeService } from '../services/filme.service';

interface FilmeData {
  id: number;
  titulo: string;
  tituloOriginal: string;
  subtitulo: string;
  sinopse: string;
  genero: string[];
  classificacao: string;
  votos: number;
  lancamento: string;
  duracao: number;
  situacao: string;
  idioma: string;
  orcamento: number;
  receita: number;
  lucro: number;
  trailerUrl: string;
  bannerUrl: string;
  rating: number;
}

const FilmesDetalhes: React.FC = () => {
  const { state } = useLocation() as { state: FilmeData };
  const navigate = useNavigate();

  const [filme, setFilme] = useState<FilmeData | null>(null);
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [filmeParaEditar, setFilmeParaEditar] = useState<MovieFormData | undefined>(undefined);

  // Função para carregar/atualizar o filme do backend
  const carregarFilme = async () => {
    try {
      if (!state?.id) return;
      const filmeAtualizado = await filmeService.getFilmePorId(state.id);
      setFilme(filmeAtualizado);
    } catch (err) {
      console.error('Erro ao carregar filme', err);
    }
  };

  useEffect(() => {
    if (!state) {
      navigate('/inicio');
      return;
    }
    carregarFilme(); // carrega dados ao abrir a página
  }, [state]);

  const handleEdit = () => {
    if (!filme) return;
    setFilmeParaEditar({ ...filme, genero: filme.genero });
    setDrawerAberto(true);
  };

  const handleFecharDrawer = () => {
    setDrawerAberto(false);
  };

  // Chama após atualização para recarregar dados
  const handleFilmeAtualizado = async () => {
    await carregarFilme();
    setDrawerAberto(false);
  };

  if (!filme) return <p>Carregando...</p>;

  return (
    <div className="details-container">
      <Header />
      <div className="background-overlay" />

      <div className="container-filmecartaz">
        <div className="moviedetails-filmes-detalhes">
          {/* Header do filme */}
          <HeaderFilmes
            id={filme.id}
            image={filme.bannerUrl}
            titulo={filme.titulo}
            tituloOriginal={filme.tituloOriginal}
            onEdit={handleEdit}
          />

          {/* Classificação e votos */}
          <ClassificacaoFilmes
            classificacao={filme.classificacao}
            votos={filme.votos}
            subtitulo={filme.subtitulo}
          />

          {/* Sinopse e detalhes do filme */}
          <SinopseFilmes
            sinopse={filme.sinopse}
            generos={filme.genero}
            lancamento={filme.lancamento}
            duracao={filme.duracao}
            situacao={filme.situacao}
            idioma={filme.idioma}
            orcamento={filme.orcamento}
            receita={filme.receita}
            lucro={filme.lucro}
          />
        </div>

        {/* Trailer */}
        <div className="trailer-section" style={{ width: '90%', marginBottom: 20 }}>
          <h2 className="h1-trailer-section">Trailer</h2>
          <div
            className="trailer-iframe-wrapper"
            style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}
          >
            <iframe
              style={{
                borderRadius: 4,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              src={filme.trailerUrl}
              title={`Trailer de ${filme.titulo}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* Drawer de edição */}
      <DrawerEditarFilmes
        isOpen={drawerAberto}
        onClose={handleFecharDrawer}
        filmeParaEditar={filmeParaEditar}
        onFilmeAtualizado={handleFilmeAtualizado} // chama o reload
      />
    </div>
  );
};

export default FilmesDetalhes;
