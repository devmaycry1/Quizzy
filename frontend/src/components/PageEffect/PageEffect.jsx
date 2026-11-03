import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  const animacao = {
    inicial: { opacity: 0, scale: 0.96 },
    entrar: { opacity: 1, scale: 1 },
    sair: { opacity: 0, scale: 0.98 },
  };

  return (
    <motion.div
      initial="inicial"
      animate="entrar"
      exit="sair"
      variants={animacao}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Curva de aceleração muito suave
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f131d", // Força o fundo escuro durante a transição para matar a piscada branca
      }}
    >
      {children}
    </motion.div>
  );
}
