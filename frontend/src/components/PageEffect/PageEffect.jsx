import { motion } from "framer-motion";

export default function PageTransition({ children }) {
    const animacao = {
        inicial: { opacity: 0, y: 15 }, 
        entrar: { opacity: 1, y: 0 },   
        sair: { opacity: 0, y: -15 }    
    };

    return (
        <motion.div
            initial="inicial"
            animate="entrar"
            exit="sair"
            variants={animacao}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            
            style={{ 
                width: "100%", 
                minHeight: "100vh", 
                position: "absolute", 
                top: 0, 
                left: 0 
            }}
        >
            {children}
        </motion.div>
    );
}