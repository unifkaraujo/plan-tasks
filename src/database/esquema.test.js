import {inicializarBanco} from './esquema';
import {executarSql, linhasDe} from './executarSql';
import migracoes from './migracoes';

jest.mock('./executarSql', () => ({
  executarSql: jest.fn(() => Promise.resolve()),
  linhasDe: jest.fn(),
}));

jest.mock('./migracoes', () => [jest.fn(), jest.fn(), jest.fn()]);

const versaoAtualDoBanco = versao =>
  linhasDe.mockReturnValue([{user_version: versao}]);

beforeEach(() => jest.clearAllMocks());

describe('inicializarBanco', () => {
  it('roda todas as migrações num banco novo e grava cada versão', async () => {
    versaoAtualDoBanco(0);

    await inicializarBanco();

    migracoes.forEach(migrar => expect(migrar).toHaveBeenCalledTimes(1));
    expect(executarSql).toHaveBeenCalledWith('PRAGMA user_version = 3');
  });

  it('roda só as migrações pendentes', async () => {
    versaoAtualDoBanco(2);

    await inicializarBanco();

    expect(migracoes[0]).not.toHaveBeenCalled();
    expect(migracoes[1]).not.toHaveBeenCalled();
    expect(migracoes[2]).toHaveBeenCalledTimes(1);
  });

  it('não faz nada quando o banco já está na última versão', async () => {
    versaoAtualDoBanco(3);

    await inicializarBanco();

    migracoes.forEach(migrar => expect(migrar).not.toHaveBeenCalled());
  });
});
