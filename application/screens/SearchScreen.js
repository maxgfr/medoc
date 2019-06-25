import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title
} from 'native-base';
import { SearchBar } from 'react-native-elements';

export default class SearchScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    search: '',
    result: []
  };

  updateSearch = async (search) => {
    this.setState({ search: search });
    if(search != "") {
      const response_serv = await fetch('https://www.open-medicaments.fr/api/v1/medicaments?query='+search, {
          method: 'GET'
      });
      var result_serv = await response_serv.json();
      this.setState({result: result_serv});
    } else {
      this.setState({result: []});
    }
  };

  _onPress = (item) => {
    console.log(item);
    this.props.navigation.navigate('Medoc', {codeCIS: item.codeCIS});
  }

  _listHeaderComponent = () => (
    <SearchBar
      containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0, borderTopWidth: 0}}
      placeholder="Recherchez votre médicament ici..."
      onChangeText={this.updateSearch}
      value={this.state.search}
    />
  );

  _renderItem = ({item, index}) => (
    <TouchableOpacity onPress={this._onPress} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center'}}>
      <View style={{padding: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12, textAlign: 'center'}}>{item.denomination}</Text>
      </View>
    </TouchableOpacity>
  );

  _listEmptyComponent = ({item, index}) => (
    <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center'}}>
      <View style={{padding: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12, textAlign: 'center'}}>Toutes les données présentes sont certifiés par l'état</Text>
      </View>
    </View>
  );

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header style={{backgroundColor: "#161a21", borderBottomWidth: 0}}>
          <Left />
          <Body>
            <Title style={{color: '#ffffff'}}>Recherche</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.result}
          ListHeaderComponent={this._listHeaderComponent}
          renderItem={this._renderItem}
          ListEmptyComponent={this._listEmptyComponent}
          style={{backgroundColor: "#161a21"}}
        />
      </Container>
    );
  }

}
