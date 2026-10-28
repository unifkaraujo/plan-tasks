import {useCallback, useState} from 'react';

export const useAlternar = (valorInicial = false) => {
  const [valor, setValor] = useState(valorInicial);
  const alternar = useCallback(() => setValor(atual => !atual), []);
  return [valor, alternar, setValor];
};
