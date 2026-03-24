// src/pages/Unauthorized/Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { FaLock, FaSignInAlt } from "react-icons/fa";
import "./Unauthorized.css";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <main className="unauthorized-page">
            <div className="unauthorized-container glass-panel">

                <div className="lock-icon-wrapper">
                    <FaLock className="lock-icon" />
                </div>

                <h1 className="error-code">401</h1>

                <h2 className="error-title">Acesso Restrito</h2>

                <p className="error-msg">
                    Parece que você não tem permissão para acessar esta área.
                    Por favor, faça o login ou cadastre-se para jogar o Quizzy!
                </p>

                <button className="unauthorized-btn" onClick={() => navigate("/login")}>
                    <FaSignInAlt className="icon" /> Ir para o Login
                </button>

            </div>
        </main>
    );
}