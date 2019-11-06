import React from 'react';
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Text,
  Button,
  Icon
} from 'native-base';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';
import Medocomponent from '../components/Medocomponent';

export default class MedocScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      cis: props.navigation.getParam('cis', ''),
      denomination: props.navigation.getParam('denomination', ''),
      asmrData: {},
      cipData: {},
      compoData: {},
      conditionData: {},
      generalData: props.navigation.getParam('data', {}),
      smrData: {}
    };
  }

  async componentDidMount() {
    this.loadDbAsmr();
    this.loadDbCIP();
    this.loadDbCompo();
    this.loadDbCondition();
    this.loadDbSmr();
  }

  loadDbAsmr = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbAsmr.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbAsmr.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbAsmr.db');
        //console.log('dbAsmr loaded');
        this.fetchData(db, 'CIS_HAS_ASMR', 'asmrData');
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  loadDbCIP = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbCIP.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbCIP.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbCIP.db');
        //console.log('dbCIP loaded');
        this.fetchData(db, 'CIP_CIS', 'cipData');
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  loadDbCompo = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbCompo.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbCompo.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbCompo.db');
        //console.log('dbCompo loaded');
        this.fetchData(db, 'CIS_COMPO', 'compoData');
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  loadDbCondition = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbCondition.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbCondition.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbCondition.db')
        //console.log('dbCondition loaded');
        this.fetchData(db, 'CIS_CPD', 'conditionData');
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  loadDbSmr = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbSmr.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbSmr.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbSmr.db');
        //console.log('dbSmr loaded');
        this.fetchData(db, 'CIS_HAS_SMR', 'smrData');
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

  fetchData = (db, dbName, storeName) => {
    db.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM `+dbName+` WHERE cis = ?`, [this.state.cis], (_, { rows }) => {
            //console.log(JSON.stringify(rows))
            if(rows.length >= 1) {
              //console.log(rows);
              this.setState({[`${storeName}`]: rows._array[0] })
            }
          });
        },
        (err) => {
          console.log("Failed Message", err);
        }
      );
  }

  render() {
    return (
      <Container>
        <Header iosBarStyle={"light-content"} androidStatusBarColor="#161a21" style={{backgroundColor: "#161a21", borderBottomWidth: 0}}>
          <Left>
            <Button transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name='arrow-back' style={{ color: '#ffffff'}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: '#ffffff'}}>{this.state.denomination}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor: "#161a21"}}>
            <Medocomponent
                cis={this.state.cis}
                generalData={this.state.generalData}
                asmrData={this.state.asmrData}
                cipData={this.state.cipData}
                compoData={this.state.compoData}
                conditionData={this.state.conditionData}
                smrData={this.state.smrData}
              />
        </Content>
      </Container>
    );
  }

}
