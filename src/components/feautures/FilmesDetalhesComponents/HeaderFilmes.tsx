import React from 'react';
import './HeaderFilmes.css';
import { filmeService } from '../../../services/filme.service';
import { useToast } from '../../toast/useToast';
import { useNavigate } from 'react-router-dom';

interface HeaderFilmesProps {
  id: number;
  image: string;
  titulo: string;
  tituloOriginal: string;
  onEdit?: () => void; // callback para abrir o drawer de edição
}

const HeaderFilmes: React.FC<HeaderFilmesProps> = ({
  id,
  image,
  titulo,
  tituloOriginal,
  onEdit,
}) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este filme?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado. Faça login novamente.');

      await filmeService.deletarFilme(id, token);
      showToast('Filme deletado com sucesso!', 'sucesso');
      navigate('/inicio'); // volta para a lista de filmes
    } catch (err: any) {
      showToast(err.message || 'Erro ao deletar o filme', 'erro');
    }
  };

  return (
    <div className="header-filmes">
      <div className="header-filmes-titulo">
        <h1 className="h1-header-filmes-titulo">{titulo}</h1>
        <h2 className="h1-header-filmes-subtitulo">Título original: {tituloOriginal}</h2>
      </div>

      <div className="row-buttons-filmes">
        <button className="buttons-filmes-deletar" onClick={handleDelete}>
          Deletar
        </button>
        <button className="buttons-filmes-editar" onClick={onEdit}>
          Editar
        </button>
      </div>

      <img className="bannerFilmes" src={image} alt={`Banner do filme ${titulo}`} />
    </div>
  );
};

export default HeaderFilmes;
