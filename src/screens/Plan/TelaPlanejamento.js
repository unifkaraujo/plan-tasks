import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';

import BotaoFlutuante from '../../components/common/BotaoFlutuante';
import ItemTarefaPlanejamento from '../../components/tasks/ItemTarefaPlanejamento';
import ModalNovaTarefaPlanejamento from '../../components/tasks/ModalNovaTarefaPlanejamento';
import {useCorStatusBar} from '../../hooks/useCorStatusBar';
import {mostrarDadosInvalidos} from '../../utils/alertas';
import {estaVazio} from '../../utils/validacao';
import CabecalhoPlanejamento from './CabecalhoPlanejamento';
import {usePlanejamento} from './usePlanejamento';

const TelaPlanejamento = ({route}) => {
  const {cor, imagem} = route.params;
  const [novaTarefaVisivel, setNovaTarefaVisivel] = useState(false);
  const planejamento = usePlanejamento();

  useCorStatusBar(cor);

  const salvarTarefa = descricao => {
    if (estaVazio(descricao)) {
      return mostrarDadosInvalidos('Descrição não informada!');
    }
    setNovaTarefaVisivel(false);
    planejamento.adicionarTarefa(descricao);
  };

  const renderizarTarefa = ({item}) => (
    <ItemTarefaPlanejamento
      tarefa={item}
      aoExcluir={planejamento.removerTarefa}
    />
  );

  return (
    <View style={estilos.conteudo}>
      <ModalNovaTarefaPlanejamento
        visivel={novaTarefaVisivel}
        cor={cor}
        aoCancelar={() => setNovaTarefaVisivel(false)}
        aoSalvar={salvarTarefa}
      />
      <CabecalhoPlanejamento
        imagem={imagem}
        dataInicio={planejamento.dataInicio}
        dataFim={planejamento.dataFim}
        aoAlterarInicio={planejamento.setDataInicio}
        aoAlterarFim={planejamento.setDataFim}
      />
      <View style={estilos.lista}>
        <FlatList
          data={planejamento.tarefas}
          keyExtractor={item => item.id}
          renderItem={renderizarTarefa}
        />
      </View>
      <BotaoFlutuante
        icone="fa-plus"
        cor={cor}
        distanciaInferior={90}
        aoPressionar={() => setNovaTarefaVisivel(true)}
      />
      <BotaoFlutuante
        icone="fa-save"
        tamanhoIcone={30}
        cor={cor}
        aoPressionar={planejamento.confirmarSalvamento}
      />
      <Toast position="bottom" />
    </View>
  );
};

const estilos = StyleSheet.create({
  conteudo: {
    flex: 1,
  },
  lista: {
    flex: 7,
  },
});

export default TelaPlanejamento;
