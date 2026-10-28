import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import cores from '../../theme/cores';

const FundoModal = ({aoPressionar, estilo}) => (
  <TouchableWithoutFeedback onPress={aoPressionar}>
    <View style={[estilos.fundo, estilo]} />
  </TouchableWithoutFeedback>
);

const estilos = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: cores.fundoModal,
  },
});

export default FundoModal;
