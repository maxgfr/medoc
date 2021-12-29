import {Box, Button, ScrollView} from 'native-base';
import * as React from 'react';

import useStore from '../src/store';

function HomeScreen() {
  const downloadAll = useStore(state => state.downloadAll);
  const clear = useStore(state => state.clear);
  const restoreSearch = useStore(state => state.restoreSearch);
  const searchAll = useStore(state => state.searchAll);
  const searchByCis = useStore(state => state.searchByCis);
  const searchByCip13 = useStore(state => state.searchByCip13);
  const numDownloaded = useStore(state => state.numDownloaded);
  const searchIsReady = useStore(state => state.searchIsReady);
  const allResult = useStore(state => state.allResult);
  const cip13Result = useStore(state => state.cip13Result);
  const cisResult = useStore(state => state.cisResult);

  return (
    <ScrollView>
      <Box>{numDownloaded}</Box>
      <Box>{searchIsReady.toString()}</Box>
      <Box>{JSON.stringify(allResult, null, 2)}</Box>
      <Box>{JSON.stringify(cip13Result, null, 2)}</Box>
      <Box>{JSON.stringify(cisResult, null, 2)}</Box>
      <Button onPress={downloadAll}>Download all</Button>
      <Button onPress={clear}>Clear all</Button>
      <Button onPress={restoreSearch}>Restore search</Button>
      <Button
        onPress={() => {
          searchByCis('64793681');
        }}>
        Search by CIS
      </Button>
      <Button
        onPress={() => {
          searchAll('doliprane');
        }}>
        Search collection doliprane
      </Button>
      <Button
        onPress={() => {
          searchByCip13('3400934998331');
        }}>
        Search collection by cip
      </Button>
    </ScrollView>
  );
}

export default HomeScreen;
