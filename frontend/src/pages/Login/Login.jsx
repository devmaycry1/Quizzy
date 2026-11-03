// src/pages/Login/Login.jsx
// src/pages/Login/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiKey,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheck,
  FiZap,
} from "react-icons/fi";
import { alertaSucesso, alertaErro, alertaAviso } from "../../utils/alertas";
import { obterMensagemErro } from "../../utils/validacao";
import api from "../../services/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [dados, setDados] = useState({ nomeUsuario: "", senha: "" });
  const [erros, setErros] = useState({ nomeUsuario: "", senha: "" });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });

    if (erros[name]) {
      setErros({ ...erros, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name, validity } = e.target;
    const mensagemErro = obterMensagemErro(name, validity);
    setErros({ ...erros, [name]: mensagemErro });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      erros.nomeUsuario ||
      erros.senha ||
      !dados.nomeUsuario ||
      !dados.senha
    ) {
      alertaErro("Por favor, preencha os campos corretamente.");
      return;
    }

    setCarregando(true);

    try {
      const response = await api.post("/auth/login", {
        nomeUsuario: dados.nomeUsuario,
        senha: dados.senha,
      });
      const authHeader = response.headers["authorization"];

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);

        localStorage.setItem("token", token);
        const userResponse = await api.get("/auth/listar-dados");
        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify(userResponse.data),
        );

        alertaSucesso("Bem-vindo(a) de volta ao Quizzy");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        alertaErro("Erro ao validar o token de acesso.");
      }
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        alertaErro("Nome de usuário ou senha incorretos.");
      } else {
        alertaErro("Erro de ligação. Verifique se a API está online.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-bg-decor">
        <div className="decor-blob-1"></div>
        <div className="decor-blob-2"></div>
      </div>

      <header className="login-header">
        <div className="login-header-inner">
          <div className="login-brand" onClick={() => navigate("/")}>
            <span className="brand-title">QUIZZY</span>
          </div>
        </div>
      </header>

      <div className="login-container">
        <div className="login-hero-section">
          <div className="bolt-emblem-wrapper">
            <div className="bolt-glow-bg"></div>
            <div className="bolt-icon-circle">
              <FiZap className="bolt-symbol" size={32} />
            </div>
          </div>

          <h1 className="login-main-heading">
            Entrar no <span className="gradient-text">Quizzy</span>
          </h1>
          <p className="login-subtitle">
            Testes seus conhecimentos, crie seus próprios quizzes e aprenda algo novo.
          </p>
        </div>

        <div className="login-card-glass">
          <form className="form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Nome de Usuário</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <FiUser size={20} />
                </span>
                <input
                  type="text"
                  name="nomeUsuario"
                  placeholder="campeao@quizzy.app"
                  value={dados.nomeUsuario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="custom-text-input"
                />
              </div>
              {erros.nomeUsuario && (
                <span className="error-text">{erros.nomeUsuario}</span>
              )}
            </div>

            <div className="input-group">
              <label>Sua Senha</label>
              <div className="input-wrapper">
                <span className="input-icon-left">
                  <FiKey size={20} />
                </span>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  placeholder="••••••••••••"
                  value={dados.senha}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="custom-text-input password-input"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="password-toggle-btn"
                  aria-label="Mostrar ou ocultar palavra-passe"
                >
                  {mostrarSenha ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {erros.senha && <span className="error-text">{erros.senha}</span>}
            </div>

            <div className="login-actions-row">
              <label className="remember-me-label">
                <input
                  type="checkbox"
                  defaultChecked
                  className="hidden-checkbox"
                />
                <div className="checkbox-custom">
                  <FiCheck className="check-icon" size={14} />
                </div>
                <span>Lembrar-me</span>
              </label>
              <span
                className="forgot-password-link"
                onClick={() =>
                  alertaAviso("Funcionalidade de recuperação em breve!")
                }
              >
                Esqueceu a palavra-passe?
              </span>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="submit-arena-btn"
            >
              {carregando ? (
                <>
                  <span className="spin-dot"></span>
                  <span>A ligar...</span>
                </>
              ) : (
                <>
                  <span>Entrar na Conta</span>
                  <FiArrowRight className="arrow-icon" size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="login-footer-section">
          <p className="footer-signup-text">
            Não tem uma conta?{" "}
            <span className="signup-link" onClick={() => navigate("/cadastro")}>
              Registre-se grátis
            </span>
          </p>
          <p className="footer-terms-text">
            Ao continuar, concorda com os nossos{" "}
            <span className="term-link">Termos de Serviço</span> e{" "}
            <span className="term-link">Política de Privacidade</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
