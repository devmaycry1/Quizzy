// src/pages/CriarQuiz/CriarQuiz.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaSave, FaArrowLeft } from "react-icons/fa";
import "./CriarQuiz.css";

export default function CriarQuiz() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [perguntas, setPerguntas] = useState([
        {
            enunciado: "",
            alternativas: ["", "", "", ""],
            respostaCertaIndex: 0
        }
    ]);
    const [erroValidacao, setErroValidacao] = useState("");

    const adicionarPergunta = () => {
        setPerguntas([
            ...perguntas,
            { enunciado: "", alternativas: ["", "", "", ""], respostaCertaIndex: 0 }
        ]);
    };

    const removerPergunta = (indexParaRemover) => {
        if (perguntas.length === 1) {
            alert("O quiz precisa ter pelo menos uma pergunta!");
            return;
        }
        const novasPerguntas = perguntas.filter((_, index) => index !== indexParaRemover);
        setPerguntas(novasPerguntas);
    };

    const atualizarEnunciado = (texto, indexPergunta) => {
        const novasPerguntas = [...perguntas];
        novasPerguntas[indexPergunta].enunciado = texto;
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

        if (perguntas.length < 10) {
            setErroValidacao(`Faltam ${10 - perguntas.length} perguntas! O quiz precisa ter no mínimo 10 para ser criado.`);
            setTimeout(() => setErroValidacao(""), 4000);
            return;
        }

        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

        const novoQuiz = {
            titulo,
            descricao,
            autorId: usuarioLogado.id,
            autorNome: usuarioLogado.nome,
            dataCriacao: new Date().toISOString(),
            perguntas
        };

        try {
            const response = await fetch("http://localhost:3000/quizzes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoQuiz)
            });

            if (response.ok) {
                alert("Quiz criado com sucesso!");
                navigate("/home");
            } else {
                alert("Erro ao salvar o quiz.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <main className="criar-quiz-page">
            <div className="criar-quiz-container glass-panel">

                <header className="criar-header">
                    <button className="icon-btn-back" onClick={() => navigate("/home")}>
                        <FaArrowLeft /> Voltar
                    </button>
                    <h2>Criar Novo Quiz</h2>
                </header>

                <form onSubmit={handleSalvarQuiz} className="criar-form">

                    <div className="form-section">
                        <label>Título do Quiz:</label>
                        <input
                            type="text"
                            placeholder="Ex: Tudo sobre React"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />

                        <label>Descrição (opcional):</label>
                        <textarea
                            placeholder="Do que se trata este desafio?"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows="2"
                        />
                    </div>

                    <hr className="divider" />

                    <div className="perguntas-list">
                        {perguntas.map((pergunta, pIndex) => (
                            <div key={pIndex} className="pergunta-card">
                                <div className="pergunta-header">
                                    <h3>Pergunta {pIndex + 1}</h3>
                                    <button
                                        type="button"
                                        className="btn-trash"
                                        onClick={() => removerPergunta(pIndex)}
                                        title="Remover Pergunta"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    className="input-enunciado"
                                    placeholder="Digite a pergunta aqui..."
                                    value={pergunta.enunciado}
                                    onChange={(e) => atualizarEnunciado(e.target.value, pIndex)}
                                    required
                                />

                                <div className="alternativas-grid">
                                    {pergunta.alternativas.map((alt, aIndex) => (
                                        <div
                                            key={aIndex}
                                            className={`alternativa-item ${pergunta.respostaCertaIndex === aIndex ? 'certa' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name={`correta-${pIndex}`}
                                                checked={pergunta.respostaCertaIndex === aIndex}
                                                onChange={() => definirRespostaCerta(pIndex, aIndex)}
                                            />
                                            <input
                                                type="text"
                                                placeholder={`Alternativa ${aIndex + 1}`}
                                                value={alt}
                                                onChange={(e) => atualizarAlternativa(e.target.value, pIndex, aIndex)}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {erroValidacao && (
                        <div className="error-message-inline" style={{ width: "100%", marginBottom: "15px" }}>
                            {erroValidacao}
                        </div>
                    )}

                    <div className="criar-actions">
                        <button type="button" className="btn-add-pergunta" onClick={adicionarPergunta}>
                            <FaPlus /> Adicionar Pergunta
                        </button>

                        <button type="submit" className="btn-save-quiz">
                            <FaSave /> Salvar Quiz
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
}