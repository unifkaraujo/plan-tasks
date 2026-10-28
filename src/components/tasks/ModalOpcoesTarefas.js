import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import cores from '../../theme/cores';
import FundoModal from '../common/FundoModal';

const ItemOpcao = ({rotulo, aoPressionar}) => (
  <TouchableOpacity style={estilos.opcao} onPress={aoPressionar}>
    <Text style={estilos.textoOpcao}> {rotulo} </Text>
  </TouchableOpacity>
);

const ModalOpcoesTarefas = ({
  visivel,
  cor,
  aoFechar,
  aoMarcarTodas,
  aoDesmarcarTodas,
  aoExcluirTodas,
}) => (
  <Modal transparent visible={visivel} onRequestClose={aoFechar}>
    <FundoModal aoPressionar={aoFechar} estilo={estilos.areaSuperior} />
    <View style={estilos.ancora}>
      <View style={[estilos.caixa, {backgroundColor: cor}]}>
        <ItemOpcao rotulo="Marcar todos" aoPressionar={aoMarcarTodas} />
        <ItemOpcao rotulo="Desmarcar todos" aoPressionar={aoDesmarcarTodas} />
        <ItemOpcao rotulo="Deletar todos" aoPressionar={aoExcluirTodas} />
      </View>
    </View>
    <FundoModal aoPressionar={aoFechar} estilo={estilos.areaInferior} />
  </Modal>
);

const estilos = StyleSheet.create({
  areaSuperior: {
    flex: 0,
    height: 140,
    backgroundColor: 'transparent',
  },
  areaInferior: {
    backgroundColor: 'transparent',
  },
  ancora: {
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 60,
  },
  caixa: {
    alignItems: 'flex-start',
    borderRadius: 10,
    padding: 5,
  },
  opcao: {
    padding: 5,
  },
  textoOpcao: {
    color: cores.secundaria,
    fontSize: 16,
  },
});

export default ModalOpcoesTarefas;
