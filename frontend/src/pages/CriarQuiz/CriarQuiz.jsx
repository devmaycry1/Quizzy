// src/pages/CriarQuiz/CriarQuiz.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiArrowLeft,
  FiCheckCircle,
  FiCircle,
  FiCompass,
  FiList,
  FiBarChart2,
  FiEdit3,
  FiStar,
  FiLayers,
} from "react-icons/fi";
import api from "../../services/api";
import "./CriarQuiz.css";

export default function CriarQuiz() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dificuldade, setDificuldade] = useState("medium");

  const [perguntas, setPerguntas] = useState([
    {
      enunciado: "",
      alternativas: ["", "", "", ""],
      respostaCertaIndex: 0,
      explicacao: "",
    },
  ]);
  const [erroValidacao, setErroValidacao] = useState("");

  const adicionarPergunta = () => {
    setPerguntas([
      ...perguntas,
      {
        enunciado: "",
        alternativas: ["", "", "", ""],
        respostaCertaIndex: 0,
        explicacao: "",
      },
    ]);
  };

  const removerPergunta = (indexParaRemover) => {
    if (perguntas.length === 1) {
      alert("O quiz precisa ter pelo menos uma pergunta!");
      return;
    }
    const novasPerguntas = perguntas.filter(
      (_, index) => index !== indexParaRemover,
    );
    setPerguntas(novasPerguntas);
  };

  const atualizarEnunciado = (texto, indexPergunta) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[indexPergunta].enunciado = texto;
    setPerguntas(novasPerguntas);
  };

  const atualizarExplicacao = (texto, indexPergunta) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[indexPergunta].explicacao = texto;
    setPerguntas(novasPerguntas);
  };

  const atualizarAlternativa = (texto, indexPergunta, indexAlternativa) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[indexPergunta].alternativas[indexAlternativa] = texto;
    setPerguntas(novasPerguntas);
  };

  const definirRespostaCerta = (indexPergunta, indexAlternativa) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[indexPergunta].respostaCertaIndex = indexAlternativa;
    setPerguntas(novasPerguntas);
  };

  const handleSalvarQuiz = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      alert("Dê um título para o seu quiz!");
      return;
    }

    if (perguntas.length < 1) {
      setErroValidacao(
        `O quiz precisa ter no mínimo 1 pergunta para ser criado.`,
      );
      setTimeout(() => setErroValidacao(""), 4000);
      return;
    }

    const usuarioLogadoStr = localStorage.getItem("usuarioLogado");
    if (!usuarioLogadoStr) {
      navigate("/login");
      return;
    }

    const usuarioLogado = JSON.parse(usuarioLogadoStr);
    const autorId = usuarioLogado.usuarioID || usuarioLogado.id;

    const novoQuiz = {
      titulo,
      descricao,
      dificuldade,
      autorID: autorId,
      dataCriacao: new Date().toISOString(),
      perguntas,
    };

    try {
      const response = await api.post("/quizzy/quiz", novoQuiz);

      if (response.status === 200 || response.status === 201) {
        alert("Quiz criado com sucesso!");
        navigate("/meus-quizzes");
      }
    } catch (error) {
      console.error("Erro ao salvar quiz:", error);
      alert("Erro ao criar o quiz. Tente novamente.");
    }
  };

  return (
    <main className="criar-quiz-page">
      <div className="decor-bg-container">
        <div className="decor-circle-1"></div>
        <div className="decor-circle-2"></div>
      </div>

      {/* Cabeçalho Superior Fixo Padronizado */}
      <header className="criar-topbar">
        <div className="criar-topbar-content">
          <div className="criar-topbar-left">
            <button
              className="icon-btn-back"
              onClick={() => navigate("/home")}
              title="Voltar ao Início"
            >
              <FiArrowLeft size={18} />
            </button>
            <span className="brand-title">Quizzy</span>
            <span className="brand-badge">Criar</span>
          </div>

          <div className="criar-topbar-right">
            <div className="streak-badge">
              <span>🔥</span>
              <span>7</span>
            </div>
            <div className="user-avatar-icon">
              <FiCompass size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* Container Principal */}
      <div className="criar-quiz-container">
        {/* Bloco superior com a dica opcional implementada */}
        <div className="criar-header-actions">
          <div className="status-sync-bar">
            <div className="sync-info">
              <span className="sync-dot"></span>
              <span className="sync-text">Modo de Criação</span>
            </div>
            <p className="sync-time">
              Preencha os campos e adicione suas perguntas
            </p>
          </div>

          <button
            onClick={handleSalvarQuiz}
            type="button"
            className="publish-btn-top"
          >
            <FiSave size={16} />
            <span>Criar Quiz</span>
          </button>
        </div>

        <div className="inspiration-banner">
          <div className="banner-blur-circle"></div>
          <div className="banner-content">
            <div className="banner-icon-box">
              <FiStar size={20} />
            </div>
            <div>
              <h4>Arena Personalizada</h4>
              <p>Crie perguntas desafiadoras para a comunidade do Quizzy</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSalvarQuiz} className="criar-form">
          <section className="details-card">
            <div className="card-section-header">
              <div className="header-title-group">
                <FiLayers className="primary-icon" />
                <h3>Detalhes do Quiz</h3>
              </div>
              <span className="general-tag">Geral</span>
            </div>

            <div className="input-group">
              <label>Título do Quiz</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  className="custom-text-input"
                  placeholder="Ex: Arquitetura Avançada de Sistemas"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <span className="input-icon-right">
                  <FiEdit3 size={20} />
                </span>
              </div>
            </div>

            <div className="input-group">
              <label>Nível de Dificuldade</label>
              <div className="difficulty-grid">
                {["easy", "medium", "hard"].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDificuldade(diff)}
                    className={`diff-pill ${dificuldade === diff ? "active" : ""}`}
                  >
                    {diff === "easy"
                      ? "Fácil"
                      : diff === "medium"
                        ? "Médio"
                        : "Difícil"}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Descrição (Opcional)</label>
              <textarea
                placeholder="Descreva brevemente o objetivo deste quiz..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows="2"
                className="custom-textarea"
              />
            </div>
          </section>

          <div className="questions-section-header">
            <div className="header-title-group">
              <h3>Cartões de Perguntas</h3>
              <span className="count-badge">
                {perguntas.length}{" "}
                {perguntas.length === 1 ? "Pergunta" : "Perguntas"}
              </span>
            </div>
          </div>

          <div className="perguntas-list">
            {perguntas.map((pergunta, pIndex) => (
              <div key={pIndex} className="pergunta-card">
                <div className="pergunta-header">
                  <div className="question-number-group">
                    <span className="q-num-badge">{pIndex + 1}</span>
                    <span className="q-title-label">Questão {pIndex + 1}</span>
                  </div>
                  <button
                    type="button"
                    className="btn-trash-card"
                    onClick={() => removerPergunta(pIndex)}
                    title="Remover Pergunta"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="input-group">
                  <label>Enunciado da Pergunta</label>
                  <textarea
                    className="custom-textarea prompt-textarea"
                    rows="3"
                    placeholder="Digite a pergunta aqui..."
                    value={pergunta.enunciado}
                    onChange={(e) => atualizarEnunciado(e.target.value, pIndex)}
                    required
                  />
                </div>

                <div className="input-group">
                  <div className="label-flex-row">
                    <label>
                      Alternativas (Clique no círculo para definir a correta)
                    </label>
                    <span className="correct-selected-label">
                      1 Correta Definida
                    </span>
                  </div>

                  <div className="alternatives-stack">
                    {pergunta.alternativas.map((alt, aIndex) => {
                      const isCerta = pergunta.respostaCertaIndex === aIndex;
                      return (
                        <div
                          key={aIndex}
                          className={`alt-row ${isCerta ? "correct-alt" : ""}`}
                        >
                          <button
                            type="button"
                            onClick={() => definirRespostaCerta(pIndex, aIndex)}
                            className={`toggle-check-btn ${isCerta ? "active" : ""}`}
                            title="Marcar como correta"
                          >
                            {isCerta ? (
                              <FiCheckCircle size={18} />
                            ) : (
                              <FiCircle size={18} />
                            )}
                          </button>

                          <div className="alt-input-wrapper">
                            <input
                              type="text"
                              className="alt-text-input"
                              placeholder={`Alternativa ${aIndex + 1}`}
                              value={alt}
                              onChange={(e) =>
                                atualizarAlternativa(
                                  e.target.value,
                                  pIndex,
                                  aIndex,
                                )
                              }
                              required
                            />
                          </div>

                          {isCerta && (
                            <span className="correct-pill-tag">Correta</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="input-group">
                  <div className="explanation-label-row">
                    <FiStar className="secondary-icon" />
                    <label>
                      Explicação da Resposta (Exibida após a resposta)
                    </label>
                  </div>
                  <textarea
                    className="custom-textarea explanation-textarea"
                    rows="2"
                    placeholder="Explicação opcional..."
                    value={pergunta.explicacao}
                    onChange={(e) =>
                      atualizarExplicacao(e.target.value, pIndex)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {erroValidacao && (
            <div className="error-message-inline">{erroValidacao}</div>
          )}

          <button
            type="button"
            className="add-question-btn"
            onClick={adicionarPergunta}
          >
            <div className="add-icon-circle">
              <FiPlus size={18} />
            </div>
            <span>Adicionar Outra Pergunta</span>
          </button>

          {/* Botão flutuante inferior isolado */}
          <div className="sticky-action-bar-wrapper">
            <div className="sticky-action-inner">
              <button type="submit" className="save-continue-action-btn-full">
                <span>Criar Quiz</span>
                <FiArrowLeft className="rotate-arrow" size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Navegação Inferior Fixa */}
      <nav className="fixed-bottom-navigation">
        <div className="bottom-nav-inner">
          <button className="bottom-nav-item" onClick={() => navigate("/home")}>
            <FiCompass size={22} />
            <span>Explorar</span>
          </button>
          <button
            className="bottom-nav-item"
            onClick={() => navigate("/meus-quizzes")}
          >
            <FiList size={22} />
            <span>Quizzes</span>
          </button>
          <button
            className="bottom-nav-item active"
            onClick={() => navigate("/criar-quiz")}
          >
            <FiPlus size={22} />
            <span>Criar</span>
          </button>
          <button
            className="bottom-nav-item"
            onClick={() => navigate("/perfil")}
          >
            <FiBarChart2 size={22} />
            <span>Perfil</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
