import {inserirTarefas} from '../database/tarefaRepositorio';
import {salvarPlanejamento} from './planejamentoServico';

jest.mock('../database/tarefaRepositorio', () => ({
  inserirTarefas: jest.fn(() => Promise.resolve()),
}));

describe('salvarPlanejamento', () => {
  it('replica cada tarefa em todos os dias do período, numa única gravação', async () => {
    await salvarPlanejamento(
      [
        {id: 'a', descricao: 'Treino'},
        {id: 'b', descricao: 'Leitura'},
      ],
      new Date(2026, 9, 28),
      new Date(2026, 9, 30),
    );

    expect(inserirTarefas).toHaveBeenCalledTimes(1);
    expect(inserirTarefas).toHaveBeenCalledWith([
      {descricao: 'Treino', dataEstimada: '2026-10-28'},
      {descricao: 'Leitura', dataEstimada: '2026-10-28'},
      {descricao: 'Treino', dataEstimada: '2026-10-29'},
      {descricao: 'Leitura', dataEstimada: '2026-10-29'},
      {descricao: 'Treino', dataEstimada: '2026-10-30'},
      {descricao: 'Leitura', dataEstimada: '2026-10-30'},
    ]);
  });
});
