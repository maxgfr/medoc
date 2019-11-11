import { AsyncStorage } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as SQLite from 'expo-sqlite';

const done = (type, payload) => (
  {
    type: type,
    payload: payload
  }
);

export const initSearch = () => {
  return (dispatch, getState) => {
    dispatch(done('INIT_SEARCH', {}));
  }
}

export const loadDbAsmr = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbAsmr.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbAsmr.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbAsmr.db');
        //console.log('dbAsmr loaded');
        dispatch(done('LOAD_DB_ASMR', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const loadDbCIP = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbCIP.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbCIP.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbCIP.db');
        //console.log('dbCIP loaded');
        dispatch(done('LOAD_DB_CIP', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const loadDbCompo = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbCompo.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbCompo.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbCompo.db');
        //console.log('dbCompo loaded');
        dispatch(done('LOAD_DB_COMPO', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const loadDbCondition = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbCondition.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbCondition.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbCondition.db')
        //console.log('dbCondition loaded');
        dispatch(done('LOAD_DB_CONDITION', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const loadDbGeneral = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbGeneral.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbGeneral.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbGeneral.db')
        //console.log('dbGeneral loaded');
        dispatch(done('LOAD_DB_GENERAL', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const loadDbInfo = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbInfo.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbInfo.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbInfo.db')
        //console.log('dbGeneral loaded');
        dispatch(done('LOAD_DB_INFO', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const loadDbSmr = () => {
  return (dispatch, getState) => {
    var base_uri = Asset.fromModule(require('../../assets/database/dbSmr.db')).uri;
    var new_uri = `${FileSystem.documentDirectory}SQLite/dbSmr.db`;
    ensureFolderExists().then(() => {
      FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
        var db = SQLite.openDatabase('dbSmr.db');
        //console.log('dbSmr loaded');
        dispatch(done('LOAD_DB_SMR', {db: db, dbLoaded: true}));
      }).catch((err) => {
        console.log(err);
      });
    });
  }
};

export const searchByDeno = (db, name) => {
  return (dispatch, getState) => {
    dispatch(done('SEARCH_BY_DENO', {isSearching: true, data: [], denomination: '' }));
    db.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM CIS_GENERAL WHERE denomination_medicament LIKE ?`, [name], (_, { rows }) => {
            //console.log(JSON.stringify(rows))
            if(rows.length >= 1) {
              //console.log(rows);
              var deno = rows._array[0].denomination_medicament.substr(0, rows._array[0].denomination_medicament.indexOf(','));
              dispatch(done('SEARCH_BY_DENO', {isSearching: false, data: rows._array, denomination: deno }));
            } else {
              dispatch(done('SEARCH_BY_DENO', {isSearching: false, data: getState().app.generalData, denomination: getState().app.denomination }));
            }
          });
        },
        (err) => {
          console.log("Failed Message", err);
          dispatch(done('SEARCH_BY_DENO', {isSearching: false, data: [], denomination: '' }));
        }
      );
  }
};

export const fillData = (cis) => {
  return (dispatch, getState) => {
    //console.log(getState());
    var appReducer = getState().app;
    fetchData (appReducer.dbAsmr, 'CIS_HAS_ASMR', 'asmrData', cis, dispatch);
    fetchData (appReducer.dbCIP, 'CIP_CIS', 'cipData', cis, dispatch);
    fetchData (appReducer.dbCompo, 'CIS_COMPO', 'compoData', cis, dispatch);
    fetchData (appReducer.dbCondition, 'CIS_CPD', 'conditionData', cis, dispatch);
    fetchData (appReducer.dbGeneral, 'CIS_GENERAL', 'generalData', cis, dispatch);
    fetchData (appReducer.dbInfo, 'CIS_InfoImportantes', 'infoData', cis, dispatch);
    fetchData (appReducer.dbSmr, 'CIS_HAS_SMR', 'smrData', cis, dispatch);
  }
};

export const searchByCip13 = (db, cip13) => {
  return (dispatch, getState) => {
    dispatch(done('SEARCH_BY_CIP13', {data: [], scanError: false, isRunning: true}));
    db.transaction(
        tx => {
          tx.executeSql(`SELECT cis FROM CIP_CIS WHERE cip13 = ?`, [cip13], (_, { rows }) => {
            //console.log(JSON.stringify(rows))
            if(rows.length >= 1) {
              //console.log(rows);
              var deno = rows._array[0].denomination_medicament.substr(0, rows._array[0].denomination_medicament.indexOf(','));
              dispatch(done('SEARCH_BY_CIP13', {data: rows._array, scanError: false, isRunning: false}));
              var appReducer = getState().app;
              fetchData (appReducer.dbAsmr, 'CIS_HAS_ASMR', 'asmrData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbCompo, 'CIS_COMPO', 'compoData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbCondition, 'CIS_CPD', 'conditionData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbGeneral, 'CIS_GENERAL', 'generalData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbInfo, 'CIS_InfoImportantes', 'infoData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbSmr, 'CIS_HAS_SMR', 'smrData', rows._array[0].cis, dispatch);
            } else {
              dispatch(done('SEARCH_BY_CIP13', {data: [], scanError: true, isRunning: false}));
            }
          });
        },
        (err) => {
          console.log("Failed Message", err);
          dispatch(done('SEARCH_BY_CIP13', {data: [], scanError: true, isRunning: false}));
        }
      );
  }
};

export const getHistoric = () => {
  return async (dispatch, getState) => {
    try {
      const myArray = await AsyncStorage.getItem('@historique');
      if (myArray !== null) {
        var array = JSON.parse(myArray);
        dispatch(done('UPDATE_HISTORIC', {historic: array}));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const setHistoric = (item, currentHistoric) => {
  return (dispatch, getState) => {
    var array = currentHistoric;
    for (var i = 0; i < array.length; i++) {
        if (array[i].cis === item.cis) {
            array.splice(i, 1);
        }
    }
    array.unshift(item);
    if(array.length > 10) {
      array.pop();
    }
    dispatch(done('UPDATE_HISTORIC', {historic: array}));
    try {
      AsyncStorage.setItem('@historique', JSON.stringify(array));
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteHistoric = (currentHistoric) => {
  return async (dispatch, getState) => {
    try {
      if(currentHistoric.length > 0) {
        await AsyncStorage.clear();
        dispatch(done('UPDATE_HISTORIC', {historic: []}));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

var ensureFolderExists = () => {
  const path = `${FileSystem.documentDirectory}SQLite`
  return FileSystem.getInfoAsync(path).then(({exists}) => {
    if (!exists) {
      return FileSystem.makeDirectoryAsync(path)
    } else {
      return Promise.resolve(true)
    }
  })
};

var fetchData = (db, dbName, storeName, cis, dispatch) => {
  db.transaction(
      tx => {
        tx.executeSql(`SELECT * FROM `+dbName+` WHERE cis = ?`, [cis], (_, { rows }) => {
          //console.log(JSON.stringify(rows))
          if(rows.length >= 1) {
            console.log(storeName);
            console.log(rows._array);
            dispatch(done('FETCH_DATA',{storeName: storeName, data: rows._array}));
          }
        });
      },
      (err) => {
        console.log("Failed Message", err);
      }
    );
};
