import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';
import FundoModal from './FundoModal';

const AcaoModal = ({rotulo, cor, aoPressionar}) => (
  <TouchableOpacity onPress={aoPressionar}>
    <Text style={[estilos.acao, {color: cor}]}> {rotulo} </Text>
  </TouchableOpacity>
);

const ModalFormulario = ({
  visivel,
  titulo,
  cor,
  aoCancelar,
  aoSalvar,
  children,
}) => (
  <Modal transparent visible={visivel} onRequestClose={aoCancelar}>
    <FundoModal aoPressionar={aoCancelar} />
    <View style={estilos.conteudo}>
      <Text style={[estilos.cabecalho, {backgroundColor: cor}]}>
        {' '}
        {titulo}{' '}
      </Text>
      {children}
      <View style={estilos.acoes}>
        <AcaoModal rotulo="Cancelar" cor={cor} aoPressionar={aoCancelar} />
        <AcaoModal rotulo="Salvar" cor={cor} aoPressionar={aoSalvar} />
      </View>
    </View>
    <FundoModal aoPressionar={aoCancelar} />
  </Modal>
);

const estilos = StyleSheet.create({
  conteudo: {
    backgroundColor: cores.secundaria,
  },
  cabecalho: {
    fontFamily: fontes.principal,
    color: cores.secundaria,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  acao: {
    margin: 20,
    marginRight: 30,
  },
});

export default ModalFormulario;
