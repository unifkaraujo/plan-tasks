import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import cores from '../../theme/cores';
import fontes from '../../theme/fontes';
import {formatarDataCompleta} from '../../utils/datas';
import CampoData from '../common/CampoData';
import CampoTexto from '../common/CampoTexto';
import ModalFormulario from '../common/ModalFormulario';

const ModalTarefa = ({titulo, cor, valoresIniciais, aoCancelar, aoSalvar}) => {
  const [descricao, setDescricao] = useState(valoresIniciais.descricao);
  const [observacao, setObservacao] = useState(valoresIniciais.observacao);
  const [data, setData] = useState(valoresIniciais.data);

  return (
    <ModalFormulario
      visivel
      titulo={titulo}
      cor={cor}
      aoCancelar={aoCancelar}
      aoSalvar={() => aoSalvar({descricao, observacao, data})}>
      <CampoTexto
        placeholder="Informe a Descrição..."
        onChangeText={setDescricao}
        value={descricao}
      />
      <CampoTexto
        multilinha
        placeholder="Observação (opcional)"
        onChangeText={setObservacao}
        value={observacao}
      />
      <CampoData
        valor={data}
        aoAlterar={setData}
        formatarData={formatarDataCompleta}
        estiloTexto={estilos.data}
      />
    </ModalFormulario>
  );
};

const estilos = StyleSheet.create({
  data: {
    color: cores.placeholder,
    fontFamily: fontes.principal,
    fontSize: 20,
    marginLeft: 15,
    marginTop: 15,
  },
});

export default ModalTarefa;
