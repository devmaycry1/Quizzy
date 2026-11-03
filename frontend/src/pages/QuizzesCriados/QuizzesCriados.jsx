// src/pages/QuizzesCriados/QuizzesCriados.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlay,
  FaCalendarAlt,
  FaQuestionCircle,
  FaLayerGroup,
} from "react-icons/fa";
import api from "../../services/api";
import "./QuizzesCriados.css";

export default function QuizzesCriados() {
  const navigate = useNavigate();
  const [meusQuizzes, setMeusQuizzes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarMeusQuizzes = async () => {
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

      if (!usuarioLogado) {
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/quizzy/quiz", {
          params: {
            autorID: usuarioLogado.usuarioID || usuarioLogado.id,
          },
        });
        setMeusQuizzes(response.data);
      } catch (error) {
        console.error("Erro ao buscar quizzes:", error);
        if (error.response && error.response.status === 401) {
          alert("A sua sessão expirou. Inicie sessão novamente.");
          navigate("/login");
        }
      } finally {
        setCarregando(false);
      }
    };

    buscarMeusQuizzes();
  }, [navigate]);

  return (
    <main className="meus-quizzes-layout">
      {/* Elementos de fundo atmosféricos (glows) */}
      <div className="perfil-bg-glow glow-1"></div>
      <div className="perfil-bg-glow glow-2"></div>

      {/* Cabeçalho Fixo */}
      <header className="perfil-topbar">
        <div className="perfil-topbar-content">
          <button
            onClick={() => navigate("/home")}
            className="perfil-back-btn"
            title="Voltar ao Início"
          >
            <FaArrowLeft />
          </button>
          <span className="perfil-logo-text">Quizzy</span>
          <span className="perfil-badge-tag">Meus Quizzes</span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="meus-quizzes-main-content">
        <div className="meus-quizzes-wrapper glass-panel">
          <div className="meus-header">
            <div className="header-title-box">
              <h2>Quizzes Criados por Mim</h2>
              <p>Gerencie e jogue nas suas próprias arenas personalizadas</p>
            </div>
            <div className="header-icon-badge">
              <FaLayerGroup />
            </div>
          </div>

          {carregando ? (
            <div className="loading-state">
              <p>Buscando seus quizzes no espaço...</p>
            </div>
          ) : meusQuizzes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛸</div>
              <p>Você ainda não criou nenhum quiz personalizado.</p>
              <button
                className="btn-create-first"
                onClick={() => navigate("/criar-quiz")}
              >
                Criar meu primeiro Quiz!
              </button>
            </div>
          ) : (
            <div className="quizzes-grid">
              {meusQuizzes.map((quiz) => (
                <div key={quiz.quizID || quiz.id} className="quiz-card">
                  <div className="card-top-content">
                    <span className="badge-custom-tag">CUSTOM</span>
                    <h3>{quiz.titulo}</h3>
                    {quiz.descricao && (
                      <p className="quiz-desc">{quiz.descricao}</p>
                    )}
                  </div>

                  <div className="quiz-card-bottom">
                    <div className="quiz-meta">
                      <span>
                        <FaQuestionCircle /> {quiz.perguntas?.length || 0} Qs
                      </span>
                      <span>
                        <FaCalendarAlt />{" "}
                        {quiz.dataCriacao
                          ? new Date(quiz.dataCriacao).toLocaleDateString(
                              "pt-PT",
                            )
                          : "N/A"}
                      </span>
                    </div>

                    <button
                      className="btn-play-custom"
                      onClick={() =>
                        navigate(`/quiz?customId=${quiz.quizID || quiz.id}`)
                      }
                    >
                      <span>Jogar Agora</span> <FaPlay />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
