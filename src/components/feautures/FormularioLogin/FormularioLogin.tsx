import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userService } from "../../../services/user.services";
import "./FormularioLogin.css";
import "../../../assets/css/Global.css"


function FormularioLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    setTipoMensagem("");

    // Validações básicas
    if (!email.trim()) {
      setMensagem("Por favor, insira seu e-mail");
      setTipoMensagem("erro");
      return;
    }

    if (!senha.trim()) {
      setMensagem("Por favor, insira sua senha");
      setTipoMensagem("erro");
      return;
    }

    setCarregando(true);

    try {
      const response = await userService.login(email, senha);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      setMensagem("Login realizado com sucesso! Redirecionando...");
      setTipoMensagem("sucesso");

      setTimeout(() => {
        navigate("/inicio");
      }, 1000);
    } catch (err: any) {
      let mensagemErro = "Erro ao fazer login. Tente novamente.";

      if (err.message) {
        if (err.message.includes("credenciais") || err.message.includes("senha")) {
          mensagemErro = "E-mail ou senha incorretos";
        } else if (err.message.includes("rede") || err.message.includes("network")) {
          mensagemErro = "Erro de conexão. Verifique sua internet";
        } else if (err.message.includes("não encontrado")) {
          mensagemErro = "Usuário não encontrado";
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

      <form className="login-form" onSubmit={handleSubmit}>
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
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={carregando}
          />
        </div>

        <div className="row-options-form">
          <h1 className="esqueceuasenha">Esqueceu a senha?</h1>
          <button 
            type="submit" 
            className="login-form-btn"
            disabled={carregando}
          >
            {carregando ? "Entrando..." : "Entrar"}
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

export default FormularioLogin;