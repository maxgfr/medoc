import React from 'react';
import {Modal as NativeBaseModal, Progress, Text} from 'native-base';
import {theme} from '../theme';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {ActivityIndicator} from 'react-native';

type Props = {
  visible: boolean;
  content: string;
  hasLoader?: boolean;
  progress?: number;
};

export function Modal({visible, content, hasLoader, progress}: Props) {
  return (
    <NativeBaseModal isOpen={visible} size={'lg'}>
      <NativeBaseModal.Content
        bg={theme.colors.modalBackground}
        width={widthPercentageToDP('90%')}
        height={widthPercentageToDP('50%')}>
        <NativeBaseModal.Body
          justifyContent={'center'}
          alignItems={'center'}
          height={widthPercentageToDP('50%')}>
          <Text color={theme.colors.text} mb="5" textAlign={'center'}>
            {content}
          </Text>
          {progress ? (
            <Progress
              value={progress}
              colorScheme="light"
              mb={hasLoader ? '5' : '0'}
              bg={theme.colors.text}
              width="80%"
            />
          ) : null}
          {hasLoader && (
            <ActivityIndicator size="large" color={theme.colors.text} />
          )}
        </NativeBaseModal.Body>
      </NativeBaseModal.Content>
    </NativeBaseModal>
  );
}
