import {executarSql, linhasDe} from './executarSql';
import migracoes from './migracoes';

const lerVersao = async () =>
  linhasDe(await executarSql('PRAGMA user_version'))[0].user_version;

const gravarVersao = versao => executarSql(`PRAGMA user_version = ${versao}`);

export const inicializarBanco = async () => {
  for (let versao = await lerVersao(); versao < migracoes.length; versao++) {
    await migracoes[versao]();
    await gravarVersao(versao + 1);
  }
};
