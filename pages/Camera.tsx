import {Box} from 'native-base';
import React from 'react';
import {Camera} from '../src/components/Camera';
import {theme} from '../src/theme';

export default function CameraScreen() {
  const onRead = (data: string) => {
    console.log(data);
  };
  return (
    <Box bg={theme.colors.background} width="100%" height="100%" px="5">
      <Camera onRead={onRead} />
    </Box>
  );
}
