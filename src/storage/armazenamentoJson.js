import AsyncStorage from '@react-native-async-storage/async-storage';

const converterOuNulo = json => {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
};

export const lerJson = async chave =>
  converterOuNulo(await AsyncStorage.getItem(chave));

export const gravarJson = (chave, valor) =>
  AsyncStorage.setItem(chave, JSON.stringify(valor));

export const removerItem = chave => AsyncStorage.removeItem(chave);
