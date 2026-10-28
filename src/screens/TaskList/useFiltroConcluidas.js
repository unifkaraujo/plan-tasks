import {useEffect, useMemo, useState} from 'react';

import {
  carregarMostrarConcluidas,
  salvarMostrarConcluidas,
} from '../../storage/preferenciasTarefas';

const estaPendente = tarefa => tarefa.dataConclusao === null;

export const useFiltroConcluidas = tarefas => {
  const [mostrarConcluidas, setMostrarConcluidas] = useState(true);

  useEffect(() => {
    carregarMostrarConcluidas().then(setMostrarConcluidas);
  }, []);

  const alternarMostrarConcluidas = () => {
    const proximo = !mostrarConcluidas;
    setMostrarConcluidas(proximo);
    salvarMostrarConcluidas(proximo);
  };

  const tarefasVisiveis = useMemo(
    () => (mostrarConcluidas ? tarefas : tarefas.filter(estaPendente)),
    [tarefas, mostrarConcluidas],
  );

  return {tarefasVisiveis, mostrarConcluidas, alternarMostrarConcluidas};
};
