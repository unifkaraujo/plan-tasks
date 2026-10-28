import {useEffect, useState} from 'react';

import {inicializarBanco} from '../database/esquema';
import {mostrarErro} from '../utils/alertas';

export const useBancoPronto = () => {
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    inicializarBanco()
      .catch(mostrarErro)
      .finally(() => setPronto(true));
  }, []);

  return pronto;
};
