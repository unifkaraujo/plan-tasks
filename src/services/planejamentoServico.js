import {inserirTarefas} from '../database/tarefaRepositorio';
import {datasBancoEntre} from '../utils/datas';

const tarefasDoPeriodo = (tarefas, dataInicio, dataFim) =>
  datasBancoEntre(dataInicio, dataFim).flatMap(dataEstimada =>
    tarefas.map(({descricao}) => ({descricao, dataEstimada})),
  );

export const salvarPlanejamento = (tarefas, dataInicio, dataFim) =>
  inserirTarefas(tarefasDoPeriodo(tarefas, dataInicio, dataFim));
