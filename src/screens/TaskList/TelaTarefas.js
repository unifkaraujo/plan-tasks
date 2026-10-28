import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import BotaoFlutuante from '../../components/common/BotaoFlutuante';
import ItemTarefa from '../../components/tasks/ItemTarefa';
import ModalOpcoesTarefas from '../../components/tasks/ModalOpcoesTarefas';
import ModalTarefa from '../../components/tasks/ModalTarefa';
import {useAlternar} from '../../hooks/useAlternar';
import {useCorStatusBar} from '../../hooks/useCorStatusBar';
import {confirmar, mostrarDadosInvalidos} from '../../utils/alertas';
import {
  diasAPartirDeHoje,
  formatarDiaEMes,
  formatarDiaSemana,
  paraDataBanco,
} from '../../utils/datas';
import {estaVazio} from '../../utils/validacao';
import CabecalhoTarefas from './CabecalhoTarefas';
import {useFiltroConcluidas} from './useFiltroConcluidas';
import {useFormularioTarefa} from './useFormularioTarefa';
import {useTarefas} from './useTarefas';

const textosCabecalho = (data, somenteEmAberto) =>
  somenteEmAberto
    ? {titulo: 'Em aberto', subtitulo: ''}
    : {titulo: formatarDiaSemana(data), subtitulo: formatarDiaEMes(data)};

const TelaTarefas = ({route}) => {
  const {
    diasAFrente = 0,
    somenteEmAberto = false,
    escolherData = false,
    cor,
    imagem,
  } = route.params;
  const [dataEscolhida, setDataEscolhida] = useState(() =>
    diasAPartirDeHoje(diasAFrente),
  );
  const data = escolherData ? dataEscolhida : diasAPartirDeHoje(diasAFrente);
  const {titulo, subtitulo} = textosCabecalho(data, somenteEmAberto);

  const [opcoesVisiveis, alternarOpcoes, setOpcoesVisiveis] = useAlternar();
  const formulario = useFormularioTarefa(data);
  const tarefas = useTarefas(paraDataBanco(data), somenteEmAberto);
  const filtro = useFiltroConcluidas(tarefas.tarefas);

  useCorStatusBar(cor);

  const salvarTarefa = valores => {
    if (estaVazio(valores.descricao)) {
      return mostrarDadosInvalidos('Descrição não informada!');
    }
    const emEdicao = formulario.tarefaEmEdicao;
    formulario.fechar();
    emEdicao
      ? tarefas.editarTarefa(emEdicao.id, valores)
      : tarefas.adicionarTarefa(valores);
  };

  const confirmarExclusaoTodas = alvos =>
    alvos.length > 0 &&
    confirmar(
      'Excluir tarefas',
      `Deseja excluir ${alvos.length} tarefa(s)?`,
      () => tarefas.removerTodas(alvos),
    );

  const executarOpcao = acao => () => {
    setOpcoesVisiveis(false);
    acao(filtro.tarefasVisiveis);
  };

  const renderizarTarefa = ({item}) => (
    <ItemTarefa
      tarefa={item}
      aoAlternar={tarefas.alternarTarefa}
      aoEditar={formulario.abrirEdicao}
      aoExcluir={tarefas.removerTarefa}
    />
  );

  return (
    <View style={estilos.conteudo}>
      {formulario.aberto && (
        <ModalTarefa
          titulo={formulario.titulo}
          cor={cor}
          valoresIniciais={formulario.valoresIniciais}
          aoCancelar={formulario.fechar}
          aoSalvar={salvarTarefa}
        />
      )}
      <ModalOpcoesTarefas
        visivel={opcoesVisiveis}
        cor={cor}
        aoFechar={() => setOpcoesVisiveis(false)}
        aoMarcarTodas={executarOpcao(tarefas.marcarTodas)}
        aoDesmarcarTodas={executarOpcao(tarefas.desmarcarTodas)}
        aoExcluirTodas={executarOpcao(confirmarExclusaoTodas)}
      />
      <CabecalhoTarefas
        imagem={imagem}
        titulo={titulo}
        subtitulo={subtitulo}
        data={data}
        aoAlterarData={escolherData ? setDataEscolhida : undefined}
        mostrarConcluidas={filtro.mostrarConcluidas}
        aoAlternarConcluidas={
          somenteEmAberto ? undefined : filtro.alternarMostrarConcluidas
        }
        aoAbrirOpcoes={alternarOpcoes}
      />
      <View style={estilos.lista}>
        <FlatList
          data={filtro.tarefasVisiveis}
          keyExtractor={item => String(item.id)}
          renderItem={renderizarTarefa}
        />
      </View>
      <BotaoFlutuante
        icone="fa-plus"
        cor={cor}
        aoPressionar={formulario.abrirNova}
      />
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

export default TelaTarefas;
