import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as SQLite from 'expo-sqlite';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
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
      codeCIS: '',
      scanError: false,
      isRunning: false,
      db: null,
      dbLoaded: false
    };
  }

  componentDidMount() {
    var base_uri = Asset.fromModule(require('../assets/database/dbCIP.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/my_db.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('my_db.db')
        this.setState({ db: db, dbLoaded: true });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  ensureFolderExists = () => {
    const path = `${FileSystem.documentDirectory}SQLite`
    return FileSystem.getInfoAsync(path).then(({exists}) => {
      if (!exists) {
        return FileSystem.makeDirectoryAsync(path)
      } else {
        return Promise.resolve(true)
      }
    })
  }

  handleBarCodeScanned = ({ type, data }) => {
    //console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    if(type == "org.iso.DataMatrix" || type == "16") {
      data = data.substring(4,17);
      //console.log(data);
    }
    if(type != "org.iso.Code128" && type != "org.iso.DataMatrix" && type != "16" && this.state.isRunning && !this.state.dbLoaded && data.length != 13) {
      this.setState({scanError: true});
      return;
    }
    this.state.isRunning = true;
    this.setState({scanError: false, isRunning: true});
    this.state.db.transaction(
        tx => {
          tx.executeSql(`SELECT cis FROM CIP_CIS WHERE cip13 = ?`, [data], (_, { rows }) => {
            //console.log(JSON.stringify(rows))
            if(rows.length >= 1) {
              this.state.isRunning = false;
              this.props.navigation.navigate('Medoc', {codeCIS: rows._array[0].cis, denomination: ''});
            } else {
              this.state.isRunning = false;
              this.setState({scanError: true});
            }
          });
        },
        (err) => {
          console.log("Failed Message", err);
          this.state.isRunning = false;
          this.setState({scanError: true});
        }
      );
  };

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]}>
          <Header iosBarStyle={"light-content"} androidStatusBarColor="#161a21" style={{backgroundColor: "rgba(0, 0, 0, .6)", borderBottomWidth: 0}}>
            <Left>
              <Button transparent onPress={() => {this.props.navigation.goBack()}}>
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
              <View style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, .6)', alignItems: 'center', justifyContent : 'center', alignSelf: 'center'}} onPress={() => this.setState({ scanError: false })} >
                <Text style={{fontSize: 15,  color: '#307fff', textAlign: 'center'}}>Code-barres invalide. Veuillez rescanner le code-barres</Text>
              </View>
            </View>
            :
            <View style={styles.layerBottom}/>
          }
        </BarCodeScanner>
      </Container>
    );
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#161a21',
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
