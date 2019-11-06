import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';
import {
  Container,
  Left,
  Body,
  Right,
  Title,
  Icon
} from 'native-base';
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    search: '',
    result: [],
    historic: [],
    dbGeneral: null,
    dbGeneralLoaded: false,
  };

  async componentDidMount() {
    await this.getHistoric();
    this.loadDbGeneral();
  }

  loadDbGeneral = () => {
    var base_uri = Asset.fromModule(require('../assets/database/dbGeneral.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbGeneral.db`;
    this.ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbGeneral.db')
        this.setState({ dbGeneral: db, dbGeneralLoaded: true });
        //console.log('dbGeneral loaded');
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

  updateSearch = async (search) => {
    if(!this.state.isSearching && this.state.dbGeneralLoaded) {
      this.setState({search: search, isSearching: true });
      if(search != "") {
        var new_search = search+"%";
        this.state.dbGeneral.transaction(
            tx => {
              tx.executeSql(`SELECT * FROM CIS_GENERAL WHERE denomination_medicament LIKE ?`, [new_search], (_, { rows }) => {
                //console.log(JSON.stringify(rows))
                if(rows.length >= 1) {
                  //console.log(rows);
                  this.setState({result: rows._array, isSearching: false});
                } else {
                  this.setState({isSearching: false});
                }
              });
            },
            (err) => {
              console.log("Failed Message", err);
              this.setState({result: [], isSearching: false, search: ""});
            }
          );
      } else {
        this.setState({result: [], isSearching: false, search: ""});
      }
    }
  };

  getHistoric = async () => {
    try {
      const myArray = await AsyncStorage.getItem('@historique');
      if (myArray !== null) {
        var realArray = JSON.parse(myArray);
        this.setState({historic: realArray})
      }
    } catch (error) {
      console.log(error);
    }
  }

  setHistoric = (item) => {
    var array = this.state.historic;
    for (var i = 0; i < array.length; i++) {
        if (array[i].cis === item.cis) {
            array.splice(i, 1);
        }
    }
    array.unshift(item);
    if(array.length > 10) {
      array.pop();
    }
    this.setState({historic: array});
    try {
      AsyncStorage.setItem('@historique', JSON.stringify(array));
    } catch (error) {
      console.log(error);
    }
  }

  _deleteHistoric = () => {
    AsyncStorage.clear();
    this.setState({historic: []});
  }

  _onPress = (item) => {
    this.setHistoric(item);
    var deno = item.denomination_medicament.substr(0, item.denomination_medicament.indexOf(','));
    this.props.navigation.navigate('Medoc', {cis: item.cis, denomination: deno, data: item});
  }

  _listHeaderComponent = () => (
    <View>
      <Text style={[iOSUIKit.largeTitleEmphasizedWhite, {marginBottom: 10, marginLeft: 12}]}>Médoc</Text>
      <SearchBar
        containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0, marginBottom: 15}}
        placeholder="Recherchez votre médicament..."
        onChangeText={this.updateSearch}
        value={this.state.search}
      />
    </View>

  );

  _onCamera = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      Alert.alert(
        'Authoriser l\'accès à la caméra',
        'Vous devez authoriser Médoc à accéder à votre caméra pour utiliser cette fonctionnalité.',
        [
          {text: 'Ouvrir mes paramètres', onPress: () => Linking.openURL('app-settings:')},
          {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.navigate('Camera');
    }
  }

  _renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => { this._onPress(item) }} style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: '#272830', alignItems: 'center', justifyContent : 'center'}}>
        <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>{item.denomination_medicament}</Text>
    </TouchableOpacity>
  );

  _listEmptyComponent = ({item, index}) => (
    <View>
      {
        this.state.search !== '' && !this.state.isSearching ?
        <View style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: '#272830', alignItems: 'center', justifyContent : 'center'}}>
            <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>Médicament non trouvé</Text>
        </View>
        : null
      }
      {
        this.state.search === '' && !this.state.isSearching ?
        <View>
          <TouchableOpacity onPress={this._onCamera} style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: '#272830', alignItems: 'center', justifyContent : 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Icon type='MaterialCommunityIcons' name='barcode-scan' style={{ color: '#e3e4e8', fontSize:30, marginRight: 15 }} />
            <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>Effectuez une recherche avec l'appareil photo de votre smartphone</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={[iOSUIKit.title3EmphasizedWhite, {marginBottom: 10, marginLeft: 12}]}>Historique</Text>
            <TouchableOpacity onPress={this._deleteHistoric} >
              <Text style={{color: '#e3e4e8', fontSize: 10, textAlign: 'center'}}>Supprimez l'historique</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.historic}
            renderItem={this._renderItem}
            ListEmptyComponent={() => {
              return(
                <View onPress={() => { this._onPress(item) }} style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: '#272830', alignItems: 'center', justifyContent : 'center'}}>
                    <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>Pas d'historique</Text>
                </View>
              )
            }}
            style={{backgroundColor: "#161a21"}}
          />
        </View>
        : null
      }
      {
        this.state.isSearching ?
        <View style={{marginTop: 20}}>
          <ActivityIndicator size="large"/>
        </View>
        : null
      }
    </View>
  );

  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "#161a21"}}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.result}
          ListHeaderComponent={this._listHeaderComponent}
          renderItem={this._renderItem}
          ListEmptyComponent={this._listEmptyComponent}
          contentContainerStyle={{backgroundColor: "#161a21", paddingHorizontal: 10, paddingTop:40}}
        />
      </Container>
    );
  }

}
