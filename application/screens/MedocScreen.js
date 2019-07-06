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
import Medocomponent from '../components/Medocomponent'

export default class MedocScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      cis: props.navigation.getParam('codeCIS', ''),
      denomination: props.navigation.getParam('denomination', ''),
      medoc: {}
    };
  }

  async componentDidMount() {
    const response_serv = await fetch('https://open-medicaments.fr/api/v1/medicaments/'+this.state.cis, {
        method: 'GET'
    });
    var result_serv = await response_serv.json();
    var resp_modif = this.processResponse(result_serv);
    if(this.state.denomination == '') {
      this.setState({medoc: resp_modif, denomination: resp_modif.denomination});
    } else {
      this.setState({medoc: resp_modif});
    }
  }

  processResponse = (resp) => {
    var matches = resp.indicationsTherapeutiques.match(/\bhttps?:\/\/\S+/gi);
    var text_without_link = this.urlify(resp.indicationsTherapeutiques);
    text_without_link = text_without_link.replace("Plus d'information en cliquant ici","");
    //console.log(matches, text_without_link);
    if(matches.length > 0) {
      resp.url = matches[0];
    } else {
      resp.url = ''
    }
    resp.indicationsTherapeutiques = text_without_link;
    //console.log(resp);
    return resp;
  }

  urlify = (text) => {
    var urlRegex = /<\/?[^>]+(>|$)/g;
    return text.replace(urlRegex, "")
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor: "#161a21", borderBottomWidth: 0}}>
          <Left>
            <Button style={{marginLeft: 5}} transparent onPress={() => {this.props.navigation.goBack()}}>
              <Icon name='arrow-back' style={{ color: '#ffffff'}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: '#ffffff'}}>{this.state.denomination}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor: "#161a21"}}>
            <Medocomponent medoc={this.state.medoc} cis={this.state.cis} />
        </Content>
      </Container>
    );
  }

}
