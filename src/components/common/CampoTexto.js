import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';

const CampoTexto = ({multilinha = false, ...props}) => (
  <TextInput
    style={[estilos.campo, multilinha && estilos.multilinha]}
    placeholderTextColor={cores.placeholder}
    multiline={multilinha}
    {...props}
  />
);

const estilos = StyleSheet.create({
  campo: {
    fontFamily: fontes.principal,
    color: '#000',
    height: 40,
    marginHorizontal: 15,
    marginTop: 15,
    paddingHorizontal: 10,
    backgroundColor: cores.secundaria,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  multilinha: {
    height: undefined,
    minHeight: 80,
    maxHeight: 160,
    paddingVertical: 8,
    textAlignVertical: 'top',
  },
});

export default CampoTexto;
