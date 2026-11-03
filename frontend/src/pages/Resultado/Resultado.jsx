// src/pages/Resultado/Resultado.jsx
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaArrowLeft,
  FaRedo,
  FaAward,
  FaCheckCircle,
  FaPercent,
} from "react-icons/fa";
import api from "../../services/api";
import "./Resultado.css";

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();
  const gravouHistorico = useRef(false);

  const { acertos, totalPerguntas, nomeCategoria, nomeUsuario } =
    location.state || {
      acertos: 0,
      totalPerguntas: 10,
      nomeCategoria: "Tema Aleatório",
      nomeUsuario: "Usuário",
    };

  useEffect(() => {
    if (!location.state) {
      navigate("/home");
      return;
    }

    const salvarPartida = async () => {
      if (gravouHistorico.current) return;

      const usuarioLogadoStr = localStorage.getItem("usuarioLogado");
      if (!usuarioLogadoStr) return;

      try {
        const payload = {
          acertos: acertos,
          totalPerguntas: totalPerguntas,
          tema: nomeCategoria,
        };

        // Rota relativa considerando que o baseURL do Axios já possui /api/v1
        await api.post("/quizzy/historico", payload);
        gravouHistorico.current = true;
      } catch (error) {
        console.error("Erro ao salvar o histórico da partida:", error);
      }
    };

    salvarPartida();
  }, [location.state, navigate, acertos, totalPerguntas, nomeCategoria]);

  const porcentagem =
    totalPerguntas > 0 ? Math.round((acertos / totalPerguntas) * 100) : 0;

  // Lógica Dinâmica de Mensagem, Ícone e Cores baseada na Porcentagem
  const obterDadosDesempenho = () => {
    if (porcentagem === 100) {
      return {
        titulo: "Perfeição Absoluta!",
        mensagem:
          "Desempenho impecável! Você dominou todas as questões da arena.",
        icone: <FaTrophy className="result-main-icon gold-glow" />,
        classeBadge: "badge-perfeito",
        classeTexto: "text-gold",
      };
    } else if (porcentagem >= 80) {
      return {
        titulo: "Excelente Desempenho!",
        mensagem:
          "Impressionante! Você demonstrou alto conhecimento neste desafio.",
        icone: <FaAward className="result-main-icon gold" />,
        classeBadge: "badge-excelente",
        classeTexto: "text-gold",
      };
    } else if (porcentagem >= 60) {
      return {
        titulo: "Muito Bom!",
        mensagem:
          "Bom trabalho! Ficou acima da média e teve um ótimo resultado.",
        icone: <FaMedal className="result-main-icon silver" />,
        classeBadge: "badge-bom",
        classeTexto: "text-silver",
      };
    } else if (porcentagem >= 40) {
      return {
        titulo: "Bom Esforço!",
        mensagem:
          "Você está no caminho certo. Continue praticando para evoluir!",
        icone: <FaStar className="result-main-icon bronze" />,
        classeBadge: "badge-regular",
        classeTexto: "text-bronze",
      };
    } else {
      return {
        titulo: "Não Desanime!",
        mensagem:
          "Toda derrota é aprendizado. Revise o conteúdo e tente novamente!",
        icone: <FaRedo className="result-main-icon try-again" />,
        classeBadge: "badge-baixo",
        classeTexto: "text-purple",
      };
    }
  };

  const desempenho = obterDadosDesempenho();

  return (
    <main className="resultado-page-stitch">
      {/* Background Cósmico Luminoso */}
      <div className="resultado-bg-decor">
        <div className="resultado-blob-1"></div>
        <div className="resultado-blob-2"></div>
      </div>

      <div className="resultado-container">
        {/* Banner Superior */}
        <div className="resultado-header-badge">
          <span className={`status-pill ${desempenho.classeBadge}`}>
            Partida Finalizada
          </span>
          <h1 className="resultado-title">{desempenho.titulo}</h1>
          <p className="resultado-subtitle">
            Parabéns <strong className="user-highlight">@{nomeUsuario}</strong>!
            Você concluiu o quiz de{" "}
            <span className="category-highlight">{nomeCategoria}</span>.
          </p>
        </div>

        {/* Cartão de Resultados (Glassmorfismo) */}
        <div className="resultado-card glass-panel">
          <div className="icon-hero-wrapper">{desempenho.icone}</div>

          <p className="desempenho-desc-text">{desempenho.mensagem}</p>

          <div className="stats-cards-grid">
            <div className="stat-box-card">
              <div className="stat-icon-wrapper text-cyan">
                <FaCheckCircle />
              </div>
              <div className="stat-text-info">
                <span className="stat-card-label">Acertos</span>
                <span className="stat-card-value">
                  {acertos} / {totalPerguntas}
                </span>
              </div>
            </div>

            <div className="stat-box-card">
              <div className="stat-icon-wrapper text-purple">
                <FaPercent />
              </div>
              <div className="stat-text-info">
                <span className="stat-card-label">Aproveitamento</span>
                <span className={`stat-card-value ${desempenho.classeTexto}`}>
                  {porcentagem}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Ação */}
        <button
          className="resultado-home-btn"
          onClick={() => navigate("/home")}
        >
          <FaArrowLeft className="btn-icon" />
          <span>Voltar ao Painel</span>
        </button>
      </div>
    </main>
  );
}
