import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIAS_OPENTDB } from "../../utils/constantes"; // Importando as categorias
import "./Quiz.css";

const decodificarHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

const embaralharRespostas = (respostas) => {
    return respostas.sort(() => Math.random() - 0.5);
};

export default function Quiz() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [perguntas, setPerguntas] = useState([]);
    const [perguntaAtual, setPerguntaAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [usuarioNome, setUsuarioNome] = useState("Usuário");
    const [nomeCategoria, setNomeCategoria] = useState("Tema Aleatório");
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);
    const [isRespondido, setIsRespondido] = useState(false);

    useEffect(() => {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (usuarioLogado) {
            const dadosUsuario = JSON.parse(usuarioLogado);
            setUsuarioNome(dadosUsuario.nome);
        }

        const categoryIdFromUrl = searchParams.get("category");
        if (categoryIdFromUrl) {
            const categoryObj = CATEGORIAS_OPENTDB.find(cat => cat.id.toString() === categoryIdFromUrl);
            if (categoryObj) setNomeCategoria(categoryObj.nome);
        }

        const buscarPerguntas = async () => {
            const amount = searchParams.get("amount") || 10;
            const category = searchParams.get("category") || "";
            const difficulty = searchParams.get("difficulty") || "";

            let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
            if (category) url += `&category=${category}`;
            if (difficulty) url += `&difficulty=${difficulty}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.results.length > 0) {
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
                    alert("Não encontramos perguntas com essas configurações. Tente outras!");
                    navigate("/home");
                }
            } catch (error) {
                console.error("Erro ao buscar perguntas:", error);
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
            navigate("/resultado", {
                state: {
                    acertos: pontuacao,
                    totalPerguntas: perguntas.length,
                    nomeCategoria: nomeCategoria,
                    nomeUsuario: usuarioNome
                }
            });
        }
    };

    if (carregando) {
        return (
            <div className="quiz-page loading-screen">
                <h2 className="loading-text">Preparando o seu desafio...</h2>
            </div>
        );
    }

    const perguntaExibida = perguntas[perguntaAtual];

    return (
        <main className="quiz-page">
            <div className="quiz-container glass-panel">

                <header className="quiz-header">
                    <span className="question-count">
                        Pergunta {perguntaAtual + 1} de {perguntas.length}
                    </span>
                    <span className="score">Pontos: {pontuacao}</span>
                </header>

                <h2 className="question-text">{perguntaExibida.pergunta}</h2>

                <div className="options-grid">
                    {perguntaExibida.respostas.map((resposta, index) => {

                        let classeBotao = "option-btn";

                        if (isRespondido) {
                            if (resposta === perguntaExibida.respostaCerta) {
                                classeBotao += " correct";
                            } else if (resposta === respostaSelecionada) {
                                classeBotao += " incorrect";
                            } else {
                                classeBotao += " disabled";
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={classeBotao}
                                onClick={() => handleResponder(resposta)}
                                disabled={isRespondido}
                            >
                                {resposta}
                            </button>
                        );
                    })}
                </div>

                {isRespondido && (
                    <button className="next-btn" onClick={handleProximaPergunta}>
                        {perguntaAtual + 1 === perguntas.length ? "Ver Resultados" : "Próxima Pergunta"}
                    </button>
                )}

            </div>
        </main>
    );
}