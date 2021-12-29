import {Box, Button, ScrollView} from 'native-base';
import * as React from 'react';
import {FileName} from '../src/config';

import useStore from '../src/store';

function HomeScreen() {
  const downloadAll = useStore(state => state.downloadAll);
  const clear = useStore(state => state.clear);
  const restoreSearch = useStore(state => state.restoreSearch);
  const searchAll = useStore(state => state.searchAll);
  const searchByCollection = useStore(state => state.searchByCollection);
  const numDownloaded = useStore(state => state.numDownloaded);
  const searchIsReady = useStore(state => state.searchIsReady);
  const allResult = useStore(state => state.allResult);
  const resultByCollection = useStore(state => state.resultByCollection);

  return (
    <ScrollView>
      <Box>{numDownloaded}</Box>
      <Box>{searchIsReady.toString()}</Box>
      <Box>{JSON.stringify(allResult, null, 2)}</Box>
      <Box>{JSON.stringify(resultByCollection, null, 2)}</Box>
      <Button onPress={downloadAll}>Download all</Button>
      <Button onPress={clear}>Clear all</Button>
      <Button onPress={restoreSearch}>Restore search</Button>
      <Button
        onPress={() => {
          searchAll('64793681');
        }}>
        Search all by CIS
      </Button>
      <Button
        onPress={() => {
          searchByCollection('Doliprane', FileName.CIS_bdpm);
        }}>
        Search collection doliprane
      </Button>
      <Button
        onPress={() => {
          searchByCollection('3400934998331', FileName.CIS_CIP_bdpm);
        }}>
        Search collection by cip
      </Button>
    </ScrollView>
  );
}

export default HomeScreen;
