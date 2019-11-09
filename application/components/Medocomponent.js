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
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Type de procédure d'autorisation de mise sur le marché : {this.props.generalData.type_procedure_amm}</Text>
                : null
              }
              {
                this.props.generalData.etat_commercialisation ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Statut administratif de l’autorisation de mise sur le marché : {this.props.generalData.etat_commercialisation}</Text>
                : null
              }
              {
                this.props.generalData.data_amm ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Date AMM : {this.props.generalData.data_amm}</Text>
                : null
              }
              {
                this.props.generalData.statut_bdm ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status BDM : {this.props.generalData.statut_bdm}</Text>
                : null
              }
              {
                this.props.generalData.num_autorisation_europeenne ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Numéro de l’autorisation européenne : {this.props.generalData.num_autorisation_europeenne}</Text>
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
              {
                this.props.conditionData.condition ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Condition de prescription : {this.props.conditionData.condition}</Text>
                : null
              }
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIS : {this.props.generalData.cis}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIP7 : {this.props.cipData.cip7}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIP13 : {this.props.cipData.cip13}</Text>
            </View>

            <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
              <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Présentation</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Libellé de la présentation : {this.props.cipData.libelle_pres}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Statut administratif de la présentation : {this.props.cipData.status_administratif}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Etat de commercialisation de la présentation tel que déclaré par le titulaire de l'AMM : {this.props.cipData.etat_commercialisation}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Date de la déclaration de commercialisation : {this.props.cipData.date_decla_commercialisation}</Text>
              {
                this.props.cipData.agrement_collectivite ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Agrément aux collectivités : {this.props.cipData.agrement_collectivite}</Text>
                : null
              }
              {
                this.props.cipData.taux_remboursement ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Taux de remboursement : {this.props.cipData.taux_remboursement}</Text>
                : null
              }
              {
                this.props.cipData.prix_medicament ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Prix : {this.props.cipData.prix_medicament} €</Text>
                : null
              }
              {
                this.props.cipData.indication_droit_remboursement ?
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Indication droit au remboursement : {this.props.cipData.indication_droit_remboursement}</Text>
                : null
              }
            </View>

            <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
              <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Substance actives</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Désignation : {this.props.compoData.designation}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Dosage : {this.props.compoData.dosage_substance}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code : {this.props.compoData.code}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Référence du dosage pour un comprimé: {this.props.compoData.ref_dosage}</Text>
              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Nature du composant : {this.props.compoData.date_decla_commercialisation == 'SA' ? 'principe actif' : 'fraction thérapeutique' }</Text>
            </View>

          </View>
        );
    }
}
