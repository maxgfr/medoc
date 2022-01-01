import React from 'react';
import {StyleSheet, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {widthPercentageToDP} from 'react-native-responsive-screen';

type Props = {
  onRead: (e: any) => void;
  topComponent?: any;
  bottomComponent?: any;
  containerStyle?: any;
  children?: any;
};

export const Camera = (props: Props) => {
  return (
    <View style={{...styles.containerStyle, ...props.containerStyle}}>
      <QRCodeScanner
        onRead={props.onRead}
        topContent={props.topComponent}
        bottomContent={props.bottomComponent}
        cameraStyle={styles.cameraStyle}
        containerStyle={styles.cameraStyle}
        showMarker={true}
        cameraProps={{ratio: '1:1'}}
        reactivate={true}
        vibrate={false}
      />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: widthPercentageToDP('100%'),
    width: widthPercentageToDP('100%'),
  },
  cameraStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
