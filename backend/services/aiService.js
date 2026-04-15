const Groq = require("groq-sdk");

// Inicializa cliente
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// =============================================
// FUNÇÃO PRINCIPAL: chama IA com segurança
// =============================================
async function chamarIA(prompt) {
  try {
    const resposta = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 600,
      temperature: 0.7, // deixa resposta mais natural
    });

    return resposta.choices[0]?.message?.content?.trim();
  } catch (erro) {
    console.error("Erro no Groq:", erro.message);

    // fallback (NUNCA quebra teu sistema)
    return "Profissional com boa comunicação, proatividade e capacidade de trabalhar em equipe, com foco em resultados e aprendizado contínuo.";
  }
}

// =============================================
// FUNÇÃO: melhora experiência
// =============================================
async function melhorarTexto(textoOriginal) {
  const prompt = `Você é um especialista em recursos humanos e currículos profissionais.

Reescreva o texto abaixo para currículo, deixando mais profissional, direto e impactante.

REGRAS:
- Português brasileiro
- Use verbos de ação no passado
- Seja objetivo (máx. 3 frases)
- Não invente informações

TEXTO:
"${textoOriginal}"

Retorne apenas o texto final.`;

  return await chamarIA(prompt);
}

// =============================================
// FUNÇÃO: sugere soft skills
// =============================================
async function sugerirSoftSkills(dadosPerfil) {
  const prompt = `Você é especialista em desenvolvimento profissional.

Com base no perfil abaixo, gere 6 soft skills relevantes.

PERFIL:
- Experiência: ${dadosPerfil.experiencia || "Não informado"}
- Formação: ${dadosPerfil.formacao || "Não informado"}
- Habilidades: ${dadosPerfil.habilidades || "Não informado"}

Responda SOMENTE com JSON puro:
{"softskills":[{"nome":"Skill","descricao":"Descrição curta"}]}`;

  const resposta = await chamarIA(prompt);

  try {
    const jsonLimpo = resposta.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonLimpo);
  } catch (erro) {
    console.error("Erro ao converter JSON:", erro.message);

    return {
      softskills: [
        { nome: "Comunicação", descricao: "Expressa ideias com clareza." },
        { nome: "Proatividade", descricao: "Toma iniciativa." },
        { nome: "Trabalho em equipe", descricao: "Colabora com outros." },
        { nome: "Organização", descricao: "Gerencia tarefas com eficiência." },
        { nome: "Adaptabilidade", descricao: "Lida bem com mudanças." },
        { nome: "Responsabilidade", descricao: "Cumpre prazos e compromissos." },
      ],
    };
  }
}

// =============================================
// FUNÇÃO: resumo profissional
// =============================================
async function gerarResumoProfissional(dadosCurriculo) {
 const prompt = `Você é um recrutador experiente.

Crie um resumo profissional forte e atrativo para currículo.

DADOS:
Nome: ${dadosCurriculo.nome}
Experiência: ${dadosCurriculo.experiencia}
Formação: ${dadosCurriculo.formacao}
Habilidades: ${dadosCurriculo.habilidades}

REGRAS:
- 2 a 3 frases
- linguagem profissional e moderna
- destaque impacto e resultados
- evite frases genéricas
- Evite frases genéricas como "profissional dedicado"
- Use palavras diferentes a cada resposta
- Personalize com base nos dados fornecidos
- Destaque um diferencial único do candidato

Retorne apenas o texto final.`;
  return await chamarIA(prompt);
}

module.exports = {
  melhorarTexto,
  sugerirSoftSkills,
  gerarResumoProfissional,
};