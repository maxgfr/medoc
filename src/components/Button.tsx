import {Button as NativeBaseButton} from 'native-base';
import React from 'react';
import {theme} from '../theme';

type Props = {
  onClick: () => void;
  value: string;
};

export function Button({onClick, value}: Props) {
  return (
    <NativeBaseButton mt="5" onPress={onClick} bg={theme.colors.tint}>
      {value}
    </NativeBaseButton>
  );
}
