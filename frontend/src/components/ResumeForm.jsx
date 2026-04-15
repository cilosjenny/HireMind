import { useState } from "react";

function ResumeForm({ onGerar }) {
  const [nome, setNome] = useState("");
  const [experiencia, setExperiencia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onGerar({
      nome,
      experiencia,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Gerador de Currículo</h2>

      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <textarea
        placeholder="Descreva sua experiência"
        value={experiencia}
        onChange={(e) => setExperiencia(e.target.value)}
      />

      <button type="submit">Gerar Currículo</button>
    </form>
  );
}

export default ResumeForm;