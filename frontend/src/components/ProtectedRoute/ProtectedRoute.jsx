import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}