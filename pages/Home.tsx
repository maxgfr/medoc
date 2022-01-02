import {Box, ScrollView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Modal} from '../src/components/Modal';
import {Search} from '../src/components/Search';
import {SearchItem} from '../src/components/SearchItem';
import {TouchableItem} from '../src/components/TouchableItem';
import {getAsync} from '../src/helpers';
import useStore from '../src/store';
import {theme} from '../src/theme';
import {useCamera} from '../src/hooks/useCamera';
import {HomeProps} from '../App';

export default function HomeScreen({navigation}: HomeProps) {
  const [searchValue, setSearchValue] = useState('');
  const {downloadAll, searchAll, searchByCis, restoreSearch} = useStore(
    state => ({
      downloadAll: state.downloadAll,
      searchAll: state.searchAll,
      searchByCis: state.searchByCis,
      restoreSearch: state.restoreSearch,
    }),
  );
  const {searchIsReady, allResult, progress} = useStore(state => ({
    searchIsReady: state.searchIsReady,
    allResult: state.allResult,
    progress: state.progress,
  }));
  const {requestCameraPermissions} = useCamera();

  useEffect(() => {
    getAsync('DB')
      .then(() => {
        restoreSearch();
      })
      .catch(() => {
        downloadAll();
      });
  }, [downloadAll, restoreSearch]);

  const onSearch = (value: string) => {
    setSearchValue(value);
    searchAll(value);
  };

  const onClickItem = (cis: string) => {
    searchByCis(cis);
    navigation.navigate('Médicament');
  };

  const onClickCamera = () => {
    requestCameraPermissions().then(() => {
      navigation.navigate('Recherche par code-barre');
    });
  };

  return (
    <Box bg={theme.colors.background} width="100%" height="100%" px="5">
      {!searchIsReady && (
        <Modal
          visible={true}
          content="Chargement des données. L'opération peut durer quelques minutes"
          progress={progress}
          hasLoader={!searchIsReady}
        />
      )}
      <ScrollView>
        <Search onChange={onSearch} />
        {searchValue === '' && (
          <>
            <TouchableItem
              onClick={downloadAll}
              name="Mettre à jour la base de données"
            />
            <TouchableItem
              name="Effectuez une recherche avec l'appareil photo de votre smartphone"
              onClick={onClickCamera}
            />
          </>
        )}
        {allResult.map((item, index) => (
          <SearchItem
            key={index}
            onClick={() => onClickItem(item.item.cis)}
            name={item.item.denomination_medicament}
          />
        ))}
      </ScrollView>
    </Box>
  );
}
