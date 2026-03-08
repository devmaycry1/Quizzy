import "./Login.css";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";

export default function Login() {
  return (
    <main className="login">
      <div className="login-card">

        <h1 className="logo">QUIZZY</h1>
        <h2 className="title">Login</h2>

        <form className="form">
          <InputField
            type="email"
            placeholder="Email"
            icon="📧"
          />

          <InputField
            type="password"
            placeholder="Senha"
            icon="🔑"
          />

          <Button text="Entrar" />
        </form>

        <p className="register">
          Não tem uma conta? <span>Clique aqui</span>
        </p>

      </div>
    </main>
  );
}
