import {executarEmTransacao, executarSql, linhasDe} from './executarSql';

const colunasDaTabela = async tabela =>
  linhasDe(await executarSql(`PRAGMA table_info(${tabela})`)).map(
    coluna => coluna.name,
  );

const criarTabelaTarefas = () =>
  executarSql(`CREATE TABLE IF NOT EXISTS tasks (
    sequencia INTEGER PRIMARY KEY AUTOINCREMENT,
    dataestimada date,
    datafim date,
    descricao varchar(100),
    obs varchar(200)
  );`);

const garantirColunaObservacao = async () => {
  if (!(await colunasDaTabela('tasks')).includes('obs')) {
    await executarSql('ALTER TABLE tasks ADD obs varchar(200)');
  }
};

const criarIndicesDeData = () =>
  executarEmTransacao([
    [
      'CREATE INDEX IF NOT EXISTS idx_tasks_dataestimada ON tasks (dataestimada)',
    ],
    ['CREATE INDEX IF NOT EXISTS idx_tasks_datafim ON tasks (datafim)'],
  ]);

export default [
  criarTabelaTarefas,
  garantirColunaObservacao,
  criarIndicesDeData,
];
