import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';

const BotaoExcluir = ({aoPressionar}) => (
  <TouchableOpacity style={estilos.direita} onPress={aoPressionar}>
    <FontAwesomeIcon icon="fa-trash" size={20} color={cores.secundaria} />
  </TouchableOpacity>
);

const DicaExcluir = () => (
  <View style={estilos.esquerda}>
    <FontAwesomeIcon
      icon="fa-trash"
      size={20}
      color={cores.secundaria}
      style={estilos.iconeDica}
    />
    <Text style={estilos.textoDica}> Excluir </Text>
  </View>
);

const DeslizarParaExcluir = ({
  aoExcluir,
  permitirDeslizarDireita = false,
  children,
}) => (
  <GestureHandlerRootView>
    <Swipeable
      renderRightActions={() => <BotaoExcluir aoPressionar={aoExcluir} />}
      renderLeftActions={permitirDeslizarDireita ? DicaExcluir : undefined}
      onSwipeableLeftOpen={aoExcluir}>
      {children}
    </Swipeable>
  </GestureHandlerRootView>
);

const estilos = StyleSheet.create({
  direita: {
    backgroundColor: cores.perigo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  esquerda: {
    flex: 1,
    backgroundColor: cores.perigo,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconeDica: {
    marginLeft: 10,
  },
  textoDica: {
    fontFamily: fontes.principal,
    color: cores.secundaria,
    fontSize: 20,
    margin: 10,
  },
});

export default DeslizarParaExcluir;
