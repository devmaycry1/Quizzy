import "./Splash.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Splash() {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 2500);

        return () => clearTimeout(timer);

    }, [navigate]);

    return (
        <main className="splash-page">
            <div className="splash-content">
                <h1 className="splash-logo">QUIZZY</h1>
                <p className="splash-text">Teste seus conhecimentos</p>
            </div>
        </main>
    )
}