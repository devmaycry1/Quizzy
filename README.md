# 💜 Quizzy

> Uma aplicação web interativa e imersiva de perguntas e respostas (Quiz) construída com React e integrada à API do Open Trivia Database.

## ✨ Funcionalidades

* **Autenticação :** Sistema de cadastro e login de usuários com persistência de sessão.
* **Partidas Personalizadas:** O jogador pode configurar sua partida escolhendo o tema, a dificuldade e a quantidade de perguntas.
* **Perguntas Dinâmicas:** Integração em tempo real com a API pública [Open Trivia DB](https://opentdb.com/), garantindo perguntas variadas e embaralhadas a cada nova partida.
* **Feedback em Tempo Real:** Indicadores visuais imediatos (verde para acerto, vermelho para erro) ao responder uma pergunta, além de um botão de desistência seg.
* **Resultados Inteligentes:** Tela de conclusão com mensagens, ícones (Troféu, Medalhas, Estrela) e cores customizadas, calculadas dinamicamente com base no percentual de aproveitamento do jogador.
* **Roteamento Seguro:** Sistema robusto de proteção de rotas (Guarda-Costas) que impede acessos não autorizados.
* **Tratamento de Exceções de Navegação:** Telas personalizadas, amigáveis e imersivas para erros de rota (Erro 404 - Página Não Encontrada) e tentativas de acesso sem login (Erro 401 - Acesso Restrito).

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **[React (Vite)](https://vitejs.dev/)
* **[JSON Server](https://github.com/typicode/json-server)
* **CSS3
