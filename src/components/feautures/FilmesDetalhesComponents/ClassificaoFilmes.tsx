import React from 'react';
import './ClassificaoFilmes.css';

interface ClassificaoFilmesProps {
  classificacao: string;
  votos: number;
  subtitulo: string;
}

const ClassificaoFilmes: React.FC<ClassificaoFilmesProps> = ({
  classificacao,
  votos,
  subtitulo,
}) => {
  return (
    <div className="classificacao-filmes">
      <div className="classificacao-filmes-titulo">
        <h2 className="h1-classificacao-filmes-subtitulo">{subtitulo}</h2>
      </div>

      <div className="div-buttons-classificacaofilmes">
        <div className="indicativa-classificacao">
          <h3 className="h1-indicativa-classificacao-titulo">CLASSIFICAÇÃO INDICATIVA</h3>
          <h4 className="h1-indicativa-classificacao-subtitulo">{classificacao}</h4>
        </div>

        <div className="votos-classificacao">
          <h3 className="h1-votos-classificacao-titulo">VOTOS</h3>
          <h4 className="h1-votos-classificacao-subtitulo">{votos}</h4>
        </div>

        <button className="buttons-classificacaofilmes-editar">Editar</button>
      </div>
    </div>
  );
};

export default ClassificaoFilmes;
