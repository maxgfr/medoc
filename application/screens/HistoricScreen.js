import React from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title
} from 'native-base';

export default class HistoricScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      result: []
    }
  }

  _renderItem = ({item, index}) => (
    <TouchableOpacity onPress={() => { this._onPress(item) }} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center'}}>
      <View style={{padding: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>{item.denomination}</Text>
      </View>
    </TouchableOpacity>
  );

  _listEmptyComponent = ({item, index}) => (
    <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center'}}>
      <View style={{padding: 20, justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{color: '#e3e4e8', fontSize: 15, textAlign: 'center'}}>Toutes les données présentes sont certifiés par l'état</Text>
      </View>
    </View>
  );

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <Header style={{backgroundColor: "#161a21", borderBottomWidth: 0}}>
          <Left />
          <Body>
            <Title style={{color: '#ffffff'}}>Historique</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.result}
          renderItem={this._renderItem}
          ListEmptyComponent={this._listEmptyComponent}
          style={{backgroundColor: "#161a21"}}
        />
      </Container>
    );
  }

}
