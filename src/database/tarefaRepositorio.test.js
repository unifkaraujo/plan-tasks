import {executarEmTransacao, executarSql} from './executarSql';
import {
  atualizarConclusaoTarefas,
  excluirTarefas,
  inserirTarefas,
} from './tarefaRepositorio';

jest.mock('./executarSql', () => ({
  executarSql: jest.fn(() => Promise.resolve()),
  executarEmTransacao: jest.fn(() => Promise.resolve()),
  linhasDe: jest.fn(() => []),
}));

beforeEach(() => jest.clearAllMocks());

describe('excluirTarefas', () => {
  it('exclui todas as tarefas num único comando SQL', async () => {
    await excluirTarefas([1, 2, 3]);

    expect(executarSql).toHaveBeenCalledTimes(1);
    expect(executarSql).toHaveBeenCalledWith(
      'DELETE FROM tasks WHERE sequencia IN (?, ?, ?)',
      [1, 2, 3],
    );
  });

  it('não acessa o banco quando não há tarefas', async () => {
    await excluirTarefas([]);
    expect(executarSql).not.toHaveBeenCalled();
  });
});

describe('atualizarConclusaoTarefas', () => {
  it('passa a data antes dos ids, na ordem dos marcadores', async () => {
    await atualizarConclusaoTarefas([4, 5], '2026-10-28');

    expect(executarSql).toHaveBeenCalledWith(
      'UPDATE tasks SET datafim = ? WHERE sequencia IN (?, ?)',
      ['2026-10-28', 4, 5],
    );
  });
});

describe('inserirTarefas', () => {
  it('grava todas as tarefas dentro de uma única transação', async () => {
    await inserirTarefas([
      {descricao: 'Treino', dataEstimada: '2026-10-28'},
      {descricao: 'Leitura', dataEstimada: '2026-10-29', observacao: '20 min'},
    ]);

    expect(executarEmTransacao).toHaveBeenCalledTimes(1);
    const [comandos] = executarEmTransacao.mock.calls[0];
    expect(comandos.map(([, parametros]) => parametros)).toEqual([
      ['Treino', '2026-10-28', null],
      ['Leitura', '2026-10-29', '20 min'],
    ]);
  });
});
