import { FiMail, FiKey, FiUser } from "react-icons/fi";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import "./Cadastro.css";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {

    const navigate = useNavigate();

    return (
        <main className="register-page">
            <div className="register-page-card">

                <h1 className="logo">QUIZZY</h1>
                <h2 className="title">Registro</h2>

                <form className="form">

                    <InputField
                        type="text"
                        placeholder="Nome"
                        icon={FiUser} />

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

                    <Button text="Registrar" />
                </form>

                <p className="register-footer">
                    Já tem uma conta? <span onClick={() => navigate("/login")}>Clique aqui</span>
                </p>

            </div>
        </main>

    );

}