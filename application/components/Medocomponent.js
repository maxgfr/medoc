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
              <Button style={{color: '#3028c9', justifyContent: 'center', width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid='+this.props.cis)}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Informations</Text>
              </Button>
              <Button style={{color: '#3028c9', justifyContent: 'center', marginHorizontal: 10, width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid='+this.props.cis+'&typedoc=R')}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>Caractéristiques</Text>
              </Button>
              <Button style={{color: '#3028c9', justifyContent: 'center', width: Dimensions.get('window').width / 3.5}} onPress={() => {WebBrowser.openBrowserAsync('http://base-donnees-publique.medicaments.gouv.fr/extrait.php?specid='+this.props.cis+'&typedoc=N')}}>
                <Text style={{color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>Notice</Text>
              </Button>
            </View>
            {
              this.props.medoc ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Présentation</Text>
                  <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Nom : {this.props.medoc.denomination}</Text>
                  <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Forme pharmaceutique : {this.props.medoc.formePharmaceutique}</Text>
                  {
                    this.props.medoc.statutAdministratifAMM ?
                    <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Status administratif : {this.props.medoc.statutAdministratifAMM}</Text>
                    : null
                  }
                  {
                    this.props.medoc.dateAMM ?
                    <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Date de certification : {this.props.medoc.dateAMM}</Text>
                    : null
                  }
                  {
                    this.props.medoc && this.props.medoc.titulaires && this.props.medoc.titulaires.length > 0 ?
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Titulaires : </Text>
                        {
                          this.props.medoc.titulaires.map((item,i) =>
                            <Text key={i} style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>{item}</Text>
                          )
                        }
                      </View>
                    : null
                  }
                  {
                    this.props.medoc && this.props.medoc.voiesAdministration && this.props.medoc.voiesAdministration.length > 0 ?
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Voies d'administration : </Text>
                        {
                          this.props.medoc.voiesAdministration.map((item,i) =>
                            <Text key={i} style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>{item}</Text>
                          )
                        }
                      </View>
                    : null
                  }
                  {
                    this.props.medoc && this.props.medoc.presentations && this.props.medoc.presentations.length > 0 ?
                      <View>
                        {
                          this.props.medoc.presentations.map((item,i) =>
                            <View key={i}>
                              {
                                item.prix ?
                                <View style={{flexDirection: 'row'}}>
                                  <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Prix : </Text>
                                  <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>{item.prix}</Text>
                                </View>
                                : null
                              }
                              {
                                  item.tauxRemboursement && item.tauxRemboursement.length > 0 ?
                                    <View style={{flexDirection: 'row'}}>
                                      <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Taux de remboursement : </Text>
                                      {
                                        item.tauxRemboursement.map((elmt,j) =>
                                          <Text key={elmt.toString()} style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>{elmt}</Text>
                                        )
                                      }
                                    </View>
                                  : null
                                }
                              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIS : {this.props.medoc.codeCIS}</Text>
                              <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 5 }}>Code CIP 13 : {item.codeCIP13}</Text>
                            </View>
                          )
                        }
                      </View>
                    : null
                  }
                </View>
              : null
            }
            {
               this.props.medoc && this.props.medoc.indicationsTherapeutiques ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Indication thérapeutiques</Text>
                  <Autolink
                  text={this.props.medoc.indicationsTherapeutiques}
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
                  style={{color: '#e3e4e8', fontSize: 15, marginTop: 12}}/>
                </View>
              : null
            }
            {
              this.props.medoc && this.props.medoc.conditionsPrescriptionDelivrance && this.props.medoc.conditionsPrescriptionDelivrance.length > 0 ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Conditions de prescriptions</Text>
                  {
                    this.props.medoc.conditionsPrescriptionDelivrance.map((item,i) =>
                      <Text key={i} style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>{item}</Text>
                    )
                  }
                </View>
              :
              <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Conditions de prescriptions</Text>
                <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Aucune condition n'est requise</Text>
              </View>
            }
            {
              this.props.medoc && this.props.medoc.substancesActives && this.props.medoc.substancesActives.length > 0 ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Substances actives</Text>
                  {
                    this.props.medoc.substancesActives.map((item,i) =>
                      <Text key={i} style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>{item.denominationSubstance} ({item.dosageSubstance})</Text>
                    )
                  }
                </View>
              :
              null
            }
            {
               this.props.medoc && this.props.medoc.infosGenerique && this.props.medoc.infosGenerique.infosImportantes && this.props.medoc.infosGenerique.infosImportantes.length > 0 ?
                <View style={{margin: 6, borderRadius: 10, backgroundColor: '#272830', justifyContent : 'center', padding: 20}}>
                  <Text style={{color: '#e3e4e8', fontSize: 18, fontWeight: 'bold'}}>Informations importantes</Text>
                  {
                    this.props.medoc.infosGenerique.infosImportantes.map((item,i) =>
                      <View key={i}>
                        <Text style={{color: '#e3e4e8', fontSize: 15, marginTop: 12 }}>Du {item.dateDebut} au {item.dateFin} | {item.infoLibelle}</Text>
                        <Autolink
                        text={item.infoURL}
                        mention="twitter"
                        phone={false}
                        email={false}
                        onPress={(url, match) => {
                          if(match.url) {
                            WebBrowser.openBrowserAsync(match.url)
                          }
                        }}
                        linkStyle={{ color:'#172061' , fontWeight:'bold'}}
                        numberOfLines={this.state.viewMore ? null : 3}
                        style={{color: '#e3e4e8', fontSize: 15, marginTop: 5}}/>
                      </View>
                    )
                  }
                </View>
              : null
            }
          </View>
        );
    }
}
