export const paraTarefa = linha => ({
  id: linha.sequencia,
  descricao: linha.descricao,
  dataEstimada: linha.dataestimada,
  dataConclusao: linha.datafim || null,
  observacao: linha.obs,
});
