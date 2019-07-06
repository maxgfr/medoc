import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { SQLite } from 'expo-sqlite';
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
      codeCIS: '',
      scanError: false,
      isRunning: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(this.state.isRunning) {
      return;
    }
    if(data.length == 13 && !this.state.scanError) {
      this.setState({isRunning: true});
      var base_uri = Asset.fromModule(require('../assets/database/db.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/my_db.db`;
      FileSystem.downloadAsync(base_uri, new_uri)
        .then(() => {
          var db = SQLite.openDatabase('my_db.db');
          db.transaction(
            tx => {
              tx.executeSql(`SELECT cis FROM CIP_CIS WHERE cip13 = ?`, [data], (_, { rows }) => {
                console.log(JSON.stringify(rows))
                if(rows.length >= 1) {
                  this.setState({scanError: false, isRunning: false});
                  this.props.navigation.navigate('Medoc', {codeCIS: rows._array[0].cis, denomination: ''});
                }
                else {
                  this.setState({scanError: true, isRunning: false})
                }
              });
            },
            (err) => {
              console.log("Failed Message", err);
              this.setState({scanError: true, isRunning: false});
            }
          );
        });
    } else {
      this.setState({scanError: true})
    }
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]}>
          <Header style={{backgroundColor: "rgba(0, 0, 0, .6)", borderBottomWidth: 0}}>
            <Left>
              <Button style={{marginLeft: 5}} transparent onPress={() => {this.props.navigation.goBack()}}>
                <Icon name='arrow-back' style={{ color: '#ffffff'}} />
              </Button>
            </Left>
            <Body/>
            <Right/>
          </Header>
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          {
            this.state.scanError ?
            <View style={styles.layerBottom}>
              <Button style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, .6)', alignItems: 'center', justifyContent : 'center', alignSelf: 'center'}} onPress={() => this.setState({ scanError: false })} >
                <Text style={{fontSize: 15,  color: '#0e3e8c', textAlign: 'center'}}>Code barre invalide. Cliquez ici pour rescanner un code-barres</Text>
              </Button>
            </View>
            :
            <View style={styles.layerBottom}/>
          }
        </BarCodeScanner>
      </View>
    );
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: opacity,
    justifyContent: 'center'
  }
});
