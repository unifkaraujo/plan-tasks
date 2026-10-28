import {useCallback} from 'react';
import {StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export const aplicarCorStatusBar = cor => {
  StatusBar.setBackgroundColor(cor);
  StatusBar.setBarStyle('light-content');
};

export const useCorStatusBar = cor =>
  useFocusEffect(useCallback(() => aplicarCorStatusBar(cor), [cor]));
