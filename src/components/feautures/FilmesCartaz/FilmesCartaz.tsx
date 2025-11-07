import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FilmesCartaz.css';

interface Movie {
  _id?: string;
  id?: number;
  titulo: string;
  tituloOriginal?: string;
  subtitulo?: string;
  sinopse?: string;
  generos?: string[] | string;
  imagem?: string;
}

const FilmesCartaz: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [watchingMovies, setWatchingMovies] = useState<{ [key: string]: number }>({});
  const [loadingMovies, setLoadingMovies] = useState<{ [key: string]: boolean }>({});
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 Buscar filmes da API
  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/filmes');
        const data = await response.json();

        console.log('📽️ Dados recebidos da API:', data);
        setMovies(data.filmes || []); // ✅ Ajuste aqui
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmes();
  }, []);

  const handlePlayClick = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    const movieId = movie._id || movie.id?.toString() || '';
    if (loadingMovies[movieId]) return;

    setLoadingMovies((prev) => ({ ...prev, [movieId]: true }));
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoadingMovies((prev) => ({ ...prev, [movieId]: false }));
          setWatchingMovies((prev) => ({ ...prev, [movieId]: 0 }));

          // 👉 Envia para página de detalhes com state
          navigate(`/filmesdetalhes/${movieId}`, { state: movie });
        }, 200);
      } else {
        setWatchingMovies((prev) => ({ ...prev, [movieId]: progress }));
      }
    }, 100);
  };

  if (loading) {
    return <div className="loading-text">Carregando filmes...</div>;
  }

  if (movies.length === 0) {
    return <div className="loading-text">Nenhum filme encontrado 😕</div>;
  }

  return (
    <div className="movies-section">
      <div className="movies-grid">
        {movies.map((movie) => {
          const movieId = movie._id || movie.id?.toString() || '';
          const isHovered = hoveredCard === movieId;
          const isLoading = loadingMovies[movieId];
          const progress = watchingMovies[movieId] || 0;

          return (
            <div
              key={movieId}
              className={`movie-card ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(movieId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="movie-card-inner">
                <img
                  src={movie.imagem || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
                  alt={movie.titulo}
                  className="movie-image"
                />

                {isLoading && (
                  <>
                    <div className="movie-overlay" />
                    <div className="movie-spinner">
                      <svg width="98" height="98" viewBox="0 0 98 98">
                        <circle cx="49" cy="49" r="42" className="spinner-bg" />
                        <circle
                          cx="49"
                          cy="49"
                          r="42"
                          className="spinner-progress"
                          style={{
                            strokeDasharray: 2 * Math.PI * 42,
                            strokeDashoffset: 2 * Math.PI * 42 * (1 - progress / 100),
                          }}
                        />
                      </svg>
                      <span className="spinner-text">{progress}%</span>
                    </div>
                  </>
                )}

                {!isLoading && (
                  <div
                    className={`movie-play-overlay ${isHovered ? 'visible' : ''}`}
                    onClick={(e) => handlePlayClick(e, movie)}
                  >
                    <Play size={64} color="#fff" />
                  </div>
                )}

                <div className="movie-info">
                  <h3 className="movie-title">{movie.titulo}</h3>
                  {isHovered && (
                    <p className="movie-genres">
                      {Array.isArray(movie.generos)
                        ? movie.generos.join(', ')
                        : movie.generos || 'Gênero não informado'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilmesCartaz;
