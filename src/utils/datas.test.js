import {
  datasBancoEntre,
  deDataBanco,
  formatarDataCurta,
  formatarDiaSemana,
  paraDataBanco,
} from './datas';

describe('datasBancoEntre', () => {
  it('inclui o primeiro e o último dia do período', () => {
    expect(
      datasBancoEntre(new Date(2026, 9, 30), new Date(2026, 10, 2)),
    ).toEqual(['2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02']);
  });

  it('devolve um único dia quando início e fim coincidem', () => {
    const dia = new Date(2026, 9, 28);
    expect(datasBancoEntre(dia, dia)).toEqual(['2026-10-28']);
  });

  it('devolve lista vazia quando o fim é anterior ao início', () => {
    expect(
      datasBancoEntre(new Date(2026, 9, 28), new Date(2026, 9, 27)),
    ).toEqual([]);
  });
});

describe('formatarDiaSemana', () => {
  it('remove o "-feira" e capitaliza o dia útil', () => {
    expect(formatarDiaSemana(new Date(2026, 10, 2))).toBe('Segunda');
  });

  it('mantém o nome do fim de semana', () => {
    expect(formatarDiaSemana(new Date(2026, 9, 31))).toBe('Sábado');
  });
});

describe('conversão de datas do banco', () => {
  it('ida e volta não desloca o dia por causa do fuso horário', () => {
    const data = deDataBanco('2026-10-28');
    expect(paraDataBanco(data)).toBe('2026-10-28');
    expect(formatarDataCurta(data)).toBe('28/10/2026');
  });
});
