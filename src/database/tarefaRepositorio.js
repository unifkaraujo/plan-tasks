import {executarEmTransacao, executarSql, linhasDe} from './executarSql';
import {paraTarefa} from './tarefaMapper';

const INSERIR =
  'INSERT INTO tasks (descricao, dataestimada, obs) VALUES (?, ?, ?)';

const marcadores = quantidade => Array(quantidade).fill('?').join(', ');

const parametrosDe = ({descricao, dataEstimada, observacao = null}) => [
  descricao,
  dataEstimada,
  observacao,
];

const executarParaIds = (montarSql, ids, parametros = []) =>
  ids.length
    ? executarSql(montarSql(marcadores(ids.length)), [...parametros, ...ids])
    : Promise.resolve();

const buscarTarefas = async (sql, parametros) =>
  linhasDe(await executarSql(sql, parametros)).map(paraTarefa);

export const buscarTarefasPorData = data =>
  buscarTarefas('SELECT * FROM tasks WHERE dataestimada = ?', [data]);

export const buscarTarefasEmAberto = () =>
  buscarTarefas(
    'SELECT * FROM tasks WHERE datafim IS NULL ORDER BY dataestimada',
  );

export const inserirTarefa = tarefa =>
  executarSql(INSERIR, parametrosDe(tarefa));

export const inserirTarefas = tarefas =>
  executarEmTransacao(tarefas.map(tarefa => [INSERIR, parametrosDe(tarefa)]));

export const atualizarTarefa = (id, tarefa) =>
  executarSql(
    'UPDATE tasks SET descricao = ?, dataestimada = ?, obs = ? WHERE sequencia = ?',
    [...parametrosDe(tarefa), id],
  );

export const atualizarConclusaoTarefas = (ids, dataConclusao) =>
  executarParaIds(
    lista => `UPDATE tasks SET datafim = ? WHERE sequencia IN (${lista})`,
    ids,
    [dataConclusao],
  );

export const excluirTarefas = ids =>
  executarParaIds(
    lista => `DELETE FROM tasks WHERE sequencia IN (${lista})`,
    ids,
  );
