import {useState} from 'react';

import {salvarPlanejamento} from '../../services/planejamentoServico';
import {confirmar, mostrarErro, mostrarToastSucesso} from '../../utils/alertas';

const criarTarefaPlanejamento = descricao => ({
  id: `${Date.now()}-${Math.random()}`,
  descricao,
});

export const usePlanejamento = () => {
  const [tarefas, setTarefas] = useState([]);
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());

  const adicionarTarefa = descricao =>
    setTarefas(atuais => [...atuais, criarTarefaPlanejamento(descricao)]);

  const removerTarefa = id =>
    setTarefas(atuais => atuais.filter(tarefa => tarefa.id !== id));

  const persistirPlanejamento = async () => {
    try {
      await salvarPlanejamento(tarefas, dataInicio, dataFim);
      setTarefas([]);
      mostrarToastSucesso('Tasks registradas com sucesso!');
    } catch (erro) {
      mostrarErro(erro);
    }
  };

  const confirmarSalvamento = () =>
    confirmar(
      'Confirmação',
      'Deseja realmente salvar as tasks adicionadas?',
      persistirPlanejamento,
    );

  return {
    tarefas,
    dataInicio,
    dataFim,
    setDataInicio,
    setDataFim,
    adicionarTarefa,
    removerTarefa,
    confirmarSalvamento,
  };
};
