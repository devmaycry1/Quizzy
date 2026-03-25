import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { FaArrowLeft, FaPlay, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import "./QuizzesCriados.css"

export default function QuizzesCriados() {
    const navigate = useNavigate();
    const [meusQuizzes, setMeusQuizzes] = useState();
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarMeusQuizzes = async () => {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

            if (!usuarioLogado) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/quizzes?autorId=${usuarioLogado.id}`);
                const data = await response.json();
                setMeusQuizzes(data);
            } catch (error) {
                console.error("Erro ao buscar quizzes:", error);
            } finally {
                setCarregando(false);
            }
        };

        buscarMeusQuizzes();
    }, [navigate]);

    return (
        <main className="meus-quizzes-page">
            <div className="meus-quizzes-container glass-panel">

                <header className="meus-header">
                    <button className="icon-btn-back" onClick={() => navigate("/home")}>
                        <FaArrowLeft /> Voltar
                    </button>
                    <h2>Meus Quizzes Criados</h2>
                </header>

                {carregando ? (
                    <p className="loading-msg">Buscando seus quizzes no espaço...</p>
                ) : meusQuizzes.length === 0 ? (
                    <div className="empty-state">
                        <p>Você ainda não criou nenhum quiz.</p>
                        <button className="btn-create-first" onClick={() => navigate("/criar-quiz")}>
                            Criar meu primeiro Quiz!
                        </button>
                    </div>
                ) : (
                    <div className="quizzes-grid">
                        {meusQuizzes.map((quiz) => (
                            <div key={quiz.id} className="quiz-card">
                                <h3>{quiz.titulo}</h3>
                                {quiz.descricao && <p className="quiz-desc">{quiz.descricao}</p>}

                                <div className="quiz-meta">
                                    <span><FaQuestionCircle /> {quiz.perguntas.length} perguntas</span>
                                    <span><FaCalendarAlt /> {new Date(quiz.dataCriacao).toLocaleDateString()}</span>
                                </div>

                                <button
                                    className="btn-play-custom"
                                    onClick={() => navigate(`/quiz?customId=${quiz.id}`)}
                                >
                                    <FaPlay /> Jogar Agora
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );

}