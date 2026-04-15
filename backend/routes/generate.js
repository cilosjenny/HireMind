// =============================================
// routes/generate.js
// Define as rotas da API de geração com IA
// Cada rota recebe dados do frontend e retorna
// a resposta processada pela IA
// =============================================

const express = require("express");
const router = express.Router();

// Importa o serviço de IA que criamos
const aiService = require("../services/aiService");

// =============================================
// ROTA 1: POST /api/generate/improve
// Melhora o texto de experiência com IA
// =============================================
router.post("/improve", async (req, res) => {
  try {
    // Pega o texto enviado pelo frontend
    const { texto } = req.body;

    // Valida se o texto foi enviado
    if (!texto || texto.trim() === "") {
      return res.status(400).json({
        erro: "Texto não pode estar vazio",
      });
    }

    console.log("Melhorando texto:", texto.substring(0, 50) + "...");

    // Chama o serviço de IA para melhorar o texto
    const textoMelhorado = await aiService.melhorarTexto(texto);

    // Retorna o texto melhorado para o frontend
    res.json({
      sucesso: true,
      textoOriginal: texto,
      textoMelhorado: textoMelhorado,
    });
  } catch (erro) {
    console.error("Erro ao melhorar texto:", erro.message);
    res.status(500).json({
      erro: "Erro ao processar com IA. Verifique sua chave de API.",
      detalhes: erro.message,
    });
  }
});

// =============================================
// ROTA 2: POST /api/generate/softskills
// Sugere soft skills com base no perfil
// =============================================
router.post("/softskills", async (req, res) => {
  try {
    // Pega os dados do perfil enviados pelo frontend
    const { experiencia, formacao, habilidades } = req.body;

    console.log("Gerando sugestões de soft skills...");

    // Chama o serviço de IA para sugerir soft skills
    const sugestoes = await aiService.sugerirSoftSkills({
      experiencia,
      formacao,
      habilidades,
    });

    // Retorna as sugestões para o frontend
    res.json({
      sucesso: true,
      ...sugestoes,
    });
  } catch (erro) {
    console.error("Erro ao sugerir soft skills:", erro.message);
    res.status(500).json({
      erro: "Erro ao processar com IA. Verifique sua chave de API.",
      detalhes: erro.message,
    });
  }
});

// =============================================
// ROTA 3: POST /api/generate/resume
// Gera o resumo profissional completo
// =============================================
router.post("/resume", async (req, res) => {
  try {
    // Pega todos os dados do currículo
    const dadosCurriculo = req.body;

    // Valida campos obrigatórios
    if (!dadosCurriculo.nome || !dadosCurriculo.experiencia) {
      return res.status(400).json({
        erro: "Nome e experiência são obrigatórios",
      });
    }

    console.log("Gerando resumo profissional para:", dadosCurriculo.nome);

    // Gera o resumo profissional com IA
    const resumo = await aiService.gerarResumoProfissional(dadosCurriculo);

    res.json({
      sucesso: true,
      resumoProfissional: resumo,
    });
  } catch (erro) {
    console.error("Erro ao gerar resumo:", erro.message);
    res.status(500).json({
      erro: "Erro ao processar com IA. Verifique sua chave de API.",
      detalhes: erro.message,
    });
  }
});

module.exports = router;