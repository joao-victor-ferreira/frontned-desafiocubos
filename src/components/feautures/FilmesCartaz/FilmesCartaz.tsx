import React, { useState } from 'react';
import { Play } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import './FilmesCartaz.css';

interface Movie {
  id: number;
  title: string;
  genres: string;
  image: string;
}

const FilmesCartaz: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [watchingMovies, setWatchingMovies] = useState<{ [key: number]: number }>({});
  const [loadingMovies, setLoadingMovies] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  
 const movies: Movie[] = [
    { id: 1, title: 'BUMBLEBEE', genres: 'Ação, Aventura, Ficção Científica', image: 'https://image.tmdb.org/t/p/w500/fw02ONlDhrYjTSZV8XO6hhU3ds3.jpg' },
    { id: 2, title: 'CAPITÃ MARVEL', genres: 'Ação, Aventura, Ficção Científica', image: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg' },
    { id: 3, title: 'ALITA: ANJO DE COMBATE', genres: 'Ação, Aventura, Ficção Científica', image: 'https://image.tmdb.org/t/p/w500/xRWht48C2V8XNfzvPehyClOvDni.jpg' },
    { id: 4, title: 'COMO TREINAR O SEU DRAGÃO 3', genres: 'Animação, Aventura, Família', image: 'https://image.tmdb.org/t/p/w500/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg' },
    { id: 5, title: 'AQUAMAN', genres: 'Ação, Aventura, Fantasia', image: 'https://image.tmdb.org/t/p/w500/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg' },
    { id: 6, title: 'O MENINO QUE QUERIA SER REI', genres: 'Ação, Aventura, Família, Fantasia', image: 'https://image.tmdb.org/t/p/w500/kBuvLX6zynQP0sjyqbXV4jNaZ4E.jpg' },
    { id: 7, title: 'MEGARRROMÂNTICO', genres: 'Comédia, Romance', image: 'https://image.tmdb.org/t/p/w500/4zfRpFxZDZX98rJsGChBo5wZADQ.jpg' },
    { id: 8, title: 'UMA NOVA CHANCE', genres: 'Comédia, Drama, Romance', image: 'https://image.tmdb.org/t/p/w500/6PQyCsluGYEPCTnlM9KxVs6GIuv.jpg' },
    { id: 9, title: 'HOMEM-ARANHA NO ARANHAVERSO', genres: 'Ação, Animação, Ficção Científica', image: 'https://image.tmdb.org/t/p/w500/laMM4lpQSh5z6KIBPwWogkjzBVQ.jpg' },
    { id: 10, title: 'MÁQUINAS MORTAIS', genres: 'Aventura, Ficção Científica', image: 'https://image.tmdb.org/t/p/w500/gLhYg9NIvIPKVRTtvzCWnp1qJWG.jpg' }
  ];

  const handlePlayClick = (e: React.MouseEvent, movie: Movie) => {
    e.stopPropagation();
    if (loadingMovies[movie.id]) return;

    setLoadingMovies(prev => ({ ...prev, [movie.id]: true }));
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoadingMovies(prev => ({ ...prev, [movie.id]: false }));
          setWatchingMovies(prev => ({ ...prev, [movie.id]: 0 }));

          // 👉 Envia para a página de detalhes
          navigate(`/filmesdetalhes/${movie.id}`, { state: movie });
        }, 200);
      } else {
        setWatchingMovies(prev => ({ ...prev, [movie.id]: progress }));
      }
    }, 100);
  };

  return (
    <div className="movies-section">
      <div className="movies-grid">
        {movies.map((movie) => {
          const isHovered = hoveredCard === movie.id;
          const isLoading = loadingMovies[movie.id];
          const progress = watchingMovies[movie.id] || 0;

          return (
            <div
              key={movie.id}
              className={`movie-card ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(movie.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="movie-card-inner">
                <img src={movie.image} alt={movie.title} className="movie-image" />

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
                  <h3 className="movie-title">{movie.title}</h3>
                  {isHovered && <p className="movie-genres">{movie.genres}</p>}
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
