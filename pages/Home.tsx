import {Box, FlatList} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Modal} from '../src/components/Modal';
import {Search} from '../src/components/Search';
import {SearchItem} from '../src/components/SearchItem';
import {TouchableItem} from '../src/components/TouchableItem';
import {getAsync} from '../src/helpers';

import useStore from '../src/store';
import {theme} from '../src/theme';

function HomeScreen() {
  const [searchValue, setSearchValue] = useState('');
  const downloadAll = useStore(state => state.downloadAll);
  const restoreSearch = useStore(state => state.restoreSearch);
  const searchAll = useStore(state => state.searchAll);
  const searchByCis = useStore(state => state.searchByCis);
  const searchByCip13 = useStore(state => state.searchByCip13);
  const searchIsReady = useStore(state => state.searchIsReady);
  const allResult = useStore(state => state.allResult);
  const cip13Result = useStore(state => state.cip13Result);
  const cisResult = useStore(state => state.cisResult);
  const progress = useStore(state => state.progress);

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
    // searchAll(value);
  };

  const onClickItem = (cis: string) => {
    searchByCis(cis);
  };

  const onClickCamera = () => {};

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
      <FlatList
        data={allResult}
        renderItem={({item}) => (
          <SearchItem
            onClick={() => onClickItem(item.cis)}
            name={item.denomination_medicament}
          />
        )}
        ListHeaderComponent={() => (
          <Box>
            <Search onChange={onSearch} value={searchValue} />
            <TouchableItem
              onClick={onClickCamera}
              name="Mettre à jour la base de données"
            />
            <TouchableItem
              name="Effectuez une recherche avec l'appareil photo de votre smartphone"
              onClick={onClickCamera}
            />
          </Box>
        )}
      />
    </Box>
    // <ScrollView>
    //   <Box>{downloadIsEnded.toString()}</Box>
    //   <Box>{searchIsReady.toString()}</Box>
    //   <Box>{numberOfDownload.toString()}</Box>
    //   <Box>{JSON.stringify(allResult, null, 2)}</Box>
    //   <Box>{JSON.stringify(cip13Result, null, 2)}</Box>
    //   <Box>{JSON.stringify(cisResult, null, 2)}</Box>
    //   <Button onPress={downloadAll}>Download all</Button>
    //   <Button onPress={clear}>Clear all</Button>
    //   <Button onPress={restoreSearch}>Restore search</Button>
    //   <Button
    //     onPress={() => {
    //       searchByCis('64793681');
    //     }}>
    //     Search by CIS
    //   </Button>
    //   <Button
    //     onPress={() => {
    //       searchAll('doliprane');
    //     }}>
    //     Search collection doliprane
    //   </Button>
    //   <Button
    //     onPress={() => {
    //       searchByCip13('3400934998331');
    //     }}>
    //     Search collection by cip
    //   </Button>
    // </ScrollView>
  );
}

export default HomeScreen;
