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

---

## 🛠️ Como Executar o Projeto

Para rodar o Quizzy localmente na sua máquina, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o **[Node.js](https://nodejs.org/)** instalado na sua máquina.

### Passo a passo

1. **Clone o repositório:**

2. **Acesse as pastas frontend e backend**
Execute no terminal:
cd backend
cd frontend

3. **Instale as dependências:**
Execute no terminal:
npm install
  
4. **Inicie o JSON Server**
Na pasta backend
Execute no terminal:
npm start

5. **Inicie a aplicação React:**
Na pasta frontend
Execute no terminal:
npm run dev

6. **Acesse o navegador:**
Abra http://localhost:5173(ou a porta que foi indicada no seu terminal)    
