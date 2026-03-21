import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlay, FiPlus } from "react-icons/fi";
import "./Home.css";
import { CATEGORIAS_OPENTDB } from "../../utils/constantes";

export default function Home() {
    const navigate = useNavigate();
    const [quantidade, setQuantidade] = useState(10);
    const [categoria, setCategoria] = useState("");
    const [dificuldade, setDificuldade] = useState("");
    const [usuarioNome, _setUsuarioNome] = useState(() => {
        const usuarioLogado = localStorage.getItem("usuarioLogado");

        if (!usuarioLogado) return null;

        const dadosUsuario = JSON.parse(usuarioLogado);
        return dadosUsuario.nome;
    });

    const handleIniciarQuiz = (e) => {
        e.preventDefault();
        navigate(`/quiz?amount=${quantidade}&category=${categoria}&difficulty=${dificuldade}`);
    };

    return (
        <main className="home-page">
            <header className="home-header">
                <div className="user-profile">
                    <div className="avatar-container">
                        <img src="data:image/jpeg;base64,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" alt="Avatar" className="avatar-img" />
                    </div>
                    <h2 className="greeting">Olá, {usuarioNome}!</h2>
                </div>
                <h1 className="logo-text">QUIZZY</h1>
            </header>

            <section className="hero-section">
                <h2 className="hero-title">
                    Configure sua partida<br />e desafie seus conhecimentos!
                </h2>
            </section>

            <section className="config-section">
                <form className="glass-panel config-form" onSubmit={handleIniciarQuiz}>

                    <div className="form-group">
                        <label>Tema do Quiz:</label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="config-select"
                        >
                            {CATEGORIAS_OPENTDB.map(cat => (
                                <option key={cat.nome} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Dificuldade:</label>
                            <select
                                value={dificuldade}
                                onChange={(e) => setDificuldade(e.target.value)}
                                className="config-select"
                            >
                                <option value="">Qualquer (Mista)</option>
                                <option value="easy">Fácil</option>
                                <option value="medium">Média</option>
                                <option value="hard">Difícil</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Nº de Perguntas:</label>
                            <input
                                type="number"
                                min="10"
                                max="50"
                                value={quantidade}
                                onChange={(e) => setQuantidade(e.target.value)}
                                className="config-input"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-start-dynamic">
                        <FiPlay className="play-icon" /> Começar Agora
                    </button>
                </form>
            </section>

            <footer className="home-footer">
                <button className="create-quiz-btn" onClick={() => navigate("/criar")}>
                    <FiPlus className="plus-icon" /> Criar Novo Quiz
                </button>
            </footer>
        </main>
    );
}