import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // <-- Importe o Framer Motion

import Splash from "./pages/Splash/Splash";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Resultado from "./pages/Resultado/Resultado";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import NotFound from "./pages/NotFound/NotFound";
import CriarQuiz from "./pages/CriarQuiz/CriarQuiz";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PageTransition from "./components/PageEffect/PageEffect";
import QuizzesCriados from "./pages/QuizzesCriados/QuizzesCriados";

function RotasAnimadas() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>

        <Route path="/" element={<PageTransition><Splash /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/cadastro" element={<PageTransition><Cadastro /></PageTransition>} />
        <Route path="/unauthorized" element={<PageTransition><Unauthorized /></PageTransition>} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/quiz" element={<PageTransition><Quiz /></PageTransition>} />
          <Route path="/resultado" element={<PageTransition><Resultado /></PageTransition>} />
          <Route path="/criar-quiz" element={<PageTransition><CriarQuiz /></PageTransition>} />
          <Route path="/meus-quizzes" element={<PageTransition><QuizzesCriados /></PageTransition>} />
        </Route>

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />

      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RotasAnimadas />
    </BrowserRouter>
  );
}