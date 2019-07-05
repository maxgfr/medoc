import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SQLite } from 'expo-sqlite';
import { Camera } from 'expo'
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Icon
} from 'native-base';

export default class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      flashlight: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    var base_uri = Asset.fromModule(require('../assets/database/db.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/my_db.db`;
    FileSystem.downloadAsync(base_uri, new_uri)
      .then(() => {
        var db = SQLite.openDatabase('my_db.db');
        db.transaction(
          tx => {
            tx.executeSql(`SELECT cis FROM CIP_CIS WHERE cip13 = ?`, ["3400933254063"], (_, { rows }) =>
              console.log(JSON.stringify(rows))
            );
          },
          (err) => { console.log("Failed Message", err) }
        );
      });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <Camera
          flashMode={this.state.flashlight ? 'on' : 'off'}
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}>
          <Header style={{backgroundColor: "transparent", borderBottomWidth: 0}}>
            <Left>
              <Button style={{marginLeft: 5}} transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name='arrow-back' style={{ color: '#ffffff'}} />
              </Button>
            </Left>
            <Body/>
            <Right>
              <Button style={{marginRight: 5}} transparent onPress={() => {this.setState({flashlight: !this.state.flashlight})}}>
                <Icon name='flashlight' type='Entypo' style={{ color: '#ffffff'}} />
              </Button>
            </Right>
          </Header>

        </Camera>
      </View>
    );
  }
}
