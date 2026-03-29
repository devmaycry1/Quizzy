// src/pages/Splash/Splash.jsx
import "./Splash.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
            <div className="splash-content-wrapper">
                <div className="splash-core-panel">
                    <h1 className="splash-logo">QUIZZY</h1>
                    <p className="splash-text">Teste seus conhecimentos cósmicos</p>
                </div>
            </div>
        </main>
    );
}