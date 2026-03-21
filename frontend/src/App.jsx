import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash/Splash.jsx";
import Login from "./pages/Login/Login.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Home from "./pages/Home/Home.jsx";
import Quiz from "./pages/Quiz/Quiz.jsx";
import Resultado from "./pages/Resultado/Resultado.jsx";
import Unauthorized from "./pages/Unathorized/Unauthorized.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resultado" element={<Resultado />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

