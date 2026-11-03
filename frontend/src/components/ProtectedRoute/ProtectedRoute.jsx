// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const verificarSeTokenEValido = (token) => {
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = JSON.parse(atob(payloadBase64));
    const dataExpiracao = payloadJson.exp * 1000;

    return Date.now() <= dataExpiracao;
  } catch (erro) {
    console.error("Token JWT inválido ou corrompido:", erro);
    return false;
  }
};

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  // 2. Bloqueia logo se faltarem as credenciais base
  if (!token || !usuarioLogado) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Chama a função externa para validar o tempo
  const tokenValido = verificarSeTokenEValido(token);

  if (!tokenValido) {
    console.warn(
      "Token expirado. A redirecionar para a página de não autorizado.",
    );

    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");

    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
