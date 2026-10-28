import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import cores from '../../theme/cores';

const BotaoFlutuante = ({
  icone,
  cor,
  aoPressionar,
  tamanhoIcone = 20,
  distanciaInferior = 30,
}) => (
  <TouchableOpacity
    style={[estilos.botao, {backgroundColor: cor, bottom: distanciaInferior}]}
    activeOpacity={0.7}
    onPress={aoPressionar}>
    <FontAwesomeIcon
      icon={icone}
      size={tamanhoIcone}
      color={cores.secundaria}
    />
  </TouchableOpacity>
);

const estilos = StyleSheet.create({
  botao: {
    position: 'absolute',
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BotaoFlutuante;
