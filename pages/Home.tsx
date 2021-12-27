import {Box, Button} from 'native-base';
import * as React from 'react';
import {View} from 'react-native';

import useStore from '../src/store';

function HomeScreen() {
  const downloadAll = useStore(state => state.downloadAll);
  const onPress = () => {
    downloadAll();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Box>Home Screen</Box>
      <Button onPress={onPress}>Test load</Button>
    </View>
  );
}

export default HomeScreen;
