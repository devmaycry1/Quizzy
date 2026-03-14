import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login.jsx"
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Splash from "./pages/Splash/Splash.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

      </Routes>
    </BrowserRouter>
  );
}

