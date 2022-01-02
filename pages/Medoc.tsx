import {Box} from 'native-base';
import React from 'react';
import {Medocomponent} from '../src/components/Medocomponent';
import {FileName} from '../src/config';
import useStore from '../src/store';
import {theme} from '../src/theme';

export default function MedocScreen() {
  const {cisResult} = useStore(state => ({
    cisResult: state.cisResult,
    allResult: state.allResult,
    progress: state.progress,
  }));
  return (
    <Box bg={theme.colors.background} width="100%" height="100%" px="5">
      <Medocomponent
        generalData={
          cisResult.find(item => item.index === FileName.CIS_GENER_bdpm)?.result
        }
        cipData={
          cisResult.find(item => item.index === FileName.CIS_CIP_bdpm)?.result
        }
        compoData={
          cisResult.find(item => item.index === FileName.CIS_COMPO_bdpm)?.result
        }
        infoData={
          cisResult.find(item => item.index === FileName.CIS_InfoImportantes)
            ?.result
        }
        conditionData={
          cisResult.find(item => item.index === FileName.CIS_bdpm)?.result
        }
        smrData={
          cisResult.find(item => item.index === FileName.CIS_HAS_SMR_bdpm)
            ?.result
        }
        asmrData={
          cisResult.find(item => item.index === FileName.CIS_HAS_ASMR_bdpm)
            ?.result
        }
      />
    </Box>
  );
}
