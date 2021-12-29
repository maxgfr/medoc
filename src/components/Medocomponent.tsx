import React from 'react';
import {View, Text, Dimensions, Linking, Alert, StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {TextMl} from './Textml';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

//TODO: type correctly
type Props = {
  generalData: any;
  cipData: any;
  compoData: any;
  infoData: any;
  conditionData: any;
  smrData: any;
  asmrData: any;
};

export function Medocomponent(props: Props) {
  const onPress = async (link: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(link, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#3028c9',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#3028c9',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'Médoc',
          },
        });
        Alert.alert(JSON.stringify(result));
      } else {
        Linking.openURL(link);
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View>
      {props.generalData.map((item: any, index: number) => {
        return (
          <React.Fragment key={index}>
            <View style={styles.rowContainer}>
              <Button
                style={styles.button}
                onPress={() => {
                  onPress(
                    'http://m.base-donnees-publique.medicaments.gouv.fr/#!info-' +
                      item.cis,
                  );
                }}>
                <Text style={styles.textButton}>Informations</Text>
              </Button>
              <Button
                style={StyleSheet.flatten([
                  styles.button,
                  {
                    marginHorizontal: 10,
                  },
                ])}
                onPress={() => {
                  onPress(
                    'http://m.base-donnees-publique.medicaments.gouv.fr/#!rcp-' +
                      item.cis +
                      '-0',
                  );
                }}>
                <Text style={styles.textButton}>Caractéristiques</Text>
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  onPress(
                    'http://m.base-donnees-publique.medicaments.gouv.fr/#!notice-' +
                      item.cis +
                      '-0',
                  );
                }}>
                <Text style={styles.button}>Notice</Text>
              </Button>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Général</Text>
              {item.denomination_medicament ? (
                <Text style={styles.text}>
                  Nom : {item.denomination_medicament}
                </Text>
              ) : null}
              {item.forme_pharmaceutique ? (
                <Text style={styles.text}>
                  Forme pharmaceutique : {item.forme_pharmaceutique}
                </Text>
              ) : null}
              {item.voies_administration ? (
                <Text style={styles.text}>
                  Voies d'administration : {item.voies_administration}
                </Text>
              ) : null}
              {item.status_administratif ? (
                <Text style={styles.text}>
                  Status administratif de l'autorisation de mise sur le marché :{' '}
                  {item.status_administratif}
                </Text>
              ) : null}
              {item.type_procedure_amm ? (
                <Text style={styles.text}>
                  Type de procédure d'autorisation de mise sur le marché :{' '}
                  {item.type_procedure_amm}
                </Text>
              ) : null}
              {item.etat_commercialisation ? (
                <Text style={styles.text}>
                  Etat de commercialisation : {item.etat_commercialisation}
                </Text>
              ) : null}
              {item.data_amm ? (
                <Text style={styles.text}>Date AMM : {item.data_amm}</Text>
              ) : null}
              {item.statut_bdm ? (
                <Text style={styles.text}>Status BDM : {item.statut_bdm}</Text>
              ) : null}
              {item.num_autorisation_europeenne ? (
                <Text style={styles.text}>
                  Numéro de l'autorisation européenne :{' '}
                  {item.num_autorisation_europeenne}
                </Text>
              ) : null}
              {item.titulaires ? (
                <Text style={styles.text}>Titulaires: {item.titulaires}</Text>
              ) : null}
              {item.surveillance_renforcee ? (
                <Text style={styles.text}>
                  Surveillance renforcée : {item.surveillance_renforcee}
                </Text>
              ) : null}
            </View>
          </React.Fragment>
        );
      })}

      {props.cipData.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>Présentation</Text>
            {item.libelle_pres ? (
              <Text style={styles.text}>
                Libellé de la présentation : {item.libelle_pres}
              </Text>
            ) : null}
            {item.status_administratif ? (
              <Text style={styles.text}>
                Statut administratif de la présentation :{' '}
                {item.status_administratif}
              </Text>
            ) : null}
            {item.etat_commercialisation ? (
              <Text style={styles.text}>
                Etat de commercialisation de la présentation tel que déclaré par
                le titulaire de l'AMM : {item.etat_commercialisation}
              </Text>
            ) : null}
            {item.status_administratif ? (
              <Text style={styles.text}>
                Date de la déclaration de commercialisation :{' '}
                {item.status_administratif}
              </Text>
            ) : null}
            {item.date_decla_commercialisation ? (
              <Text style={styles.text}>
                Date de la déclaration de commercialisation :{' '}
                {item.date_decla_commercialisation}
              </Text>
            ) : null}
            {item.agrement_collectivite ? (
              <Text style={styles.text}>
                Agrément aux collectivités : {item.agrement_collectivite}
              </Text>
            ) : null}
            {item.taux_remboursement ? (
              <Text style={styles.text}>
                Taux de remboursement : {item.taux_remboursement}
              </Text>
            ) : null}
            {item.prix_medicament ? (
              <Text style={styles.text}>Prix : {item.prix_medicament} €</Text>
            ) : null}
            {item.indication_droit_remboursement ? (
              <Text style={styles.text}>
                Indication droit au remboursement :{' '}
                {item.indication_droit_remboursement} €
              </Text>
            ) : null}
            {item.cis ? (
              <Text style={styles.text}>Code CIS: {item.cis}</Text>
            ) : null}
            {item.cip7 ? (
              <Text style={styles.text}>Code CIP7 : {item.cip7}</Text>
            ) : null}
            {item.cip13 ? (
              <Text style={styles.text}>Code CIP13 : {item.cip13}</Text>
            ) : null}
          </View>
        );
      })}

      {props.compoData.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>Substance actives</Text>
            {item.denomination_substance ? (
              <Text style={styles.text}>
                Dénomination substance : {item.denomination_substance}
              </Text>
            ) : null}
            {item.designation ? (
              <Text style={styles.text}>Type : {item.designation}</Text>
            ) : null}
            {item.dosage_substance ? (
              <Text style={styles.text}>Dosage : {item.dosage_substance}</Text>
            ) : null}
            {item.code ? (
              <Text style={styles.text}>Code : {item.code}</Text>
            ) : null}
            {item.ref_dosage ? (
              <Text style={styles.text}>
                Référence du dosage pour un comprimé: {item.ref_dosage}
              </Text>
            ) : null}
            {item.date_decla_commercialisation ? (
              <Text style={styles.text}>
                Nature du composant :{' '}
                {item.date_decla_commercialisation === 'SA'
                  ? 'principe actif'
                  : 'fraction thérapeutique'}
              </Text>
            ) : null}
          </View>
        );
      })}

      {props.infoData.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>Informations importantes</Text>
            {item.from_date && item.to_date ? (
              <Text style={styles.text}>
                Du {item.from_date} au {item.to_date}{' '}
              </Text>
            ) : null}
            {item.text ? (
              <TextMl
                textStyle={styles.text}
                text={item.text}
                onPress={onPress}
              />
            ) : null}
          </View>
        );
      })}

      {props.conditionData.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>Condition de prescriptions</Text>
            {item.condition ? (
              <Text style={styles.text}>{item.condition}</Text>
            ) : null}
          </View>
        );
      })}

      {props.smrData.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>Avis SMR (Service médical rendu)</Text>
            {item.has ? (
              <Text style={styles.text}>Code de dossier HAS : {item.has}</Text>
            ) : null}
            {item.motif_eval ? (
              <Text style={styles.text}>
                Motif d'évaluation : {item.motif_eval}
              </Text>
            ) : null}
            {item.valeur_smr ? (
              <Text style={styles.text}>Valeur du SMR : {item.valeur_smr}</Text>
            ) : null}
            {item.libelle_smr ? (
              <Text style={styles.text}>{item.libelle_smr}</Text>
            ) : null}
          </View>
        );
      })}

      {props.asmrData.map((item: any, index: number) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>
              Avis ASMR (Amélioration du service médical rendu)
            </Text>
            {item.has ? (
              <Text style={styles.text}>Code de dossier HAS : {item.has}</Text>
            ) : null}
            {item.motif_eval ? (
              <Text style={styles.text}>
                Motif d'évaluation : {item.motif_eval}
              </Text>
            ) : null}
            {item.valeur_smr ? (
              <Text style={styles.text}>
                Valeur du ASMR : {item.valeur_asmr}
              </Text>
            ) : null}
            {item.libelle_asmr ? (
              <Text style={styles.text}>{item.libelle_asmr}</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 6,
  },
  button: {
    color: '#3028c9',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 3.5,
  },
  textButton: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    margin: 6,
    borderRadius: 10,
    backgroundColor: '#272830',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#e3e4e8',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  text: {color: '#e3e4e8', fontSize: 15, marginTop: 5},
});
