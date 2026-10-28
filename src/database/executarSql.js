import banco from './conexao';

export const executarSql = (sql, parametros = []) =>
  new Promise((resolve, reject) =>
    banco.transaction(tx =>
      tx.executeSql(
        sql,
        parametros,
        (_, resultado) => resolve(resultado),
        (_, erro) => reject(erro),
      ),
    ),
  );

export const executarEmTransacao = comandos =>
  new Promise((resolve, reject) =>
    banco.transaction(
      tx =>
        comandos.forEach(([sql, parametros = []]) =>
          tx.executeSql(sql, parametros),
        ),
      reject,
      resolve,
    ),
  );

export const linhasDe = resultado => resultado.rows.raw();
