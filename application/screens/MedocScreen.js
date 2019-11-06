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
      generalData: props.navigation.getParam('data', ''),
      smrData: {},
      dbAsmr: null,
      dbCIP: null,
      dbCompo: null,
      dbCondition: null,
      dbSmr: null,
      dbAsmrLoaded: false,
      dbCIPLoaded: false,
      dbCompoLoaded: false,
      dbConditionLoaded: false,
      dbSmrLoaded: false
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
        var db = SQLite.openDatabase('dbAsmr.db')
        this.setState({ dbAsmr: db, dbAsmrLoaded: true });
        console.log('dbAsmr loaded');
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
        var db = SQLite.openDatabase('dbCIP.db')
        this.setState({ dbCIP: db, dbCIPLoaded: true });
        console.log('dbCIP loaded');
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
        var db = SQLite.openDatabase('dbCompo.db')
        this.setState({ dbCompo: db, dbCompoLoaded: true });
        console.log('dbCompo loaded');
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
        this.setState({ dbCondition: db, dbConditionLoaded: true });
        console.log('dbCondition loaded');
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  loadDbGeneral = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbGeneral.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbGeneral.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbGeneral.db')
        this.setState({ dbGeneral: db, dbGeneralLoaded: true });
        console.log('dbGeneral loaded');
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
        var db = SQLite.openDatabase('dbSmr.db')
        this.setState({ dbSmr: db, dbSmrLoaded: true });
        console.log('dbSmr loaded');
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
