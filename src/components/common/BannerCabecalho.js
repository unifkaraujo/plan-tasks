import React from 'react';
import {ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';
import BotaoIcone from './BotaoIcone';

const BannerCabecalho = ({imagem, titulo, acoes, children}) => {
  const navegacao = useNavigation();

  return (
    <ImageBackground source={imagem} style={estilos.fundo}>
      <View style={estilos.barraIcones}>
        <BotaoIcone
          icone="fa-bars"
          aoPressionar={() => navegacao.openDrawer()}
        />
        {acoes}
      </View>
      <View style={estilos.barraTitulo}>
        <Text style={estilos.titulo}> {titulo} </Text>
        {children}
      </View>
    </ImageBackground>
  );
};

export const estiloTextoCabecalho = {
  fontFamily: fontes.principal,
  color: cores.secundaria,
  fontSize: 20,
};

const estilos = StyleSheet.create({
  fundo: {
    height: 220,
  },
  barraIcones: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  barraTitulo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  titulo: {
    fontFamily: fontes.principal,
    color: cores.secundaria,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
});

export default BannerCabecalho;
