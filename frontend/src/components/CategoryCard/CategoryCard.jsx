import "./CategoryCard.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ id, nome, qtdPerguntas, dificuldade }) {
    const navigate = useNavigate();

    // Função para definir a classe CSS da etiqueta (badge) com base na dificuldade
    const getBadgeClass = () => {
        const diff = dificuldade.toLowerCase();
        if (diff === "fácil") return "badge-facil";
        if (diff === "média") return "badge-media";
        if (diff === "difícil") return "badge-dificil";
        return "";
    };

    return (
        <div className="category-card">
            <h3 className="category-title">{nome}</h3>

            <div className="category-details">
                <p className="category-info">{qtdPerguntas} perguntas</p>
                <p className="category-difficulty">
                    Dificuldade: <span className={`badge ${getBadgeClass()}`}>{dificuldade}</span>
                </p>
            </div>

            <div className="category-action">
                <Button
                    text="Começar"
                    onClick={() => navigate(`/quiz/${id}`)}
                />
            </div>
        </div>
    );
}