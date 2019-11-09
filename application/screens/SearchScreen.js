import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getHistoric,
  setHistoric,
  deleteHistoric,
  searchByDeno,
  loadDbAsmr,
  loadDbCIP,
  loadDbCompo,
  loadDbCondition,
  loadDbGeneral,
  loadDbInfo,
  loadDbSmr
} from '../redux/action/AppActions';

class SearchScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    search: ''
  };

  componentDidMount() {
    this.props.getHistoric();
    this.props.loadDbAsmr();
    this.props.loadDbCIP();
    this.props.loadDbCompo();
    this.props.loadDbCondition();
    this.props.loadDbGeneral();
    this.props.loadDbInfo();
    this.props.loadDbSmr();
  }

  updateSearch = async (search) => {
    var loaded = this.props.app.dbAsmrLoaded
                && this.props.app.dbCIPLoaded
                && this.props.app.dbCompoLoaded
                && this.props.app.dbConditionLoaded
                && this.props.app.dbGeneralLoaded
                && this.props.app.dbInfoLoaded
                && this.props.app.dbSmrLoaded;
    if(!this.props.app.isSearching && loaded) {
      this.setState({search: search});
      var new_search = search+"%";
      this.props.searchByDeno(this.props.app.dbGeneral, new_search);
    }
  };

  _ondDeleteHistoric = () => {
    this.props.deleteHistoric(this.props.app.historic);
  }

  _onPress = (item) => {
    this.props.setHistoric(item, this.props.app.historic);
    var deno = item.denomination_medicament.substr(0, item.denomination_medicament.indexOf(','));
    this.props.navigation.navigate('Medoc');
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
        this.state.search !== '' && !this.props.app.isSearching ?
        <View style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: '#272830', alignItems: 'center', justifyContent : 'center'}}>
            <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>Médicament non trouvé</Text>
        </View>
        : null
      }
      {
        this.state.search === '' && !this.props.app.isSearching ?
        <View>
          <TouchableOpacity onPress={this._onCamera} style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: '#272830', alignItems: 'center', justifyContent : 'center', flexDirection: 'row', flexWrap: 'wrap'}}>
            <Icon type='MaterialCommunityIcons' name='barcode-scan' style={{ color: '#e3e4e8', fontSize:30, marginRight: 15 }} />
            <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>Effectuez une recherche avec l'appareil photo de votre smartphone</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={[iOSUIKit.title3EmphasizedWhite, {marginBottom: 10, marginLeft: 12}]}>Historique</Text>
            <TouchableOpacity onPress={this._ondDeleteHistoric} >
              <Text style={{color: '#e3e4e8', fontSize: 10, textAlign: 'center'}}>Supprimez l'historique</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.props.app.historic}
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
        this.props.app.isSearching ?
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
          data={this.props.app.generalData}
          ListHeaderComponent={this._listHeaderComponent}
          renderItem={this._renderItem}
          ListEmptyComponent={this._listEmptyComponent}
          contentContainerStyle={{backgroundColor: "#161a21", paddingHorizontal: 10, paddingTop:40}}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state
  return { app }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getHistoric,
    setHistoric,
    deleteHistoric,
    searchByDeno,
    loadDbAsmr,
    loadDbCIP,
    loadDbCompo,
    loadDbCondition,
    loadDbGeneral,
    loadDbInfo,
    loadDbSmr
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
