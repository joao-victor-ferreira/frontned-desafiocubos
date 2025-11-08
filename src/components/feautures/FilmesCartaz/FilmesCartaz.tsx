// components/FilmesCartaz/FilmesCartaz.tsx
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FilmesCartaz.css';
import { filmeService, Movie } from '../../../services/filme.service';

interface FilmesCartazProps {
  searchTerm: string;
}

const FilmesCartaz: React.FC<FilmesCartazProps> = ({ searchTerm }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [watchingMovies, setWatchingMovies] = useState<{ [key: string]: number }>({});
  const [loadingMovies, setLoadingMovies] = useState<{ [key: string]: boolean }>({});
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const filmes = await filmeService.listarFilmes(); // ✅ já retorna Movie[]
        setMovies(filmes);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmes();
  }, []);

  // Filtra os filmes pelo searchTerm
  const filteredMovies = movies.filter(movie =>
    movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading-text">Carregando filmes...</div>;
  if (filteredMovies.length === 0)
    return <div className="loading-text">Nenhum filme encontrado 😕</div>;

  return (
    <div className="movies-section">
      <div className="movies-grid">
        {filteredMovies.map(movie => {
          const movieId = movie.id.toString();
          const isHovered = hoveredCard === movieId;
          const isLoading = loadingMovies[movieId];
          const progress = watchingMovies[movieId] || 0;

          const handlePlayClick = () => {
            if (isLoading) return;
            setLoadingMovies(prev => ({ ...prev, [movieId]: true }));
            let prog = 0;
            const interval = setInterval(() => {
              prog += 5;
              if (prog >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                  setLoadingMovies(prev => ({ ...prev, [movieId]: false }));
                  setWatchingMovies(prev => ({ ...prev, [movieId]: 0 }));
                  navigate(`/filmesdetalhes/${movieId}`, { state: movie });
                }, 200);
              } else {
                setWatchingMovies(prev => ({ ...prev, [movieId]: prog }));
              }
            }, 100);
          };

          return (
            <div
              key={movieId}
              className={`movie-card ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(movieId)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="movie-card-inner">
                <img
                  src={movie.bannerUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
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
                    onClick={handlePlayClick}
                  >
                    <Play size={64} color="#fff" />
                  </div>
                )}

                <div className="movie-info">
                  <h3 className="movie-title">{movie.titulo}</h3>
                  {isHovered && (
                    <p className="movie-genres">
                      {Array.isArray(movie.genero)
                        ? movie.genero.join(', ')
                        : movie.genero || 'Gênero não informado'}
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
