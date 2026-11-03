// src/pages/NotFound/NotFound.jsx
// src/pages/NotFound/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { FiCompass, FiHome } from "react-icons/fi";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className="not-found-page">
      {/* Background com Efeito Glow Cósmico Padrão */}
      <div className="not-found-bg-decor">
        <div className="decor-blob-nf-1"></div>
        <div className="decor-blob-nf-2"></div>
      </div>

      <div className="not-found-container">
        <div className="not-found-card-glass">
          {/* Ícone de Bússola/Espaço */}
          <div className="compass-emblem-wrapper">
            <div className="compass-glow-bg"></div>
            <div className="compass-icon-circle">
              <FiCompass className="compass-symbol" size={36} />
            </div>
          </div>

          <h1 className="not-found-code">404</h1>

          <div className="not-found-text-group">
            <h2 className="not-found-title">Página não encontrada</h2>
            <p className="not-found-msg">
              Oops! Parece que você navegou para fora do nosso universo de
              quizzes. A rota que você tentou acessar não existe.
            </p>
          </div>

          <button className="not-found-action-btn" onClick={handleVoltar}>
            <FiHome className="btn-icon" size={20} />
            <span>Voltar para área segura</span>
          </button>
        </div>
      </div>
    </main>
  );
}
