import {VStack, Input, Icon} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onChange: (value: string) => void;
};

export function Search({onChange}: Props) {
  return (
    <VStack width="100%" space={5} alignItems="center" mt="5">
      <Input
        placeholder="Recherchez un médicament"
        bg="transparent"
        width="100%"
        borderRadius="4"
        py="3"
        px="1"
        onChangeText={onChange}
        color="gray.400"
        InputLeftElement={
          <Icon
            m="2"
            ml="3"
            size="6"
            color="gray.400"
            as={<MaterialIcons name="search" />}
          />
        }
      />
    </VStack>
  );
}
