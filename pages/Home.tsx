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
import {StorageKey} from '../src/config';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen({navigation}: HomeProps) {
  const [searchValue, setSearchValue] = useState('');
  const {
    downloadAll,
    searchAll,
    searchByCis,
    restoreSearch,
    getHistoric,
    getLatestUpdate,
    initSearch,
  } = useStore(state => ({
    downloadAll: state.downloadAll,
    searchAll: state.searchAll,
    searchByCis: state.searchByCis,
    restoreSearch: state.restoreSearch,
    getHistoric: state.getHistoric,
    getLatestUpdate: state.getLatestUpdate,
    initSearch: state.initSearch,
  }));
  const {searchIsReady, allResult, progress, historic, lastUpdate} = useStore(
    state => ({
      searchIsReady: state.searchIsReady,
      allResult: state.allResult,
      progress: state.progress,
      historic: state.historic,
      lastUpdate: state.lastUpdate,
    }),
  );
  const {requestCameraPermissions} = useCamera();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (searchValue) {
          setSearchValue('');
          initSearch();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [initSearch, searchValue]),
  );

  useEffect(() => {
    getAsync(StorageKey.DB)
      .then(() => {
        getLatestUpdate();
        restoreSearch();
        getHistoric();
      })
      .catch(() => {
        downloadAll();
      });
  }, [downloadAll, restoreSearch, getHistoric, getLatestUpdate]);

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
          content="Chargement des données. L'opération peut durer quelques minutes..."
          progress={progress}
          hasLoader={!searchIsReady}
        />
      )}
      <ScrollView>
        <Search onChange={onSearch} value={searchValue} />
        {searchValue === '' && (
          <>
            <TouchableItem
              onClick={downloadAll}
              name={`Mettre à jour la base de données (Dernière mise à jour : ${lastUpdate})`}
            />
            <TouchableItem
              name="Effectuez une recherche avec l'appareil photo de votre smartphone"
              onClick={onClickCamera}
            />
            {historic.length > 0 ? (
              <>
                {historic.map(item => (
                  <SearchItem
                    key={item.cis}
                    name={item.name}
                    onClick={() => onClickItem(item.cis)}
                  />
                ))}
              </>
            ) : (
              <TouchableItem disabled name="Aucun historic" />
            )}
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
