import React, { Component } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import {
    Button
} from "native-base";
import Autolink from 'react-native-autolink';

export default class Medocomponent extends Component {

    render() {
        return (
          <View>
            <View style={{flexDirection: 'row', justifyContent:'center', margin: 6}}>
              <Button style={{color: '#3028c9', justifyContent: 'center', width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://m.base-donnees-publique.medicaments.gouv.fr/#!info-'+this.props.generalData.cis)}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Informations</Text>
              </Button>
              <Button style={{color: '#3028c9', justifyContent: 'center', marginHorizontal: 10, width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://m.base-donnees-publique.medicaments.gouv.fr/#!rcp-'+this.props.generalData.cis+'-0')}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Caractéristiques</Text>
              </Button>
              <Button style={{color: '#3028c9', justifyContent: 'center', width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://m.base-donnees-publique.medicaments.gouv.fr/#!notice-'+this.props.generalData.cis+'-0')}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Notice</Text>
              </Button>
            </View>

            <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
              <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Général</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Nom : {this.props.generalData[0]}</Text>

            </View>
          </View>
        );
    }
}
