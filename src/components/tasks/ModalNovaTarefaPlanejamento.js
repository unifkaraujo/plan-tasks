import React, {useState} from 'react';

import CampoTexto from '../common/CampoTexto';
import ModalFormulario from '../common/ModalFormulario';

const ModalNovaTarefaPlanejamento = ({visivel, cor, aoCancelar, aoSalvar}) => {
  const [descricao, setDescricao] = useState('');

  const salvar = () => {
    aoSalvar(descricao);
    setDescricao('');
  };

  return (
    <ModalFormulario
      visivel={visivel}
      titulo="Nova Tarefa"
      cor={cor}
      aoCancelar={aoCancelar}
      aoSalvar={salvar}>
      <CampoTexto
        placeholder="Informe a Descrição..."
        onChangeText={setDescricao}
        value={descricao}
      />
    </ModalFormulario>
  );
};

export default ModalNovaTarefaPlanejamento;
