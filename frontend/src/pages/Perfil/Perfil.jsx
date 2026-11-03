// src/pages/Perfil/Perfil.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  FaUserEdit,
  FaHistory,
  FaTrophy,
  FaGamepad,
  FaArrowLeft,
  FaCheckCircle,
  FaKey,
  FaImage,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Perfil.css";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    id: "",
    usuarioID: "",
    nome: "",
    nomeUsuario: "",
    email: "",
    avatar: "robot",
  });

  const [historico, setHistorico] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    totalJogos: 0,
    taxaAcerto: 0,
    totalPerguntas: 0,
  });

  const [abaAtiva, setAbaAtiva] = useState("historico");
  const [dadosEditados, setDadosEditados] = useState({});
  const [dadosSenha, setDadosSenha] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });
  const [avisoFeedback, setAvisoFeedback] = useState({
    tipo: "",
    mensagem: "",
  });

  const avataresDisponiveis = [
    { id: "robot", icon: "🤖" },
    { id: "rocket", icon: "🚀" },
    { id: "ninja", icon: "🥷" },
    { id: "wizard", icon: "🧙" },
    { id: "alien", icon: "👽" },
  ];

  const dispararAviso = (mensagem, tipo = "sucesso") => {
    setAvisoFeedback({ tipo, mensagem });
    setTimeout(() => {
      setAvisoFeedback({ tipo: "", mensagem: "" });
    }, 4000);
  };

  useEffect(() => {
    const carregarDados = async () => {
      const usuarioLogadoStr = localStorage.getItem("usuarioLogado");
      if (!usuarioLogadoStr) {
        navigate("/login");
        return;
      }

      const dadosUser = JSON.parse(usuarioLogadoStr);
      if (!dadosUser.avatar) dadosUser.avatar = "robot";

      setUsuario(dadosUser);
      setDadosEditados(dadosUser);

      try {
        const response = await api.get("/quizzy/historico");
        const partidas = response.data;

        setHistorico(partidas);

        if (partidas.length > 0) {
          const totalAcertos = partidas.reduce((acc, p) => acc + p.acertos, 0);
          const totalPerg = partidas.reduce(
            (acc, p) => acc + p.totalPerguntas,
            0,
          );

          setEstatisticas({
            totalJogos: partidas.length,
            totalPerguntas: totalPerg,
            taxaAcerto:
              totalPerg > 0 ? Math.round((totalAcertos / totalPerg) * 100) : 0,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    };

    carregarDados();
  }, [navigate]);

  const handleTrocarAvatar = (novoAvatarId) => {
    const usuarioAtualizado = { ...usuario, avatar: novoAvatarId };
    setUsuario(usuarioAtualizado);
    setDadosEditados(usuarioAtualizado);
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
    dispararAviso("Avatar selecionado com sucesso!");
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();

    const alterouNomeUsuario =
      dadosEditados.nomeUsuario !== usuario.nomeUsuario;

    try {
      const payload = {
        nome: dadosEditados.nome,
        nomeUsuario: dadosEditados.nomeUsuario,
        email: dadosEditados.email,
      };

      const response = await api.put("/auth/atualizar", payload);

      if (response.status === 200 || response.status === 204) {
        if (alterouNomeUsuario) {
          localStorage.removeItem("usuarioLogado");
          localStorage.removeItem("token");
          dispararAviso(
            "Nome de utilizador alterado! Por favor, inicie sessão novamente.",
            "sucesso",
          );
          setTimeout(() => navigate("/login"), 2500);
          return;
        }

        const novoUsuarioLocal = { ...usuario, ...payload };
        setUsuario(novoUsuarioLocal);
        localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuarioLocal));
        setAbaAtiva("historico");
        dispararAviso("Perfil atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      dispararAviso(
        error.response?.data?.message || "Erro ao atualizar os dados.",
        "erro",
      );
    }
  };

  const handleTrocarSenha = async (e) => {
    e.preventDefault();

    if (dadosSenha.novaSenha !== dadosSenha.confirmarSenha) {
      dispararAviso("As palavras-passe não coincidem!", "erro");
      return;
    }

    try {
      await api.patch("/auth/alterar-senha", {
        senhaAtual: dadosSenha.senhaAtual,
        novaSenha: dadosSenha.novaSenha,
        confirmarSenha: dadosSenha.confirmarSenha,
      });

      dispararAviso("Palavra-passe alterada com sucesso!");
      setDadosSenha({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      setAbaAtiva("historico");
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      dispararAviso(
        error.response?.data?.message ||
          "Erro ao alterar a palavra-passe. Verifique a atual.",
        "erro",
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getAvatarIcon = (avatarId) => {
    const avatar = avataresDisponiveis.find((a) => a.id === avatarId);
    return avatar ? avatar.icon : "🤖";
  };

  return (
    <div className="perfil-layout">
      <div className="perfil-bg-glow glow-1"></div>
      <div className="perfil-bg-glow glow-2"></div>

      {avisoFeedback.mensagem && (
        <div className={`perfil-banner-aviso ${avisoFeedback.tipo}`}>
          <span>
            {avisoFeedback.tipo === "erro" ? "⚠️" : "✨"}{" "}
            {avisoFeedback.mensagem}
          </span>
        </div>
      )}

      {/* Cabeçalho com Botão de Sair em Destaque no Canto Superior Direito */}
      <header className="perfil-topbar">
        <div className="perfil-topbar-content">
          <button
            onClick={() => navigate("/home")}
            className="perfil-back-btn"
            title="Voltar"
          >
            <FaArrowLeft />
          </button>
          <span className="perfil-logo-text">Quizzy</span>

          <button
            onClick={handleLogout}
            className="perfil-logout-topbar-btn"
            title="Sair da Conta"
          >
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </header>

      <main className="perfil-main-content">
        <div className="perfil-wrapper">
          <div className="perfil-card glass-panel">
            <div className="perfil-user-info">
              <div className="perfil-avatar-wrapper">
                <div className="perfil-avatar-circle">
                  {getAvatarIcon(usuario.avatar)}
                </div>
              </div>
              <div className="perfil-user-details">
                <h1>{usuario.nome}</h1>
                <span className="perfil-username">@{usuario.nomeUsuario}</span>
              </div>
            </div>

            <div className="perfil-stats-grid">
              <div className="perfil-stat-item">
                <div className="perfil-stat-icon-box text-purple">
                  <FaGamepad />
                </div>
                <span className="perfil-stat-value">
                  {estatisticas.totalJogos}
                </span>
                <span className="perfil-stat-label">Partidas</span>
              </div>
              <div className="perfil-stat-item">
                <div className="perfil-stat-icon-box text-cyan">
                  <FaHistory />
                </div>
                <span className="perfil-stat-value">
                  {estatisticas.totalPerguntas}
                </span>
                <span className="perfil-stat-label">Respondidas</span>
              </div>
              <div className="perfil-stat-item">
                <div className="perfil-stat-icon-box text-blue">
                  <FaTrophy />
                </div>
                <span className="perfil-stat-value">
                  {estatisticas.taxaAcerto}%
                </span>
                <span className="perfil-stat-label">Precisão</span>
              </div>
            </div>
          </div>

          {/* Abas Limpas (4 Opções) */}
          <div className="perfil-actions-nav">
            <button
              onClick={() => setAbaAtiva("historico")}
              className={`perfil-nav-tab-btn ${abaAtiva === "historico" ? "active" : ""}`}
            >
              <FaHistory /> Histórico
            </button>
            <button
              onClick={() => setAbaAtiva("avatar")}
              className={`perfil-nav-tab-btn ${abaAtiva === "avatar" ? "active" : ""}`}
            >
              <FaImage /> Avatar
            </button>
            <button
              onClick={() => setAbaAtiva("editar")}
              className={`perfil-nav-tab-btn ${abaAtiva === "editar" ? "active" : ""}`}
            >
              <FaUserEdit /> Dados
            </button>
            <button
              onClick={() => setAbaAtiva("senha")}
              className={`perfil-nav-tab-btn ${abaAtiva === "senha" ? "active" : ""}`}
            >
              <FaKey /> Senha
            </button>
          </div>

          {abaAtiva === "avatar" && (
            <div className="perfil-section-box">
              <h2>Personalizar Avatar</h2>
              <p className="perfil-section-desc">
                Selecione o ícone que o representará na arena:
              </p>
              <div className="perfil-avatar-picker-standalone">
                {avataresDisponiveis.map((av) => (
                  <button
                    type="button"
                    key={av.id}
                    onClick={() => handleTrocarAvatar(av.id)}
                    className={`perfil-avatar-option-btn-large ${usuario.avatar === av.id ? "active" : ""}`}
                  >
                    <span className="avatar-emoji">{av.icon}</span>
                    <span className="avatar-name">{av.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === "editar" && (
            <div className="perfil-section-box">
              <h2>Editar Meus Dados</h2>
              <form onSubmit={handleSalvarEdicao} className="perfil-form">
                <div className="perfil-inputs-group">
                  <input
                    type="text"
                    value={dadosEditados.nome || ""}
                    onChange={(e) =>
                      setDadosEditados({
                        ...dadosEditados,
                        nome: e.target.value,
                      })
                    }
                    placeholder="Nome Completo"
                    required
                  />
                  <input
                    type="text"
                    value={dadosEditados.nomeUsuario || ""}
                    onChange={(e) =>
                      setDadosEditados({
                        ...dadosEditados,
                        nomeUsuario: e.target.value,
                      })
                    }
                    placeholder="Nome de Utilizador"
                    required
                  />
                  <input
                    type="email"
                    value={dadosEditados.email || ""}
                    onChange={(e) =>
                      setDadosEditados({
                        ...dadosEditados,
                        email: e.target.value,
                      })
                    }
                    placeholder="E-mail"
                    required
                  />
                </div>

                <button type="submit" className="perfil-submit-btn">
                  Salvar Alterações
                </button>
              </form>
            </div>
          )}

          {abaAtiva === "senha" && (
            <div className="perfil-section-box">
              <h2>Alterar Palavra-passe</h2>
              <form onSubmit={handleTrocarSenha} className="perfil-form">
                <div className="perfil-inputs-group">
                  <input
                    type="password"
                    value={dadosSenha.senhaAtual}
                    onChange={(e) =>
                      setDadosSenha({
                        ...dadosSenha,
                        senhaAtual: e.target.value,
                      })
                    }
                    placeholder="Palavra-passe Atual"
                    required
                  />
                  <input
                    type="password"
                    value={dadosSenha.novaSenha}
                    onChange={(e) =>
                      setDadosSenha({
                        ...dadosSenha,
                        novaSenha: e.target.value,
                      })
                    }
                    placeholder="Nova Palavra-passe"
                    required
                  />
                  <input
                    type="password"
                    value={dadosSenha.confirmarSenha}
                    onChange={(e) =>
                      setDadosSenha({
                        ...dadosSenha,
                        confirmarSenha: e.target.value,
                      })
                    }
                    placeholder="Confirmar Nova Palavra-passe"
                    required
                  />
                </div>

                <button type="submit" className="perfil-submit-btn">
                  Atualizar Palavra-passe
                </button>
              </form>
            </div>
          )}

          {abaAtiva === "historico" && (
            <div className="perfil-section-box">
              <h2>Histórico de Partidas</h2>
              {historico.length === 0 ? (
                <div className="perfil-empty-notice">
                  Ainda não jogou nenhum quiz. A arena aguarda por si!
                </div>
              ) : (
                <div className="perfil-history-list">
                  {historico.map((partida, index) => (
                    <div key={index} className="perfil-history-card">
                      <div className="perfil-history-info">
                        <h3>{partida.tema || "Tema Livre"}</h3>
                        <span>
                          {partida.dataPartida
                            ? new Date(partida.dataPartida).toLocaleDateString(
                                "pt-PT",
                              )
                            : "Data indisponível"}
                        </span>
                      </div>
                      <div className="perfil-history-score-pill">
                        <FaCheckCircle className="pill-icon" />
                        <span>
                          {partida.acertos}/{partida.totalPerguntas}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
