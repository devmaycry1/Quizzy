// src/pages/Quiz/Quiz.jsx
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIAS_OPENTDB } from "../../utils/constantes";
import "./Quiz.css";

const decodificarHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const embaralharRespostas = (respostas) => {
  return respostas.sort(() => Math.random() - 0.5);
};

// Perguntas locais de segurança para garantir a jogabilidade se a API OpenTDB der 429
const PERGUNTAS_LOCAL_BACKUP = [
  {
    pergunta:
      "Qual é a linguagem principal utilizada no desenvolvimento com React?",
    respostas: ["JavaScript", "Python", "Java", "C++"],
    respostaCerta: "JavaScript",
  },
  {
    pergunta: "O que significa a sigla API?",
    respostas: [
      "Application Programming Interface",
      "Advanced Programming Integration",
      "Automated Protocol Interaction",
      "Array Process Integration",
    ],
    respostaCerta: "Application Programming Interface",
  },
  {
    pergunta: "Qual destas tecnologias é um framework backend em Java?",
    respostas: ["Spring Boot", "React", "Vue.js", "Angular"],
    respostaCerta: "Spring Boot",
  },
  {
    pergunta:
      "Qual método do array em JavaScript cria um novo array com os resultados de uma função?",
    respostas: ["map()", "forEach()", "filter()", "reduce()"],
    respostaCerta: "map()",
  },
  {
    pergunta:
      "Em bancos de dados relacionais, qual comando é usado para buscar dados?",
    respostas: ["SELECT", "UPDATE", "INSERT", "DELETE"],
    respostaCerta: "SELECT",
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [usuarioNome, setUsuarioNome] = useState("Usuário");
  const [usuarioFoto, setUsuarioFoto] = useState(null);
  const [nomeCategoria, setNomeCategoria] = useState("Tema Aleatório");
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [isRespondido, setIsRespondido] = useState(false);
  const [mostrarModalSair, setMostrarModalSair] = useState(false);

  useEffect(() => {
    if (!document.getElementById("material-symbols-css")) {
      const link = document.createElement("link");
      link.id = "material-symbols-css";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
      document.head.appendChild(link);
    }

    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (usuarioLogado) {
      const dadosUsuario = JSON.parse(usuarioLogado);
      setUsuarioNome(dadosUsuario.nome || "Usuário");
      if (dadosUsuario.foto || dadosUsuario.avatar) {
        setUsuarioFoto(dadosUsuario.foto || dadosUsuario.avatar);
      }
    }

    const categoryIdFromUrl = searchParams.get("category");
    if (categoryIdFromUrl) {
      const categoryObj = CATEGORIAS_OPENTDB.find(
        (cat) => cat.id.toString() === categoryIdFromUrl,
      );
      if (categoryObj) setNomeCategoria(categoryObj.nome);
    }

    const buscarPerguntas = async () => {
      const customId = searchParams.get("customId");

      if (customId) {
        try {
          const response = await fetch(
            `http://localhost:3000/quizzes?id=${customId}`,
          );
          const data = await response.json();
          const quizData = data.length > 0 ? data[0] : null;

          if (quizData && quizData.perguntas) {
            const perguntasFormatadas = quizData.perguntas.map((p) => ({
              pergunta: p.enunciado,
              respostas: p.alternativas,
              respostaCerta: p.alternativas[p.respostaCertaIndex],
            }));

            setPerguntas(perguntasFormatadas);
            setNomeCategoria(quizData.titulo);
          } else {
            setPerguntas(PERGUNTAS_LOCAL_BACKUP);
          }
        } catch (error) {
          console.error("Erro ao buscar quiz customizado:", error);
          setPerguntas(PERGUNTAS_LOCAL_BACKUP);
        } finally {
          setCarregando(false);
        }
        return;
      }

      const amount = searchParams.get("amount") || 10;
      const category = searchParams.get("category") || "";
      const difficulty = searchParams.get("difficulty") || "";

      let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;

      try {
        const response = await fetch(url);

        if (response.status === 429) {
          console.warn(
            "API OpenTDB Rate-Limited (429). Carregando modo offline resiliente.",
          );
          setPerguntas(PERGUNTAS_LOCAL_BACKUP);
          setCarregando(false);
          return;
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const perguntasFormatadas = data.results.map((item) => {
            const respostasEmbaralhadas = embaralharRespostas([
              ...item.incorrect_answers,
              item.correct_answer,
            ]);

            return {
              pergunta: decodificarHTML(item.question),
              respostas: respostasEmbaralhadas.map(decodificarHTML),
              respostaCerta: decodificarHTML(item.correct_answer),
            };
          });

          setPerguntas(perguntasFormatadas);
        } else {
          setPerguntas(PERGUNTAS_LOCAL_BACKUP);
        }
      } catch (error) {
        console.error("Erro ao carregar perguntas da API pública:", error);
        setPerguntas(PERGUNTAS_LOCAL_BACKUP);
      } finally {
        setCarregando(false);
      }
    };

    buscarPerguntas();
  }, [searchParams, navigate]);

  const handleResponder = (respostaEscolhida) => {
    if (isRespondido) return;

    setRespostaSelecionada(respostaEscolhida);
    setIsRespondido(true);

    if (respostaEscolhida === perguntas[perguntaAtual].respostaCerta) {
      setPontuacao(pontuacao + 1);
    }
  };

  const handleProximaPergunta = () => {
    if (perguntaAtual + 1 < perguntas.length) {
      setPerguntaAtual(perguntaAtual + 1);
      setRespostaSelecionada(null);
      setIsRespondido(false);
    } else {
      // Grava os 30s no localStorage para desativar o botão Jogar na Home
      localStorage.setItem(
        "quiz_cooldown_expiry",
        (Date.now() + 30000).toString(),
      );

      navigate("/resultado", {
        state: {
          acertos:
            pontuacao +
            (respostaSelecionada === perguntas[perguntaAtual].respostaCerta
              ? 1
              : 0),
          totalPerguntas: perguntas.length,
          nomeCategoria: nomeCategoria,
          nomeUsuario: usuarioNome,
        },
      });
    }
  };

  const handleSairPartida = () => {
    // Grava os 30s no localStorage para desativar o botão Jogar na Home ao desistir
    localStorage.setItem(
      "quiz_cooldown_expiry",
      (Date.now() + 30000).toString(),
    );
    navigate("/home");
  };

  if (carregando) {
    return (
      <main className="quiz-page loading-screen">
        <div className="decor-bg-container">
          <div className="decor-circle-1"></div>
          <div className="decor-circle-2"></div>
        </div>
        <h2 className="loading-text">Preparando o seu desafio...</h2>
      </main>
    );
  }

  if (perguntas.length === 0) return null;

  const perguntaExibida = perguntas[perguntaAtual];
  const progressoPct = ((perguntaAtual + 1) / perguntas.length) * 100;
  const letrasOpcoes = ["A", "B", "C", "D", "E", "F"];

  return (
    <main className="quiz-page">
      <div className="decor-bg-container">
        <div className="decor-circle-1"></div>
        <div className="decor-circle-2"></div>
      </div>

      <header className="quiz-topbar">
        <div className="quiz-topbar-content">
          <div className="quiz-topbar-left">
            <button
              className="icon-btn-back"
              onClick={() => setMostrarModalSair(true)}
              type="button"
              title="Voltar"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <span className="brand-title">Quizzy</span>
          </div>
          <div className="quiz-topbar-right">
            <div className="streak-badge">
              <span>🔥</span>
              <span>7</span>
            </div>
            <div
              className="user-avatar-container"
              onClick={() => navigate("/perfil")}
            >
              {usuarioFoto ? (
                <img
                  src={usuarioFoto}
                  alt={usuarioNome}
                  className="user-avatar-img"
                />
              ) : (
                <span className="material-symbols-outlined">person</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="quiz-container-wrapper">
        <div className="quiz-progress-track">
          <div
            className="quiz-progress-fill"
            style={{ width: `${progressoPct}%` }}
          ></div>
        </div>

        <div className="quiz-hud">
          <button
            className="exit-btn-hud"
            onClick={() => setMostrarModalSair(true)}
            type="button"
            aria-label="Sair"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="question-tracker-pill">
            <span className="tracker-dot"></span>
            <span className="tracker-text">
              Questão {perguntaAtual + 1} / {perguntas.length}
            </span>
          </div>

          <div className="score-hud-pill">
            <span className="material-symbols-outlined">bolt</span>
            <span className="score-text">Pontos: {pontuacao}</span>
          </div>
        </div>

        <div className="quiz-category-info">
          <span className="material-symbols-outlined">terminal</span>
          <span className="category-text">{nomeCategoria}</span>
        </div>

        <div className="hero-question-card">
          <h2 className="question-title">{perguntaExibida.pergunta}</h2>
        </div>

        <div className="options-grid">
          {perguntaExibida.respostas.map((resposta, index) => {
            let classeBotao = "quiz-option";

            if (isRespondido) {
              if (resposta === perguntaExibida.respostaCerta) {
                classeBotao += " correct";
              } else if (resposta === respostaSelecionada) {
                classeBotao += " incorrect";
              } else {
                classeBotao += " disabled";
              }
            } else if (resposta === respostaSelecionada) {
              classeBotao += " selected";
            }

            return (
              <button
                key={index}
                className={classeBotao}
                onClick={() => handleResponder(resposta)}
                disabled={isRespondido}
                type="button"
              >
                <div className="option-badge">
                  {letrasOpcoes[index] || index + 1}
                </div>
                <div className="option-text-wrapper">
                  <p className="option-text">{resposta}</p>
                </div>
                <div className="option-icon-check">
                  <span className="material-symbols-outlined">
                    {isRespondido && resposta === perguntaExibida.respostaCerta
                      ? "check"
                      : ""}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {isRespondido && (
          <div className="quiz-action-footer">
            <button
              className="next-action-btn"
              onClick={handleProximaPergunta}
              type="button"
            >
              <span>
                {perguntaAtual + 1 === perguntas.length
                  ? "Ver Resultados"
                  : "Próxima Pergunta"}
              </span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        )}
      </div>

      {mostrarModalSair && (
        <div className="quit-modal-overlay">
          <div className="quit-modal-card">
            <div className="quit-modal-icon-box">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <h3 className="quit-modal-title">Abandonar Partida?</h3>
            <p className="quit-modal-desc">
              Se sair agora, perderá o progresso atual deste quiz.
            </p>
            <div className="quit-modal-actions">
              <button
                className="modal-btn-resume"
                onClick={() => setMostrarModalSair(false)}
                type="button"
              >
                Continuar Jogando
              </button>
              <button
                className="modal-btn-quit"
                onClick={handleSairPartida}
                type="button"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
