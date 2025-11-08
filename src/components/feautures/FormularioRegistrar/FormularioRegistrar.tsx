import React, { useState } from 'react';
import { userService } from '../../../services/user.services';
import { useToast } from '../../toast/useToast';
import './FormularioRegistrar.css';
import '../../../assets/css/Global.css';

// Tipagem para o formulário
interface RegisterFormData {
  nome: string;
  email: string;
  senha: string;
  senhaConfirm: string;
}

const FormularioRegistrar: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<RegisterFormData>({
    nome: '',
    email: '',
    senha: '',
    senhaConfirm: '',
  });
  const [carregando, setCarregando] = useState(false);

  // Função genérica para atualizar campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Ajuste de nome e email: tudo minúsculo e espaços viram "_"
    if (name === 'nome' || name === 'email') {
      value = value.toLowerCase().replace(/\s+/g, '_');
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validação do formulário
  const validarCampos = (): string | null => {
    const { nome, email, senha, senhaConfirm } = formData;

    if (!nome.trim()) return 'Por favor, insira seu nome.';
    if (nome.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
    if (!email.trim()) return 'Por favor, insira seu e-mail.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'E-mail inválido.';

    if (!senha) return 'Por favor, insira uma senha.';
    if (senha.length < 6) return 'A senha deve ter pelo menos 6 caracteres.';
    if (!senhaConfirm) return 'Por favor, confirme sua senha.';
    if (senha !== senhaConfirm) return 'As senhas não conferem.';

    return null;
  };

  // Envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const erroValidacao = validarCampos();
    if (erroValidacao) {
      showToast(erroValidacao, 'erro');
      return;
    }

    setCarregando(true);

    try {
      const { nome, email, senha } = formData;
      const response = await userService.register(nome, email, senha);

      showToast('Conta criada com sucesso! Faça login para continuar.', 'sucesso');

      // Resetar formulário
      setFormData({ nome: '', email: '', senha: '', senhaConfirm: '' });
    } catch (err: any) {
      let mensagemErro = 'Erro ao criar conta. Tente novamente.';

      if (err.response?.data?.message) {
        const msg = err.response.data.message.toLowerCase();
        if (msg.includes('e-mail') || msg.includes('email'))
          mensagemErro = 'Este e-mail já está cadastrado.';
        else if (msg.includes('nome')) mensagemErro = 'Este nome já está em uso.';
        else mensagemErro = err.response.data.message;
      } else if (err.message?.includes('network')) {
        mensagemErro = 'Erro de conexão. Verifique sua internet.';
      }

      showToast(mensagemErro, 'erro');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="background-overlay" />

      <form className="registrar-form" onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="forms-group">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            className="form-input"
            placeholder="Digite seu nome"
            value={formData.nome}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>

        {/* E-mail */}
        <div className="forms-group">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>

        {/* Senha */}
        <div className="forms-group">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            className="form-input"
            placeholder="Digite sua senha (mínimo 6 caracteres)"
            value={formData.senha}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>

        {/* Confirmação de Senha */}
        <div className="forms-group">
          <label htmlFor="senhaConfirm" className="form-label">
            Confirme sua senha
          </label>
          <input
            id="senhaConfirm"
            name="senhaConfirm"
            type="password"
            className="form-input"
            placeholder="Confirme sua senha"
            value={formData.senhaConfirm}
            onChange={handleChange}
            disabled={carregando}
          />
        </div>

        <div className="row-options-registerform">
          <button type="submit" className="registrar-form-btn" disabled={carregando}>
            {carregando ? <span className="spinner" aria-label="Carregando"></span> : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistrar;
