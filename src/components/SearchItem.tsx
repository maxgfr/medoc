import {Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../theme';

type Props = {
  name: string;
  onClick: () => void;
};

export function SearchItem({name, onClick}: Props) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
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
  },
  text: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: 12,
  },
});
