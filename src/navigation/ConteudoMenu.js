import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CabecalhoMenu from './CabecalhoMenu';
import {buscarRotaMenu, rotasMenu} from './rotasMenu';

const COR_INATIVA = 'black';
const COR_SECUNDARIA = '#777';

const rotasPrincipais = rotasMenu.filter(rota => !rota.secundaria);
const rotasSecundarias = rotasMenu.filter(rota => rota.secundaria);

const nomeRotaAtiva = estado => estado.routes[estado.index].name;

const corDoRotulo = (rota, ativo, corAtiva) => {
  if (ativo) {
    return corAtiva;
  }
  return rota.secundaria ? COR_SECUNDARIA : COR_INATIVA;
};

const estiloRotulo = (rota, ativo, corAtiva) => ({
  fontSize: rota.secundaria ? 14 : 17,
  fontWeight: ativo ? 'bold' : 'normal',
  color: corDoRotulo(rota, ativo, corAtiva),
});

const iconeDa = (rota, cor) =>
  rota.icone
    ? ({size}) => <Ionicons name={rota.icone} size={size - 4} color={cor} />
    : undefined;

const ConteudoMenu = props => {
  const nomeAtivo = nomeRotaAtiva(props.state);
  const corAtiva = buscarRotaMenu(nomeAtivo).parametros.cor;

  const renderizarItem = rota => {
    const ativo = rota.nome === nomeAtivo;
    const estilo = estiloRotulo(rota, ativo, corAtiva);
    return (
      <DrawerItem
        key={rota.nome}
        label={rota.obterRotulo()}
        icon={iconeDa(rota, estilo.color)}
        onPress={() => props.navigation.navigate(rota.nome)}
        labelStyle={estilo}
      />
    );
  };

  return (
    <DrawerContentScrollView {...props} style={estilos.conteudo}>
      <CabecalhoMenu cor={corAtiva} />
      {rotasPrincipais.map(renderizarItem)}
      <View style={estilos.separador} />
      {rotasSecundarias.map(renderizarItem)}
    </DrawerContentScrollView>
  );
};

const estilos = StyleSheet.create({
  conteudo: {
    marginTop: -4,
  },
  separador: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCC',
    marginHorizontal: 15,
    marginVertical: 8,
  },
});

export default ConteudoMenu;
