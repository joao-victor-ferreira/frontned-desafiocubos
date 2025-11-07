import React, { useState } from "react";

import { userService } from "../../../services/user.services";
import "./FormularioRegistrar.css";
import "../../../assets/css/Global.css"

function FormularioRegistrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");
  const [carregando, setCarregando] = useState(false);

  const validarCampos = (): string | null => {
    if (!nome.trim()) {
      return "Por favor, insira seu nome";
    }

    if (nome.trim().length < 3) {
      return "Nome deve ter pelo menos 3 caracteres";
    }

    if (!email.trim()) {
      return "Por favor, insira seu e-mail";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "E-mail inválido";
    }

    if (!senha) {
      return "Por favor, insira uma senha";
    }

    if (senha.length < 6) {
      return "Senha deve ter pelo menos 6 caracteres";
    }

    if (!senhaConfirm) {
      return "Por favor, confirme sua senha";
    }

    if (senha !== senhaConfirm) {
      return "As senhas não conferem";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

    // Validar campos
    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setMensagem(erroValidacao);
      setTipoMensagem("erro");
      return;
    }

    setCarregando(true);

    try {
      const response = await userService.register(nome, email, senha);
      
      setMensagem("Conta criada com sucesso! Faça login para continuar.");
      setTipoMensagem("sucesso");

      // Limpar campos após sucesso
      setTimeout(() => {
        setNome("");
        setEmail("");
        setSenha("");
        setSenhaConfirm("");
      }, 2000);

      console.log(response);
    } catch (err: any) {
      let mensagemErro = "Erro ao criar conta. Tente novamente.";

      if (err.message) {
        if (err.message.includes("já existe") || err.message.includes("duplicado")) {
          mensagemErro = "Este e-mail já está cadastrado";
        } else if (err.message.includes("rede") || err.message.includes("network")) {
          mensagemErro = "Erro de conexão. Verifique sua internet";
        } else if (err.message.includes("inválido")) {
          mensagemErro = "Dados inválidos. Verifique as informações";
        } else {
          mensagemErro = err.message;
        }
      }

      setMensagem(mensagemErro);
      setTipoMensagem("erro");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="background-overlay" />
      <form className="registrar-form" onSubmit={handleSubmit}>
        <div className="forms-group">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            className="form-input"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={carregando}
          />
        </div>

        <div className="forms-group">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={carregando}
          />
        </div>

        <div className="forms-group">
          <label htmlFor="senha" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            className="form-input"
            placeholder="Digite sua senha (mínimo 6 caracteres)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={carregando}
          />
        </div>

        <div className="forms-group">
          <label htmlFor="senhaConfirm" className="form-label">
            Confirmação da senha
          </label>
          <input
            type="password"
            id="senhaConfirm"
            className="form-input"
            placeholder="Confirme sua senha"
            value={senhaConfirm}
            onChange={(e) => setSenhaConfirm(e.target.value)}
            disabled={carregando}
          />
        </div>

        <div className="row-options-form">
          <button 
            type="submit" 
            className="login-form-btn"
            disabled={carregando}
          >
            {carregando ? "Registrando..." : "Registrar"}
          </button>
        </div>

      </form>

      {mensagem && (
        <div className={`mensagem-feedback-flutuante ${tipoMensagem}`}>
          <span className="mensagem-icone">
            {tipoMensagem === "sucesso" ? "✓" : "⚠"}
          </span>
          <p>{mensagem}</p>
        </div>
      )}
    </div>
  );
}

export default FormularioRegistrar;