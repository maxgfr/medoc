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
import { connect } from 'react-redux';
import Medocomponent from '../components/Medocomponent';

class MedocScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

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
            <Title style={{color: '#ffffff'}}>{this.props.app.denomination}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor: "#161a21"}}>
            <Medocomponent
                asmrData={this.props.app.asmrData}
                cipData={this.props.app.cipData}
                compoData={this.props.app.compoData}
                conditionData={this.props.app.conditionData}
                generalData={this.props.app.generalData}
                infoData={this.props.app.infoData}
                smrData={this.props.app.smrData}
              />
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
  const { app } = state
  return { app }
};

export default connect(mapStateToProps, null)(MedocScreen);
