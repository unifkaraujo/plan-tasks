import {useState} from 'react';

import {deDataBanco} from '../../utils/datas';

const valoresDaTarefa = tarefa => ({
  descricao: tarefa.descricao,
  observacao: tarefa.observacao ?? '',
  data: deDataBanco(tarefa.dataEstimada),
});

const valoresVazios = data => ({descricao: '', observacao: '', data});

export const useFormularioTarefa = dataPadrao => {
  const [estado, setEstado] = useState(null);
  const tarefaEmEdicao = estado?.tarefa ?? null;

  return {
    aberto: estado !== null,
    tarefaEmEdicao,
    titulo: tarefaEmEdicao ? 'Editar Tarefa' : 'Nova Tarefa',
    valoresIniciais: tarefaEmEdicao
      ? valoresDaTarefa(tarefaEmEdicao)
      : valoresVazios(dataPadrao),
    abrirNova: () => setEstado({tarefa: null}),
    abrirEdicao: tarefa => setEstado({tarefa}),
    fechar: () => setEstado(null),
  };
};
