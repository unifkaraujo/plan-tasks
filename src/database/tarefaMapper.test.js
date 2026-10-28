import {paraTarefa} from './tarefaMapper';

describe('paraTarefa', () => {
  it('traduz as colunas legadas da tabela para o modelo do app', () => {
    expect(
      paraTarefa({
        sequencia: 7,
        descricao: 'Treino',
        dataestimada: '2026-10-28',
        datafim: '2026-10-28',
        obs: 'Às 19h',
      }),
    ).toEqual({
      id: 7,
      descricao: 'Treino',
      dataEstimada: '2026-10-28',
      dataConclusao: '2026-10-28',
      observacao: 'Às 19h',
    });
  });

  it('normaliza a conclusão ausente para null', () => {
    expect(paraTarefa({sequencia: 1, datafim: ''}).dataConclusao).toBeNull();
  });
});
