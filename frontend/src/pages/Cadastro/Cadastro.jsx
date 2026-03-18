import { FiMail, FiKey, FiUser } from "react-icons/fi";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Cadastro.css";
import { useNavigate } from "react-router-dom";
import { obterMensagemErro } from "../../utils/validacao";
import { useState } from 'react'

export default function Cadastro() {
    const navigate = useNavigate();
    const [dados, setDados] = useState({ nome: "", email: "", senha: "" });
    const [erros, setErros] = useState({ nome: "", email: "", senha: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value })

        if (erros[name]) {
            setErros({ ...erros, [name]: "" });
        }
    }

    const handleBlur = (e) => {
        const { name, validity } = e.target;
        const mensagemErro = obterMensagemErro(name, validity);
        setErros({ ...erros, [name]: mensagemErro })
    }

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (erros.nome || erros.email || erros.senha || !dados.nome || !dados.email || !dados.senha) {
            alert("Por favor, corrija os erros do formulário.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/usuarios?email=${dados.email}`)
            const data = await response.json();

            if (data.length > 0) {
                setErros({ ...erros, email: "Este e-mail já está cadastrado!" });
                return;
            }

            const usuario = {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha
            }

            const responseCriacao = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuario)
            });

            if (responseCriacao.ok) {
                alert("Cadastro realizado com sucesso!");
                navigate("/login");
            } else {
                alert("Erro ao salvar o usuário. Tente novamente.");
            }


        } catch (error) {
            console.error("Erro ao cadastrar usuário: ", error)
            alert("Erro de conexão")
        }
    }
    return (
        <main className="register-page">
            <div className="register-page-card">

                <h1 className="logo">QUIZZY</h1>
                <h2 className="title">Registro</h2>

                <form className="form">

                    <InputField
                        name="nome"
                        type="text"
                        placeholder="Nome"
                        icon={FiUser}
                        value={dados.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={erros.nome}
                        required />

                    <InputField
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon={FiMail}
                        value={dados.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={erros.email}
                        required

                    />

                    <InputField
                        name="senha"
                        type="password"
                        placeholder="Senha"
                        icon={FiKey}
                        value={dados.senha}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={erros.senha}
                        minLength="6"
                        required
                    />

                    <Button text="Registrar" onClick={handleCadastro} />
                </form>

                <p className="register-footer">
                    Já tem uma conta? <span onClick={() => navigate("/login")}>Clique aqui</span>
                </p>

            </div>
        </main>

    );
}