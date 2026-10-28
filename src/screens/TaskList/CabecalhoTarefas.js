import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import BannerCabecalho, {
  estiloTextoCabecalho,
} from '../../components/common/BannerCabecalho';
import BotaoIcone from '../../components/common/BotaoIcone';
import CampoData from '../../components/common/CampoData';
import cores from '../../theme/cores';
import {formatarDiaEMes} from '../../utils/datas';

const Subtitulo = ({texto, data, aoAlterarData}) =>
  aoAlterarData ? (
    <CampoData
      valor={data}
      aoAlterar={aoAlterarData}
      formatarData={formatarDiaEMes}
      estiloTexto={[estilos.subtitulo, estilos.subtituloEditavel]}
    />
  ) : (
    <Text style={estilos.subtitulo}> {texto} </Text>
  );

const CabecalhoTarefas = ({
  imagem,
  titulo,
  subtitulo,
  data,
  aoAlterarData,
  mostrarConcluidas,
  aoAlternarConcluidas,
  aoAbrirOpcoes,
}) => (
  <BannerCabecalho
    imagem={imagem}
    titulo={titulo}
    acoes={
      aoAlternarConcluidas && (
        <BotaoIcone
          icone={mostrarConcluidas ? 'fa-eye' : 'fa-eye-slash'}
          aoPressionar={aoAlternarConcluidas}
        />
      )
    }>
    <View style={estilos.linha}>
      <Subtitulo texto={subtitulo} data={data} aoAlterarData={aoAlterarData} />
      <TouchableOpacity activeOpacity={0.7} onPress={aoAbrirOpcoes}>
        <Ionicons name="ellipsis-vertical" size={30} color={cores.secundaria} />
      </TouchableOpacity>
    </View>
  </BannerCabecalho>
);

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
  },
  subtitulo: {
    ...estiloTextoCabecalho,
    marginLeft: 20,
    marginBottom: 30,
  },
  subtituloEditavel: {
    color: cores.destaque,
    textDecorationLine: 'underline',
  },
});

export default CabecalhoTarefas;
