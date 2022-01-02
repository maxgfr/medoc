import {Box} from 'native-base';
import React from 'react';
import {Alert} from 'react-native';
import {BarCodeReadEvent} from 'react-native-camera';
import {CameraProps} from '../App';
import {Camera} from '../src/components/Camera';
import useStore from '../src/store';
import {theme} from '../src/theme';

export default function CameraScreen({navigation}: CameraProps) {
  const {searchByCip13} = useStore(state => ({
    searchByCip13: state.searchByCip13,
  }));
  const onRead = (e: BarCodeReadEvent) => {
    const type: string = e.type;
    if (type === 'DATA_MATRIX') {
      searchByCip13(e.data.substring(4, 17));
      navigation.navigate('Médicament');
    } else if (type === 'CODE_128') {
      searchByCip13(e.data);
      navigation.navigate('Médicament');
    } else {
      Alert.alert('Code invalide');
    }
  };
  return (
    <Box bg={theme.colors.background} width="100%" height="100%" px="5">
      <Camera onRead={onRead} />
    </Box>
  );
}
