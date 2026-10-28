import {estaVazio} from './validacao';

describe('estaVazio', () => {
  it.each([undefined, null, '', '   '])('considera %p vazio', valor => {
    expect(estaVazio(valor)).toBe(true);
  });

  it('aceita texto com conteúdo', () => {
    expect(estaVazio(' Treino ')).toBe(false);
  });
});
