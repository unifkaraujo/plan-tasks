import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import cores from '../../theme/cores';

const MarcaConcluida = () => (
  <View style={[estilos.circulo, estilos.concluida]}>
    <FontAwesomeIcon icon="fa-check" size={20} color={cores.secundaria} />
  </View>
);

const MarcaPendente = () => (
  <View style={[estilos.circulo, estilos.pendente]} />
);

const MarcadorTarefa = ({concluida, aoPressionar}) => (
  <TouchableWithoutFeedback onPress={aoPressionar}>
    <View style={estilos.conteudo}>
      {concluida ? <MarcaConcluida /> : <MarcaPendente />}
    </View>
  </TouchableWithoutFeedback>
);

const estilos = StyleSheet.create({
  conteudo: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circulo: {
    height: 25,
    width: 25,
    borderRadius: 13,
  },
  pendente: {
    borderWidth: 1,
    borderColor: '#555',
  },
  concluida: {
    backgroundColor: cores.concluida,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MarcadorTarefa;
