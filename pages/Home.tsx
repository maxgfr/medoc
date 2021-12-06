import {Box, Button} from 'native-base';
import * as React from 'react';
import {View} from 'react-native';
import {downloadUrl, txtToJson} from '../src/helpers';

function HomeScreen() {
  const onPress = async () => {
    const res = await downloadUrl(
      'https://base-donnees-publique.medicaments.gouv.fr/telechargement.php?fichier=CIS_GENER_bdpm.txt',
      (receiver, total) => {
        console.log(receiver, total);
      },
    );
    const finalres = await txtToJson(
      ['id_generique', 'libelle_generique', 'cis', 'type_generique', 'num_tri'],
      res,
    );
    console.log(finalres);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Box>Home Screen</Box>
      <Button onPress={onPress}>Test load</Button>
    </View>
  );
}

export default HomeScreen;
