import React, {useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CampoDataAndroid = ({valor, aoAlterar, formatarData, estiloTexto}) => {
  const [aberto, setAberto] = useState(false);

  const tratarAlteracao = (_, data) => {
    setAberto(false);
    data && aoAlterar(data);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setAberto(true)}>
        <Text style={estiloTexto}>{formatarData(valor)}</Text>
      </TouchableOpacity>
      {aberto && (
        <DateTimePicker value={valor} onChange={tratarAlteracao} mode="date" />
      )}
    </View>
  );
};

const CampoDataIos = ({valor, aoAlterar}) => (
  <DateTimePicker
    value={valor}
    onChange={(_, data) => data && aoAlterar(data)}
    mode="date"
  />
);

const CampoData = Platform.select({
  android: CampoDataAndroid,
  default: CampoDataIos,
});

export default CampoData;
