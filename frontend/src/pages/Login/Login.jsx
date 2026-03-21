import "./Login.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FiMail, FiKey } from "react-icons/fi";
import { obterMensagemErro } from "../../utils/validacao";
import { useState } from "react";

export default function Login() {

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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (erros.email || erros.senha || !dados.email || !dados.senha) {
      alert("Por favor, preencha os campos corretamente.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/usuarios?email=${dados.email}&senha=${dados.senha}`)
      const data = await response.json()

      if (data.length > 0) {
        const usuario = data[0];
        const { _senha, ...dadosSessao } = usuario;
        localStorage.setItem("usuarioLogado", JSON.stringify(dadosSessao));
        navigate("/home");

      } else {
        alert("Email ou senha incorretos.");
      }

    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      alert("Erro de conexão. Verifique se o json-server está rodando.");

    }

  }

  return (
    <main className="login-page">
      <div className="login-page-card">

        <h1 className="logo">QUIZZY</h1>
        <h2 className="title">Login</h2>

        <form className="form">
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
            required
          />

          <Button text="Entrar" onClick={handleLogin} />
        </form>

        <p className="login-footer">
          Não tem uma conta? <span onClick={() => navigate("/cadastro")}>Clique aqui</span>
        </p>

      </div>
    </main>
  );
}
