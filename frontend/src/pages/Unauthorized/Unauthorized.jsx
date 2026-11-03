// src/pages/Unauthorized/Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { FiLock, FiArrowRight } from "react-icons/fi";
import "./Unauthorized.css";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <main className="unauthorized-page">
      {/* Background com Efeito Glow (Tons de Alerta/Erro) */}
      <div className="error-bg-decor">
        <div className="decor-blob-error-1"></div>
        <div className="decor-blob-error-2"></div>
      </div>

      <div className="error-container">
        <div className="error-card-glass">
          {/* Ícone de Bloqueio com Glow Vermelho */}
          <div className="lock-emblem-wrapper">
            <div className="lock-glow-bg"></div>
            <div className="lock-icon-circle">
              <FiLock className="lock-symbol" size={36} />
            </div>
          </div>

          <h1 className="error-code">401</h1>

          <div className="error-text-group">
            <h2 className="error-title">Acesso Restrito</h2>
            <p className="error-msg">
              Parece que você não tem permissão para acessar esta arena. Por
              favor, faça o login ou cadastre-se para jogar o Quizzy!
            </p>
          </div>

          <button
            className="error-action-btn"
            onClick={() => navigate("/login")}
          >
            <span>Ir para o Login</span>
            <FiArrowRight className="btn-icon" size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
