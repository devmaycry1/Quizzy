// src/pages/NotFound/NotFound.jsx
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./NotFound.css";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="not-found-page">
            <div className="not-found-container glass-panel">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Página não encontrada</h2>
                <p className="error-msg">
                    Oops! Parece que você navegou para fora do nosso universo de quizzes.
                    A rota que você tentou acessar não existe.
                </p>
                <button className="not-found-btn" onClick={() => navigate("/home")}>
                    <FaHome className="icon" /> Voltar para a Terra (Início)
                </button>

            </div>
        </main>
    );
}