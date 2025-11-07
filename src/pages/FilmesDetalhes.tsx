import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';


import '../assets/css/Global.css';
import Header from '../components/layout/Header/Header';
import HeaderFilmes from '../components/feautures/FilmesDetalhesComponents/HeaderFilmes';
import ClassificaoFilmes from '../components/feautures/FilmesDetalhesComponents/ClassificaoFilmes';
import Footer from '../components/layout/Footer/Footer';
import SinopseFilmes from '../components/feautures/FilmesDetalhesComponents/SinopseFilmes';

const FilmesDetalhes: React.FC = () => {
  const { state } = useLocation() as { 
    state: { title: string; image: string; genres: string[] } 
  };
  const navigate = useNavigate();
  console.log(state);
  
  return (
    <div className="details-container">
      <Header />
      <div className='background-overlay' />
      <div className='container-filmecartaz'>

        <div className='moviedetails-filmes-detalhes'>
          <HeaderFilmes image={state.image}  />
          <ClassificaoFilmes />
          <SinopseFilmes />
        </div>
        
        <div className="trailer-section" style={{ width: '90%', marginBottom: 20}}>
          <h2  className='h1-trailer-section'>
            Trailer
          </h2>
          <div >
            <iframe
              style={{
                borderRadius: 4,
                top: 0,
                left: 0,
                width: '100%',
                height: 556
              }}
              src="https://www.youtube.com/embed/VIDEO_ID_AQUI"
              title="Trailer do Filme"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default FilmesDetalhes;