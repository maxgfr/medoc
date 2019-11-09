import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchByCip13 } from '../redux/action/AppActions';

class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      scanLocalError: false
    };
  }


  handleBarCodeScanned = ({ type, data }) => {
    //console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    var loaded = this.props.app.dbAsmrLoaded
                && this.props.app.dbCIPLoaded
                && this.props.app.dbCompoLoaded
                && this.props.app.dbConditionLoaded
                && this.props.app.dbGeneralLoaded
                && this.props.app.dbInfoLoaded
                && this.props.app.dbSmrLoaded;
    if(type == "org.iso.DataMatrix" || type == "16") {
      data = data.substring(4,17);
      //console.log(data);
    }
    if(type != "org.iso.Code128" && type != "org.iso.DataMatrix" && type != "16" && this.props.app.isRunning && this.props.app.scanError && !loaded && data.length != 13) {
      this.setState({scanLocalError: true});
      return;
    }
    this.setState({scanLocalError: false});
    this.props.searchByCip13(this.props.app.dbCIP, data);
    this.props.navigation.navigate('Medoc');
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
            this.state.scanLocalError ?
            <View style={styles.layerBottom}>
              <View style={{padding: 20, margin: 6, borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, .6)', alignItems: 'center', justifyContent : 'center', alignSelf: 'center'}} onPress={() => this.setState({ scanLocalError: false })} >
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

const mapStateToProps = (state) => {
  const { app } = state
  return { app }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    searchByCip13
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);
