import {gravarJson, lerJson} from './armazenamentoJson';

const CHAVE = 'tasksState';

export const carregarMostrarConcluidas = async () =>
  (await lerJson(CHAVE))?.showDoneTasks ?? true;

export const salvarMostrarConcluidas = mostrar =>
  gravarJson(CHAVE, {showDoneTasks: mostrar});
