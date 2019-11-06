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
              <Button style={{color: '#3028c9', justifyContent: 'center', width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://m.base-donnees-publique.medicaments.gouv.fr/#!info-'+this.props.cis)}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Informations</Text>
              </Button>
              <Button style={{color: '#3028c9', justifyContent: 'center', marginHorizontal: 10, width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://m.base-donnees-publique.medicaments.gouv.fr/#!rcp-'+this.props.cis+'-0')}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Caractéristiques</Text>
              </Button>
              <Button style={{color: '#3028c9', justifyContent: 'center', width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://m.base-donnees-publique.medicaments.gouv.fr/#!notice-'+this.props.cis+'-0')}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Notice</Text>
              </Button>
            </View>

            <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
              <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Présentation</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Nom : {this.props.generalData.denomination_medicament}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Forme pharmaceutique : {this.props.generalData.forme_pharmaceutique}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Voies d'administration : {this.props.generalData.voies_administration}</Text>
              {
                this.props.generalData.status_administratif ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status administratif : {this.props.generalData.status_administratif}</Text>
                : null
              }
              {
                this.props.generalData.type_procedure_amm ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Type de procédure AMM : {this.props.generalData.type_procedure_amm}</Text>
                : null
              }
              {
                this.props.generalData.etat_commercialisation ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Etat de commercialisation : {this.props.generalData.etat_commercialisation}</Text>
                : null
              }
              {
                this.props.generalData.statut_bdm ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status BDM : {this.props.generalData.statut_bdm}</Text>
                : null
              }
              {
                this.props.generalData.statut_bdm ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status BDM : {this.props.generalData.statut_bdm}</Text>
                : null
              }
              {
                this.props.generalData.num_autorisation_europeenne ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Numéro d'autorisation européenne : {this.props.generalData.num_autorisation_europeenne}</Text>
                : null
              }
              {
                this.props.generalData.titulaires ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Titulaires: {this.props.generalData.titulaires}</Text>
                : null
              }
              {
                this.props.generalData.surveillance_renforcee ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Surveillance renforcée : {this.props.generalData.surveillance_renforcee}</Text>
                : null
              }
            </View>

          </View>
        );
    }
}
