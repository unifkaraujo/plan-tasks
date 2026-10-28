import React, {useEffect} from 'react';

import {registrarIcones} from './config/icones';
import {useBancoPronto} from './hooks/useBancoPronto';
import {aplicarCorStatusBar} from './hooks/useCorStatusBar';
import NavegadorApp from './navigation/NavegadorApp';
import cores from './theme/cores';

registrarIcones();

const App = () => {
  const bancoPronto = useBancoPronto();

  useEffect(() => {
    aplicarCorStatusBar(cores.hoje);
  }, []);

  return bancoPronto ? <NavegadorApp /> : null;
};

export default App;
