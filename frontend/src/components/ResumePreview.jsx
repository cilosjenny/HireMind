function ResumePreview({ resumo }) {
  if (!resumo) return null;

  return (
    <div>
      <h2>Resultado</h2>
      <p>{resumo}</p>
    </div>
  );
}

export default ResumePreview;