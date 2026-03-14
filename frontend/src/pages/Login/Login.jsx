import "./Login.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { FiMail, FiKey } from "react-icons/fi";

export default function Login() {

  const navigate = useNavigate();

  return (
    <main className="login-page">
      <div className="login-page-card">

        <h1 className="logo">QUIZZY</h1>
        <h2 className="title">Login</h2>

        <form className="form">
          <InputField
            type="email"
            placeholder="Email"
            icon={FiMail}
          />

          <InputField
            type="password"
            placeholder="Senha"
            icon={FiKey}
          />

          <Button text="Entrar" />
        </form>

        <p className="login-footer">
          Não tem uma conta? <span onClick={() => navigate("/cadastro") }>Clique aqui</span>
        </p>

      </div>
    </main>
  );
}
