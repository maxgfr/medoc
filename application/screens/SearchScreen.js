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
    historic: []
  };

  async componentDidMount() {
    await this.getHistoric();
  }

  updateSearch = async (search) => {
    if(!this.state.isSearching) {
      this.setState({search: search, isSearching: true });
      if(search != "") {
        const response_serv = await fetch('https://www.open-medicaments.fr/api/v1/medicaments?query='+search, {
            method: 'GET'
        });
        var result_serv = await response_serv.json();
        this.setState({result: result_serv, isSearching: false});
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
        if (array[i].codeCIS === item.codeCIS) {
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

  _onPress = (item) => {
    this.setHistoric(item);
    var deno = item.denomination.substr(0, item.denomination.indexOf(','));
    this.props.navigation.navigate('Medoc', {codeCIS: item.codeCIS, denomination: deno});
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
        <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>{item.denomination}</Text>
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
          <Text style={[iOSUIKit.title3EmphasizedWhite, {marginBottom: 10, marginLeft: 12}]}>Historique</Text>
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
