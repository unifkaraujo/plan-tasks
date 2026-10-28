import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import BannerCabecalho, {
  estiloTextoCabecalho,
} from '../../components/common/BannerCabecalho';
import CampoData from '../../components/common/CampoData';
import cores from '../../theme/cores';
import {formatarDataCurta} from '../../utils/datas';

const DataIntervalo = ({valor, aoAlterar}) => (
  <CampoData
    valor={valor}
    aoAlterar={aoAlterar}
    formatarData={formatarDataCurta}
    estiloTexto={estilos.data}
  />
);

const CabecalhoPlanejamento = ({
  imagem,
  dataInicio,
  dataFim,
  aoAlterarInicio,
  aoAlterarFim,
}) => (
  <BannerCabecalho imagem={imagem} titulo="Planejamento">
    <View style={estilos.linha}>
      <Text style={[estilos.texto, estilos.primeiroTexto]}> De </Text>
      <DataIntervalo valor={dataInicio} aoAlterar={aoAlterarInicio} />
      <Text style={estilos.texto}> até </Text>
      <DataIntervalo valor={dataFim} aoAlterar={aoAlterarFim} />
    </View>
  </BannerCabecalho>
);

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
  },
  texto: estiloTextoCabecalho,
  primeiroTexto: {
    marginLeft: 20,
    marginBottom: 30,
  },
  data: {
    ...estiloTextoCabecalho,
    color: cores.destaque,
    textDecorationLine: 'underline',
  },
});

export default CabecalhoPlanejamento;
