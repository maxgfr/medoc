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
            { this.props.generalData.map((item, index) => {
                return (
                  <React.Fragment key={index}>
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
                      <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Général</Text>
                      { item.denomination_medicament ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Nom : {item.denomination_medicament}</Text> : null }
                      { item.forme_pharmaceutique ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Forme pharmaceutique : {item.forme_pharmaceutique}</Text> : null }
                      { item.voies_administration ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Voies d'administration : {item.voies_administration}</Text> : null }
                      { item.status_administratif ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status administratif de l’autorisation de mise sur le marché : {item.status_administratif}</Text> : null }
                      { item.type_procedure_amm ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Type de procédure d'autorisation de mise sur le marché : {item.type_procedure_amm}</Text> : null }
                      { item.etat_commercialisation ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Etat de commercialisation : {item.etat_commercialisation}</Text> : null }
                      { item.data_amm ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Date AMM : {item.data_amm}</Text> : null }
                      { item.statut_bdm ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status BDM : {item.statut_bdm}</Text> : null }
                      { item.num_autorisation_europeenne ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Numéro de l’autorisation européenne : {item.num_autorisation_europeenne}</Text> : null }
                      { item.titulaires ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Titulaires: {item.titulaires}</Text> : null }
                      { item.surveillance_renforcee ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Surveillance renforcée : {item.surveillance_renforcee}</Text> : null }
                    </View>
                  </React.Fragment>
                );
              })}

            { this.props.cipData.map((item, index) => {
                return (
                  <View key={index} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                    <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Présentation</Text>
                    { item.libelle_pres ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Libellé de la présentation : {item.libelle_pres}</Text> : null }
                    { item.status_administratif ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Statut administratif de la présentation : {item.status_administratif}</Text> : null }
                    { item.etat_commercialisation ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Etat de commercialisation de la présentation tel que déclaré par le titulaire de l'AMM : {item.etat_commercialisation}</Text> : null }
                    { item.status_administratif ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Date de la déclaration de commercialisation : {item.status_administratif}</Text> : null }
                    { item.date_decla_commercialisation ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Date de la déclaration de commercialisation : {item.date_decla_commercialisation}</Text> : null }
                    { item.agrement_collectivite ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Agrément aux collectivités : {item.agrement_collectivite}</Text> : null }
                    { item.taux_remboursement ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Taux de remboursement : {item.taux_remboursement}</Text> : null }
                    { item.prix_medicament ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Prix : {item.prix_medicament} €</Text> : null }
                    { item.indication_droit_remboursement ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Indication droit au remboursement : {item.indication_droit_remboursement} €</Text> : null }
                    { item.cis ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIS: {item.cis}</Text> : null }
                    { item.cip7 ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIP7 : {item.cip7}</Text> : null }
                    { item.cip13 ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIP13 : {item.cip13}</Text> : null }
                  </View>
                );
              })}

            { this.props.compoData.map((item, index) => {
                return (
                  <View key={index} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                    <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Substance actives</Text>
                    { item.denomination_substance ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Dénomination substance : {item.denomination_substance}</Text> : null }
                    { item.designation ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Type : {item.designation}</Text> : null }
                    { item.dosage_substance ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Dosage : {item.dosage_substance}</Text> : null }
                    { item.code ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code : {item.code}</Text> : null }
                    { item.ref_dosage ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Référence du dosage pour un comprimé: {item.ref_dosage}</Text> : null }
                    { item.date_decla_commercialisation ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Nature du composant : {item.date_decla_commercialisation == 'SA' ? 'principe actif' : 'fraction thérapeutique' }</Text> : null }
                  </View>
                );
              })}

            { this.props.infoData.map((item, index) => {
                return (
                  <View key={index} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                    <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Informations importantes</Text>
                    { item.from_date && item.to_date ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Du {item.from_date} au {item.to_date} </Text> : null }
                    { item.text ?
                      <Autolink
                        text={item.text}
                        mention="twitter"
                        phone={false}
                        email={false}
                        onPress={(url, match) => {
                          if(match.url) {
                            WebBrowser.openBrowserAsync(match.url)
                          }
                        }}
                        linkStyle={{ color:'#172061' , fontWeight:'bold'}}
                        numberOfLines={null}
                        style={{color: '#e3e4e8', fontSize: 15, marginTop: 5}}/>
                        : null }
                  </View>
                );
              })}

            { this.props.conditionData.map((item, index) => {
                return (
                  <View key={index} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                    <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Condition de prescriptions</Text>
                    { item.condition ?
                      <Autolink
                        text={item.condition}
                        mention="twitter"
                        phone={false}
                        email={false}
                        onPress={(url, match) => {
                          if(match.url) {
                            WebBrowser.openBrowserAsync(match.url)
                          }
                        }}
                        linkStyle={{ color:'#172061' , fontWeight:'bold'}}
                        numberOfLines={null}
                        style={{color: '#e3e4e8', fontSize: 15, marginTop: 5}}/>
                        : null }
                  </View>
                );
              })}

            { this.props.smr.map((item, index) => {
                return (
                  <View key={index} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                    <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Avis SMR (Service médical rendu)</Text>
                    { item.has ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code de dossier HAS : {item.has}</Text> : null }
                    { item.motif_eval ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Motif d'évaluation : {item.motif_eval}</Text> : null }
                    { item.valeur_smr ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Valeur du SMR : {item.valeur_smr}</Text> : null }
                    { item.libelle_smr ?
                      <Autolink
                        text={item.libelle_smr}
                        mention="twitter"
                        phone={false}
                        email={false}
                        onPress={(url, match) => {
                          if(match.url) {
                            WebBrowser.openBrowserAsync(match.url)
                          }
                        }}
                        linkStyle={{ color:'#172061' , fontWeight:'bold'}}
                        numberOfLines={null}
                        style={{color: '#e3e4e8', fontSize: 15, marginTop: 5}}/>
                        : null }
                  </View>
                );
              })}

            { this.props.asmr.map((item, index) => {
                  return (
                    <View key={index} style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                      <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold', marginBottom: 7}}>Avis ASMR (Amélioration du service médical rendu)</Text>
                      { item.has ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code de dossier HAS : {item.has}</Text> : null }
                      { item.motif_eval ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Motif d'évaluation : {item.motif_eval}</Text> : null }
                      { item.valeur_smr ? <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Valeur du ASMR : {item.valeur_asmr}</Text> : null }
                      { item.libelle_asmr ?
                        <Autolink
                          text={item.libelle_asmr}
                          mention="twitter"
                          phone={false}
                          email={false}
                          onPress={(url, match) => {
                            if(match.url) {
                              WebBrowser.openBrowserAsync(match.url)
                            }
                          }}
                          linkStyle={{ color:'#172061' , fontWeight:'bold'}}
                          numberOfLines={null}
                          style={{color: '#e3e4e8', fontSize: 15, marginTop: 5}}/>
                          : null }
                    </View>
                  );
                })}

          </View>
        );
    }
}
