// src/pages/Cadastro/Cadastro.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiKey,
  FiUser,
  FiAtSign,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { alertaSucesso, alertaErro, alertaAviso } from "../../utils/alertas";
import api from "../../services/api";
import { obterMensagemErro } from "../../utils/validacao";
import "./Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    nome: "",
    nomeUsuario: "",
    email: "",
    senha: "",
  });
  const [erros, setErros] = useState({
    nome: "",
    nomeUsuario: "",
    email: "",
    senha: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [termosAceitos, setTermosAceitos] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
    if (erros[name]) setErros({ ...erros, [name]: "" });
  };

  const handleBlur = (e) => {
    const { name, validity } = e.target;
    setErros({ ...erros, [name]: obterMensagemErro(name, validity) });
  };

  const gerarTagAleatoria = () => {
    const tags = [
      "cyberspark2",
      "pixelknight1",
      "quantummind01",
      "nebulaquiz1",
      "chronodev1",
    ];
    const tag =
      tags[Math.floor(Math.random() * tags.length)] +
      Math.floor(Math.random() * 100);
    setDados({ ...dados, nomeUsuario: tag });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!termosAceitos) {
      alertaErro("Aceite os Termos de Uso para continuar.");
      return;
    }

    if (
      erros.nome ||
      erros.nomeUsuario ||
      erros.email ||
      erros.senha ||
      !dados.nome ||
      !dados.nomeUsuario ||
      !dados.email ||
      !dados.senha
    ) {
      alertaErro("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setCarregando(true);

    try {
      const usuario = {
        nome: dados.nome,
        nomeUsuario: dados.nomeUsuario,
        email: dados.email,
        senha: dados.senha,
      };

      const response = await api.post("/auth/cadastro", usuario);

      if (response.status === 201) {
        alertaSucesso("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
      if (error.response && error.response.status === 409) {
        alertaErro("Email ou nome de usuário já está em uso.");
      } else {
        alertaErro("Erro de conexão com o servidor. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-bg-decor">
        <div className="decor-blob-reg-1"></div>
        <div className="decor-blob-reg-2"></div>
      </div>

      <header className="register-header">
        <div className="register-header-inner">
          <div className="register-brand" onClick={() => navigate("/login")}>
            <button type="button" className="back-btn" aria-label="Voltar">
              <FiArrowLeft size={20} />
            </button>
            <span className="brand-title">QUIZZY</span>
          </div>
        </div>
      </header>

      <div className="register-container">
        <div className="register-hero">
          <div className="fire-icon-wrapper">
            <div className="fire-glow"></div>
            <div className="fire-circle">🔥</div>
          </div>
          <h1 className="register-title">
            Junte-se ao <span className="gradient-text">Quizzy</span>
          </h1>
          <p className="register-subtitle">
            Teste seus conhecimentos e divirta-se!
          </p>
        </div>

        <div className="social-grid">
          <button
            type="button"
            className="social-btn"
            onClick={() => alertaAviso("Login social em breve!")}
          >
            <FaGoogle className="social-icon google-color" /> Google
          </button>
          <button
            type="button"
            className="social-btn"
            onClick={() => alertaAviso("Login social em breve!")}
          >
            <FaGithub className="social-icon" /> GitHub
          </button>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">OU COM SEU E-MAIL</span>
        </div>

        <form className="register-form" onSubmit={handleCadastro}>
          <div className="input-group">
            <label>NOME COMPLETO</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <FiUser size={20} />
              </span>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={dados.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className="custom-input"
                required
              />
            </div>
            {erros.nome && <span className="error-text">{erros.nome}</span>}
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>NOME DE USUÁRIO</label>
              <span className="randomize-btn" onClick={gerarTagAleatoria}>
                🎲 Gerar Nome de Usuário
              </span>
            </div>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <FiAtSign size={20} />
              </span>
              <input
                type="text"
                name="nomeUsuario"
                placeholder="cyber_spark"
                value={dados.nomeUsuario}
                onChange={handleChange}
                onBlur={handleBlur}
                className="custom-input"
                required
              />
            </div>
            <p className="input-hint">
              Este nome será utilizado para entrar na sua conta.
            </p>
            {erros.nomeUsuario && (
              <span className="error-text">{erros.nomeUsuario}</span>
            )}
          </div>

          <div className="input-group">
            <label>E-MAIL</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <FiMail size={20} />
              </span>
              <input
                type="email"
                name="email"
                placeholder="voce@exemplo.com"
                value={dados.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="custom-input"
                required
              />
            </div>
            {erros.email && <span className="error-text">{erros.email}</span>}
          </div>

          <div className="input-group">
            <div className="label-row">
              <label>SENHA</label>
            </div>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <FiKey size={20} />
              </span>
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="Crie uma senha forte"
                value={dados.senha}
                onChange={handleChange}
                onBlur={handleBlur}
                className="custom-input password-input"
                minLength="6"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {erros.senha && <span className="error-text">{erros.senha}</span>}
          </div>

          <label className="terms-checkbox-label">
            <input
              type="checkbox"
              className="terms-checkbox"
              checked={termosAceitos}
              onChange={(e) => setTermosAceitos(e.target.checked)}
            />
            <span className="terms-text">
              Concordo com os <span className="link">Termos de Uso</span> e{" "}
              <span className="link">Políticas de Privacidade</span> da Arena
              Quizzy.
            </span>
          </label>

          <button
            type="submit"
            disabled={carregando}
            className="submit-register-btn"
          >
            {carregando ? (
              <>
                <span className="spin-dot"></span>
                <span>Forjando Perfil...</span>
              </>
            ) : (
              <>
                <span>Criar Conta</span>
                <span className="rocket-emoji">🚀</span>
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <span>Já tem uma conta?</span>
          <button
            type="button"
            className="login-link-btn"
            onClick={() => navigate("/login")}
          >
            Entrar na sua conta
          </button>
        </div>
      </div>
    </main>
  );
}
