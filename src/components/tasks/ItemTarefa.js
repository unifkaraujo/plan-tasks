import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';
import {formatarDiaEMes} from '../../utils/datas';
import DeslizarParaExcluir from '../common/DeslizarParaExcluir';
import MarcadorTarefa from './MarcadorTarefa';

const ObservacaoTarefa = ({texto}) => (
  <Text style={estilos.observacao} numberOfLines={2}>
    {texto}
  </Text>
);

const ItemTarefa = ({tarefa, aoAlternar, aoEditar, aoExcluir}) => {
  const concluida = tarefa.dataConclusao !== null;
  const dataExibida = formatarDiaEMes(
    tarefa.dataConclusao || tarefa.dataEstimada,
  );

  return (
    <DeslizarParaExcluir
      aoExcluir={() => aoExcluir(tarefa.id)}
      permitirDeslizarDireita>
      <View style={estilos.conteudo}>
        <MarcadorTarefa
          concluida={concluida}
          aoPressionar={() => aoAlternar(tarefa)}
        />
        <TouchableOpacity
          style={estilos.informacoes}
          activeOpacity={0.6}
          onPress={() => aoEditar(tarefa)}>
          <Text
            style={[estilos.descricao, concluida && estilos.riscada]}
            numberOfLines={2}>
            {tarefa.descricao}
          </Text>
          {tarefa.observacao ? (
            <ObservacaoTarefa texto={tarefa.observacao} />
          ) : null}
          <Text style={estilos.data}>{dataExibida}</Text>
        </TouchableOpacity>
      </View>
    </DeslizarParaExcluir>
  );
};

const estilos = StyleSheet.create({
  conteudo: {
    flex: 1,
    flexDirection: 'row',
    borderColor: cores.borda,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: cores.secundaria,
  },
  informacoes: {
    flex: 1,
    paddingRight: 15,
  },
  descricao: {
    fontFamily: fontes.principal,
    color: cores.textoPrincipal,
    fontSize: 15,
  },
  riscada: {
    textDecorationLine: 'line-through',
  },
  observacao: {
    fontFamily: fontes.principal,
    color: '#9A9A9A',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 2,
  },
  data: {
    fontFamily: fontes.principal,
    color: cores.textoSecundario,
    marginTop: 2,
  },
});

export default ItemTarefa;
