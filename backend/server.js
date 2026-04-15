// =============================================
// server.js — Ponto de entrada do backend
// Este arquivo configura e inicia o servidor Express
// =============================================

// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Importa as rotas de geração de currículo
const generateRoute = require("./routes/generate");

// Cria o aplicativo Express
const app = express();

// Define a porta (usa a do .env ou 3001 como padrão)
const PORT = process.env.PORT || 3001;

// =============================================
// MIDDLEWARES
// Middlewares são funções que processam as
// requisições antes de chegarem nas rotas
// =============================================

// Permite que o frontend (React) acesse este backend
// CORS = Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "http://localhost:5173", // Porta padrão do Vite (React)
    methods: ["GET", "POST"],
  })
);

// Permite que o servidor entenda JSON no corpo das requisições
app.use(express.json());

// =============================================
// ROTAS
// =============================================

// Rota de saúde — só para verificar se o servidor está online
app.get("/", (req, res) => {
  res.json({ mensagem: " Servidor do Gerador de Currículos está online!" });
});

// Rotas de geração com IA (prefixo /api)
// Exemplo: POST /api/generate/improve
app.use("/api/generate", generateRoute);

// =============================================
// INICIA O SERVIDOR
// =============================================
app.listen(PORT, () => {
  console.log(`\n Servidor rodando em http://localhost:${PORT}`);
  console.log(`Rotas disponíveis:`);
  console.log(`   GET  /                          → Status do servidor`);
  console.log(`   POST /api/generate/improve      → Melhorar texto com IA`);
  console.log(`   POST /api/generate/softskills   → Sugerir Soft Skills com IA`);
  console.log(`   POST /api/generate/resume       → Gerar currículo completo\n`)
});