import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import cores from '../../theme/cores';

const BotaoIcone = ({
  icone,
  aoPressionar,
  tamanho = 20,
  cor = cores.secundaria,
}) => (
  <TouchableOpacity onPress={aoPressionar}>
    <FontAwesomeIcon icon={icone} size={tamanho} color={cor} />
  </TouchableOpacity>
);

export default BotaoIcone;
