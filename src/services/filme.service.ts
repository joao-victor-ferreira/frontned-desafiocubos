// services/filme.service.ts
import { apiClient } from '../api/apiClient';

export interface Movie {
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

interface ListarFilmesResponse {
  filmes: Movie[];
}

export const filmeService = {
  async listarFilmes(): Promise<Movie[]> {
    const data = await apiClient.get<ListarFilmesResponse>('/api/filmes');
    return data.filmes;
  },

  async criarFilme(filme: Omit<Movie, 'id'>, token: string): Promise<Movie> {
    return apiClient.post('/api/filmes', filme, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async atualizarFilme(id: number, filme: Omit<Movie, 'id'>, token: string): Promise<Movie> {
    const { id: _, ...body } = filme;
    const { data } = await apiClient.put<Movie>(`/api/filmes/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  async deletarFilme(id: number, token: string): Promise<{ message: string }> {
    return apiClient.delete(`/api/filmes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async getFilmePorId(id: number): Promise<Movie> {
    return apiClient.get(`/api/filmes/${id}`);
  },
};
