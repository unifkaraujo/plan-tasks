import SQLite from 'react-native-sqlite-storage';

const registrarErroAbertura = erro =>
  console.error('Erro ao abrir o banco de dados: ', erro);

export default SQLite.openDatabase(
  {name: 'tasks.db', location: 'default'},
  () => {},
  registrarErroAbertura,
);
