import React from 'react';
import './SinopseFilmes.css';

interface SinopseFilmesProps {
  sinopse: string;
  generos: string[];
  lancamento: string;
  duracao: number;
  situacao: string;
  idioma: string;
  orcamento: number;
  receita: number;
  lucro: number;
}

const SinopseFilmes: React.FC<SinopseFilmesProps> = ({
  sinopse,
  generos,
  lancamento,
  duracao,
  situacao,
  idioma,
  orcamento,
  receita,
  lucro,
}) => {
  const formatDuracao = (minutos: number) => {
    const h = Math.floor(minutos / 60);
    const m = minutos % 60;
    return `${h}h ${m}m`;
  };

  const formatMoney = (valor: number) => {
    if (valor >= 1_000_000) return `${Math.round(valor / 1_000_000)}M`;
    if (valor >= 1_000) return `${Math.round(valor / 1_000)}K`;
    return `${valor}`;
  };

  return (
    <div className="sinopse-filmes-container">
      <div className="div1-sinopse-filmes">
        <div className="div-sinopse-filmes">
          <h2 className="h1-div-sinopse-filmes">SINOPSE</h2>
          <p className="h2-div-sinopse-filmes">{sinopse}</p>
        </div>

        <div className="div-generos-filmes">
          <h2 className="h1-div-sinopse-filmes">Gêneros</h2>
          <div className="row-generos-tipos">
            {generos.map((g, index) => (
              <span key={index} className="div-generos-tipos">
                {g.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="div2-sinopse-filmes">
        <div className="info-row">
          <div className="info-col">
            <div className="info-card1">
              <div className="info-label">Lançamento</div>
              <div className="info-value">{new Date(lancamento).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="info-col">
            <div className="info-card1">
              <div className="info-label">Duração</div>
              <div className="info-value">{formatDuracao(duracao)}</div>
            </div>
          </div>
        </div>

        <div className="info-row">
          <div className="info-col">
            <div className="info-card1">
              <div className="info-label">Situação</div>
              <div className="info-value">{situacao}</div>
            </div>
          </div>
          <div className="info-col">
            <div className="info-card1">
              <div className="info-label">Idioma</div>
              <div className="info-value">{idioma}</div>
            </div>
          </div>
        </div>

        <div className="info-row">
          <div className="info-col">
            <div className="info-card">
              <div className="info-label">Orçamento</div>
              <div className="info-value">{formatMoney(orcamento)}</div>
            </div>
          </div>
          <div className="info-col">
            <div className="info-card">
              <div className="info-label">Receita</div>
              <div className="info-value">{formatMoney(receita)}</div>
            </div>
          </div>
          <div className="info-col">
            <div className="info-card">
              <div className="info-label">Lucro</div>
              <div className="info-value">{formatMoney(lucro)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinopseFilmes;
