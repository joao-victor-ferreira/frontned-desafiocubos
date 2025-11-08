import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userService } from '../../../services/user.services';
import { useToast } from '../../toast/useToast';
import './FormularioLogin.css';
import '../../../assets/css/Global.css';

// Tipagem para o formulário
interface LoginFormData {
  email: string;
  senha: string;
}

const FormularioLogin: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Estado do formulário
  const [formData, setFormData] = useState<LoginFormData>({ email: '', senha: '' });
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, senha } = formData;

    if (!email.trim()) {
      showToast('Por favor, insira seu e-mail', 'erro');
      return;
    }

    if (!senha.trim()) {
      showToast('Por favor, insira sua senha', 'erro');
      return;
    }

    setCarregando(true);

    try {
      const response = await userService.login(email, senha);

      // Salva token e usuário no localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      showToast('Login realizado com sucesso! Redirecionando...', 'sucesso');

      navigate('/inicio');
    } catch (err: any) {
      let mensagemErro = 'Erro ao fazer login. Tente novamente.';

      if (err.message?.includes('senha')) {
        mensagemErro = 'E-mail ou senha incorretos.';
      } else if (err.message?.includes('rede')) {
        mensagemErro = 'Erro de conexão. Verifique sua internet.';
      } else if (err.message?.includes('não encontrado')) {
        mensagemErro = 'Usuário não encontrado.';
      }

      showToast(mensagemErro, 'erro');
    } finally {
      setCarregando(false);
    }
  };

  const handleForgotPassword = () => {
    // Redireciona para a página de recuperação de senha
    navigate('/recuperar-senha');
  };

  return (
    <div className="login-form-container">
      <div className="background-overlay" />

      <form className="login-form" onSubmit={handleLogin}>
        {/* Campo E-mail */}
        <div className="forms-group">
          <label htmlFor="email" className="form-label">
            Nome/E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>

        {/* Campo Senha */}
        <div className="forms-group">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            className="form-input"
            placeholder="Digite sua senha"
            value={formData.senha}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>

        {/* Linha de opções */}
        <div className="row-options-form">
          <button
            type="button"
            className="esqueceuasenha"
            onClick={handleForgotPassword}
            disabled={carregando}
          >
            Esqueceu a senha?
          </button>

          <button type="submit" className="login-form-btn" disabled={carregando}>
            {carregando ? <span className="spinner" aria-label="Carregando"></span> : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioLogin;
