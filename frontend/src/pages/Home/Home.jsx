// src/pages/Home/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  FiPlay,
  FiSearch,
  FiClock,
  FiHelpCircle,
  FiCompass,
  FiList,
  FiPlus,
  FiBarChart2,
  FiShield,
} from "react-icons/fi";
import { CATEGORIAS_OPENTDB } from "../../utils/constantes";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(10);
  const [categoria, setCategoria] = useState("");
  const [dificuldade, setDificuldade] = useState("");

  const [usuario, setUsuario] = useState({
    nome: "Utilizador",
    avatar: "robot",
  });
  const [quizzes, setQuizzes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");
  const [tempoRestante, setTempoRestante] = useState(0);

  const avataresDisponiveis = [
    { id: "robot", icon: "🤖" },
    { id: "rocket", icon: "🚀" },
    { id: "ninja", icon: "🥷" },
    { id: "wizard", icon: "🧙" },
    { id: "alien", icon: "👽" },
  ];

  // Monitoramento constante do tempo de Cooldown (30 segundos)
  useEffect(() => {
    const verificarCooldown = () => {
      const expiryStr = localStorage.getItem("quiz_cooldown_expiry");
      if (expiryStr) {
        const expiry = parseInt(expiryStr, 10);
        const diff = Math.ceil((expiry - Date.now()) / 1000);

        if (diff > 0) {
          setTempoRestante(diff);
        } else {
          setTempoRestante(0);
          localStorage.removeItem("quiz_cooldown_expiry");
        }
      } else {
        setTempoRestante(0);
      }
    };

    verificarCooldown();
    const timer = setInterval(verificarCooldown, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carregarDadosHome = async () => {
      const usuarioLogadoStr = localStorage.getItem("usuarioLogado");
      if (!usuarioLogadoStr) {
        navigate("/login");
        return;
      }

      const dadosUser = JSON.parse(usuarioLogadoStr);
      if (!dadosUser.avatar) dadosUser.avatar = "robot";
      setUsuario(dadosUser);

      try {
        const response = await api.get("/quizzy/quiz");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Erro ao carregar quizzes na Home:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        setCarregando(false);
      }
    };

    carregarDadosHome();
  }, [navigate]);

  const getAvatarIcon = (avatarId) => {
    const avatar = avataresDisponiveis.find((a) => a.id === avatarId);
    return avatar ? avatar.icon : "🤖";
  };

  const handleIniciarQuiz = (e) => {
    e.preventDefault();
    if (tempoRestante > 0) return;

    navigate(
      `/quiz?amount=${quantidade}&category=${categoria}&difficulty=${dificuldade}`,
    );
  };

  const handleIniciarQuizCustom = (quizID) => {
    if (tempoRestante > 0) return;
    navigate(`/quiz?customId=${quizID}`);
  };

  const quizzesFiltrados = quizzes.filter(
    (q) =>
      q.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      (q.descricao &&
        q.descricao.toLowerCase().includes(termoBusca.toLowerCase())),
  );

  return (
    <main className="home-page-stitch">
      <div className="home-bg-decor">
        <div className="home-blob-1"></div>
        <div className="home-blob-2"></div>
      </div>

      {/* Topbar */}
      <header className="stitch-header">
        <div className="stitch-header-content">
          <div className="stitch-brand-group" onClick={() => navigate("/home")}>
            <span className="stitch-logo-title">QUIZZY</span>
          </div>
          <div className="stitch-header-right">
            <div className="stitch-streak-badge">
              <span>🔥</span>
              <span className="stitch-streak-num">7</span>
            </div>
            <button
              onClick={() => navigate("/perfil")}
              className="stitch-avatar-btn"
              title="Ver Perfil"
            >
              <span className="avatar-emoji">
                {getAvatarIcon(usuario.avatar)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Container Principal */}
      <div className="stitch-dashboard-container">
        <div className="dashboard-top-grid">
          <div className="stitch-profile-card glass-panel">
            <div className="profile-top-row">
              <div className="profile-user-info">
                <div className="profile-avatar-box">
                  <span className="profile-avatar-big">
                    {getAvatarIcon(usuario.avatar)}
                  </span>
                </div>
                <div className="profile-text-box">
                  <span className="profile-welcome-text">Olá de volta,</span>
                  <div className="profile-name-row">
                    <h2 className="profile-name">{usuario.nome}</h2>
                    <FiShield className="verified-icon" />
                  </div>
                </div>
              </div>
              <div className="profile-xp-box">
                <span className="profile-tier-lvl">Nível 14</span>
                <span className="profile-xp-val">14,850 XP</span>
              </div>
            </div>

            <div className="level-progress-section">
              <div className="level-labels">
                <span>Quiz Master Tier</span>
                <span>850 / 1,000 XP</span>
              </div>
              <div className="level-bar-track">
                <div className="level-bar-fill"></div>
              </div>
            </div>
          </div>

          <div className="stitch-config-card glass-panel">
            <div className="config-header-inline">
              <h3>Configurar Partida</h3>
              <span className="config-badge">OpenTDB</span>
            </div>
            <form className="config-form-inline" onSubmit={handleIniciarQuiz}>
              <div className="form-group-inline">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="config-select"
                >
                  {CATEGORIAS_OPENTDB.map((cat) => (
                    <option key={cat.nome} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row-inline">
                <select
                  value={dificuldade}
                  onChange={(e) => setDificuldade(e.target.value)}
                  className="config-select"
                >
                  <option value="">Dificuldade: Mista</option>
                  <option value="easy">Fácil</option>
                  <option value="medium">Média</option>
                  <option value="hard">Difícil</option>
                </select>

                <input
                  type="number"
                  min="5"
                  max="50"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  className="config-input"
                  title="Número de Perguntas"
                />

                <button
                  type="submit"
                  className={`btn-start-inline ${tempoRestante > 0 ? "disabled" : ""}`}
                  disabled={tempoRestante > 0}
                  title={
                    tempoRestante > 0
                      ? `Aguarde ${tempoRestante}s`
                      : "Iniciar Desafio"
                  }
                >
                  <FiPlay className="play-icon" />
                  <span>
                    {tempoRestante > 0
                      ? `AGUARDE (${tempoRestante}s)`
                      : "JOGAR"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Linha Inferior: Arenas em Destaque */}
        <div className="dashboard-bottom-section glass-panel">
          <div className="feed-header-row">
            <div className="feed-title-wrap">
              <h3>Quizzes em Destaque</h3>
              <span className="live-dot"></span>
            </div>
            <div className="home-search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Pesquisar Quizzes..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
            </div>
          </div>

          <div className="feed-content-area">
            {carregando ? (
              <p className="loading-feed">A carregar quizzes...</p>
            ) : quizzesFiltrados.length === 0 ? (
              <div className="empty-feed-inline">
                <p>Nenhum quiz customizado encontrado.</p>
                <button
                  className="btn-create-redirect"
                  onClick={() => navigate("/criar-quiz")}
                >
                  Criar meu Quiz
                </button>
              </div>
            ) : (
              <div className="quizzes-grid-horizontal">
                {quizzesFiltrados.map((quiz) => {
                  const idQuiz = quiz.quizID || quiz.id;
                  return (
                    <div key={idQuiz} className="quiz-card-horizontal">
                      <div className="card-item-info">
                        <span className="badge-custom-tag">CUSTOM</span>
                        <h4>{quiz.titulo}</h4>
                        {quiz.descricao && (
                          <p className="card-item-desc">{quiz.descricao}</p>
                        )}
                      </div>
                      <div className="card-item-footer">
                        <div className="card-meta-info">
                          <span>
                            <FiHelpCircle /> {quiz.perguntas?.length || 0} Qs
                          </span>
                          <span>
                            <FiClock /> 5 min
                          </span>
                        </div>
                        <button
                          className={`btn-play-arena-item ${tempoRestante > 0 ? "disabled" : ""}`}
                          disabled={tempoRestante > 0}
                          onClick={() => handleIniciarQuizCustom(idQuiz)}
                        >
                          <span>
                            {tempoRestante > 0 ? `${tempoRestante}s` : "Jogar"}
                          </span>{" "}
                          <FiPlay />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barra de Navegação Inferior */}
      <nav className="home-bottom-nav">
        <div className="bottom-nav-container">
          <button className="nav-item active" onClick={() => navigate("/home")}>
            <FiCompass className="nav-icon" />
            <span>Explorar</span>
          </button>
          <button
            className="nav-item"
            onClick={() => navigate("/meus-quizzes")}
          >
            <FiList className="nav-icon" />
            <span>Quizzes</span>
          </button>
          <button className="nav-item" onClick={() => navigate("/criar-quiz")}>
            <FiPlus className="nav-icon" />
            <span>Criar</span>
          </button>
          <button className="nav-item" onClick={() => navigate("/perfil")}>
            <FiBarChart2 className="nav-icon" />
            <span>Perfil</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
