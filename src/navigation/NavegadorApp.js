import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import ConteudoMenu from './ConteudoMenu';
import {ROTA_INICIAL_MENU, rotasMenu} from './rotasMenu';

const Menu = createDrawerNavigator();

const renderizarConteudoMenu = props => <ConteudoMenu {...props} />;

const NavegadorApp = () => (
  <NavigationContainer>
    <Menu.Navigator
      initialRouteName={ROTA_INICIAL_MENU}
      screenOptions={{headerShown: false}}
      drawerContent={renderizarConteudoMenu}>
      {rotasMenu.map(rota => (
        <Menu.Screen
          key={rota.nome}
          name={rota.nome}
          component={rota.componente}
          initialParams={rota.parametros}
        />
      ))}
    </Menu.Navigator>
  </NavigationContainer>
);

export default NavegadorApp;
