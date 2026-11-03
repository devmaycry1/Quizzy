// src/pages/Splash/Splash.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiZap } from "react-icons/fi";
import "./Splash.css";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // 3 segundos de transição imersiva antes de ir para o login
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="splash-page">
      {/* Background com Glows e Partículas */}
      <div className="splash-bg-decor">
        <div className="decor-blob-1"></div>
        <div className="decor-blob-2"></div>
        <div className="decor-blob-3"></div>
      </div>

      <div className="splash-content-wrapper">
        <div className="engine-version-pill">
          <span className="ping-dot-splash"></span>
        </div>

        {/* Emblema Central Luminoso */}
        <div className="splash-emblem-container">
          <div className="splash-emblem-glow"></div>
          <div className="splash-emblem-circle">
            <div className="splash-emblem-core">
              <FiZap className="splash-bolt-icon" size={48} />
            </div>
          </div>
          <div className="splash-pro-badge">
            <FiZap size={12} />
            <span>PRO</span>
          </div>
        </div>

        {/* Títulos e Slogans */}
        <div className="splash-titles-group">
          <h1 className="splash-main-logo">QUIZZY</h1>
          <p className="splash-subtitle">
            Onde aprender algo novo é divertido
          </p>
          <p className="splash-description">O Hub do Conhecimento</p>
        </div>

        {/* Barra de Progresso e Status de Carregamento */}
        <div className="splash-loading-box">
          <div className="splash-loading-info">
            <span className="splash-status-text">
              Sincronizando os quizzes...
            </span>
          </div>
          <div className="splash-progress-track">
            <div className="splash-progress-bar"></div>
          </div>
        </div>

        {/* Rodapé da Splash */}
        <div className="splash-footer">
          <div className="splash-footer-powered">
            <span>Powered by Quizzy Engine</span>
          </div>
          <p className="splash-footer-desc">
            Conectando
          </p>
        </div>
      </div>
    </main>
  );
}
