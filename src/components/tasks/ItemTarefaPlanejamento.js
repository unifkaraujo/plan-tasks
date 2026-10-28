import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';
import DeslizarParaExcluir from '../common/DeslizarParaExcluir';

const ItemTarefaPlanejamento = ({tarefa, aoExcluir}) => (
  <DeslizarParaExcluir aoExcluir={() => aoExcluir(tarefa.id)}>
    <View style={estilos.conteudo}>
      <Text style={estilos.descricao}>{tarefa.descricao}</Text>
    </View>
  </DeslizarParaExcluir>
);

const estilos = StyleSheet.create({
  conteudo: {
    flexDirection: 'row',
    borderColor: cores.borda,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: cores.secundaria,
  },
  descricao: {
    fontFamily: fontes.principal,
    color: cores.textoPrincipal,
    fontSize: 15,
  },
});

export default ItemTarefaPlanejamento;
