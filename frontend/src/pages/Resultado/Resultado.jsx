import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrophy, FaMedal, FaRegStar, FaArrowLeft } from "react-icons/fa";
import "./Resultado.css";

export default function Resultado() {
    const navigate = useNavigate();
    const location = useLocation();

    const { acertos, totalPerguntas, nomeCategoria, nomeUsuario } = location.state || {
        acertos: 0,
        totalPerguntas: 10,
        nomeCategoria: "Tema Aleatório",
        nomeUsuario: "Usuário"
    };

    useEffect(() => {
        if (!location.state) {
            navigate("/home");
        }
    }, [location.state, navigate]);

    const porcentagem = totalPerguntas > 0 ? (acertos / totalPerguntas) * 100 : 0;

    let mensagemDesempenho = "";
    let iconeDesempenho = null;
    let corPorcentagem = "";

    if (porcentagem === 100) {
        mensagemDesempenho = `Incrível! Você é um mestre nisso!`;
        iconeDesempenho = <FaTrophy className="result-icon gold" title="Troféu de Ouro" />;
        corPorcentagem = "gold-text";
    } else if (porcentagem >= 90) {
        mensagemDesempenho = `Parabéns! Desempenho lendário, mandou muito bem!`;
        iconeDesempenho = <FaTrophy className="result-icon gold" title="Troféu de Ouro" />;
        corPorcentagem = "gold-text";
    } else if (porcentagem >= 70) {
        mensagemDesempenho = `Muito bom! Ótimo resultado!`;
        iconeDesempenho = <FaMedal className="result-icon silver" title="Medalha de Prata" />;
        corPorcentagem = "silver-text";
    } else if (porcentagem >= 50) {
        mensagemDesempenho = `Bom trabalho! Continue praticando para melhorar.`;
        iconeDesempenho = <FaMedal className="result-icon bronze" title="Medalha de Bronze" />;
        corPorcentagem = "bronze-text";
    } else {
        mensagemDesempenho = `Não desanime! Estude mais e tente novamente.`;
        iconeDesempenho = <FaRegStar className="result-icon simple" title="Estrela de Participação" />;
        corPorcentagem = "simple-text";
    }

    return (
        <main className="resultados-page">
            <div className="resultados-container">

                <h1 className="resultados-title">Quiz Concluído!</h1>

                <p className="results-msg">
                    Parabéns, {nomeUsuario}! Você completou o quiz de {nomeCategoria.toLowerCase()}
                </p>

                <div className="score-card glass-panel">

                    <div className="icon-wrapper">
                        {iconeDesempenho}
                    </div>

                    <h2 className="desempenho-msg">{mensagemDesempenho}</h2>

                    <div className="score-group">
                        <span className="score-label">Sua Pontuação</span>
                        <span className="score-value">{acertos}/{totalPerguntas}</span>
                    </div>

                    <div className="score-group">
                        <span className="score-label">Aproveitamento:</span>
                        <span className={`percentage-value ${corPorcentagem}`}>{porcentagem}%</span>
                    </div>
                </div>

                <button className="back-home-btn" onClick={() => navigate("/home")}>
                    <FaArrowLeft className="arrow-icon" /> Voltar ao Início
                </button>

            </div>
        </main>
    );
}