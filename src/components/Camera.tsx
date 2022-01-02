import React from 'react';
import {StyleSheet} from 'react-native';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';

type Props = {
  onRead: RNQRCodeScannerProps['onRead'];
};

export const Camera = (props: Props) => {
  return (
    <QRCodeScanner
      onRead={props.onRead}
      cameraStyle={styles.cameraStyle}
      containerStyle={styles.cameraStyle}
      showMarker={true}
      reactivate={true}
      vibrate={true}
    />
  );
};

const styles = StyleSheet.create({
  cameraStyle: {
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
