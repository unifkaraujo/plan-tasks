import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

const mensagemDoErro = erro => erro?.response?.data ?? erro;

export const mostrarErro = erro =>
  Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${mensagemDoErro(erro)}`);

export const mostrarSucesso = mensagem => Alert.alert('Sucesso!', mensagem);

export const mostrarDadosInvalidos = mensagem =>
  Alert.alert('Dados Inválidos', mensagem);

export const mostrarToastSucesso = mensagem =>
  Toast.show({type: 'success', text1: mensagem});

export const confirmar = (titulo, mensagem, aoConfirmar) =>
  Alert.alert(titulo, mensagem, [
    {text: 'Sim', onPress: aoConfirmar},
    {text: 'Não'},
  ]);
