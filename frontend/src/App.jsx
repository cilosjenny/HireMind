
import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

function App() {
  const [resumo, setResumo] = useState("");
  const [loading, setLoading] = useState(false);

  const gerarCurriculo = async (dados) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/generate/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();
      setResumo(data.resumoProfissional);
    } catch (error) {
      console.error("Erro:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>HireMind</h1>
      <p>Gerador Inteligente de Currículos</p>

      <ResumeForm onGerar={gerarCurriculo} />

      {loading && <LoadingSpinner />}

      <div className="result">
        <ResumePreview resumo={resumo} />
      </div>
    </div>
  );
}

export default App;