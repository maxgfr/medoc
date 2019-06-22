import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Asset } from 'expo-asset';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SQLite } from 'expo-sqlite';

export default class SettingsScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    let file = Asset.fromModule(require("../assets/database/db.sqlite3"));
    console.log(file);
    const db = SQLite.openDatabase("../assets/database/db.sqlite3");
    db.transaction(tx => {
      tx.executeSql(
        'SELECT cis FROM CIP_CIS WHERE cip13 = ?',
        ["3400933254063"],
        (_, { rows: { _array } }) => console.log('yo')
      );
    });

    console.log(db)
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
}
