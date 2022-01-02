import {Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../theme';

type Props = {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
};

export function TouchableItem({name, onClick, disabled}: Props) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}
      disabled={disabled}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: theme.colors.itemBackground,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 12,
  },
});
