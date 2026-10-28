import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  atualizarConclusaoTarefas,
  atualizarTarefa,
  buscarTarefasEmAberto,
  buscarTarefasPorData,
  excluirTarefas,
  inserirTarefa,
} from '../../database/tarefaRepositorio';
import {mostrarErro} from '../../utils/alertas';
import {dataBancoHoje, paraDataBanco} from '../../utils/datas';

const buscarTarefasDaTela = (dataBanco, somenteEmAberto) =>
  somenteEmAberto ? buscarTarefasEmAberto() : buscarTarefasPorData(dataBanco);

const conclusaoAlternada = tarefa =>
  tarefa.dataConclusao ? null : dataBancoHoje();

const idsDe = tarefas => tarefas.map(tarefa => tarefa.id);

const estaConcluida = tarefa => tarefa.dataConclusao !== null;

const paraRegistro = ({descricao, observacao, data}) => ({
  descricao: descricao.trim(),
  observacao: observacao?.trim() || null,
  dataEstimada: paraDataBanco(data),
});

export const useTarefas = (dataBanco, somenteEmAberto) => {
  const [tarefas, setTarefas] = useState([]);

  const carregarTarefas = useCallback(async () => {
    try {
      setTarefas(await buscarTarefasDaTela(dataBanco, somenteEmAberto));
    } catch (erro) {
      mostrarErro(erro);
    }
  }, [dataBanco, somenteEmAberto]);

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [carregarTarefas]),
  );

  const executarERecarregar = async acao => {
    try {
      await acao();
    } catch (erro) {
      mostrarErro(erro);
    }
    await carregarTarefas();
  };

  const adicionarTarefa = valores =>
    executarERecarregar(() => inserirTarefa(paraRegistro(valores)));

  const editarTarefa = (id, valores) =>
    executarERecarregar(() => atualizarTarefa(id, paraRegistro(valores)));

  const alternarTarefa = tarefa =>
    executarERecarregar(() =>
      atualizarConclusaoTarefas([tarefa.id], conclusaoAlternada(tarefa)),
    );

  const removerTarefa = id => executarERecarregar(() => excluirTarefas([id]));

  const removerTodas = alvos =>
    executarERecarregar(() => excluirTarefas(idsDe(alvos)));

  const marcarTodas = alvos =>
    executarERecarregar(() =>
      atualizarConclusaoTarefas(
        idsDe(alvos.filter(tarefa => !estaConcluida(tarefa))),
        dataBancoHoje(),
      ),
    );

  const desmarcarTodas = alvos =>
    executarERecarregar(() =>
      atualizarConclusaoTarefas(idsDe(alvos.filter(estaConcluida)), null),
    );

  return {
    tarefas,
    adicionarTarefa,
    editarTarefa,
    alternarTarefa,
    removerTarefa,
    removerTodas,
    marcarTodas,
    desmarcarTodas,
  };
};
