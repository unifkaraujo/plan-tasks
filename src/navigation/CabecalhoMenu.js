import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import cores from '../theme/cores';
import fontes from '../theme/fontes';
import {formatarDataCompleta} from '../utils/datas';

const CabecalhoMenu = ({cor}) => (
  <View style={[estilos.cabecalho, {backgroundColor: cor}]}>
    <Text style={estilos.titulo}>Tasks</Text>
    <Text style={estilos.data}>{formatarDataCompleta(new Date())}</Text>
  </View>
);

const estilos = StyleSheet.create({
  cabecalho: {
    height: 110,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  titulo: {
    fontFamily: fontes.principal,
    color: cores.secundaria,
    fontSize: 28,
    fontWeight: 'bold',
  },
  data: {
    fontFamily: fontes.principal,
    color: cores.secundaria,
    fontSize: 15,
    opacity: 0.85,
  },
});

export default CabecalhoMenu;
