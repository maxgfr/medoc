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
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbAsmr');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbAsmr.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbAsmr.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbAsmr.db');
          //console.log('dbAsmr loaded');
          dispatch(done('LOAD_DB_ASMR', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbAsmr', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbAsmr.db');
      dispatch(done('LOAD_DB_ASMR', {db: db, dbLoaded: true}));
    }
  }
};

export const loadDbCIP = () => {
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbCIP');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbCIP.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbCIP.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbCIP.db');
          //console.log('dbCIP loaded');
          dispatch(done('LOAD_DB_CIP', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbCIP', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbCIP.db');
      dispatch(done('LOAD_DB_CIP', {db: db, dbLoaded: true}));
    }
  }
};

export const loadDbCompo = () => {
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbCompo');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbCompo.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbCompo.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbCompo.db');
          //console.log('dbCompo loaded');
          dispatch(done('LOAD_DB_COMPO', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbCompo', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbCompo.db');
      dispatch(done('LOAD_DB_COMPO', {db: db, dbLoaded: true}));
    }
  }
};

export const loadDbCondition = () => {
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbCondition');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbCondition.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbCondition.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbCondition.db')
          //console.log('dbCondition loaded');
          dispatch(done('LOAD_DB_CONDITION', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbCondition', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbCondition.db');
      dispatch(done('LOAD_DB_CONDITION', {db: db, dbLoaded: true}));
    }
  }
};

export const loadDbGeneral = () => {
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbGeneral');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbGeneral.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbGeneral.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbGeneral.db')
          //console.log('dbGeneral loaded');
          dispatch(done('LOAD_DB_GENERAL', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbGeneral', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbGeneral.db');
      dispatch(done('LOAD_DB_GENERAL', {db: db, dbLoaded: true}));
    }
  }
};

export const loadDbInfo = () => {
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbInfo');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbInfo.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbInfo.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbInfo.db')
          //console.log('dbGeneral loaded');
          dispatch(done('LOAD_DB_INFO', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbInfo', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbInfo.db');
      dispatch(done('LOAD_DB_INFO', {db: db, dbLoaded: true}));
    }
  }
};

export const loadDbSmr = () => {
  return async (dispatch, getState) => {
    const needDownload = await AsyncStorage.getItem('@dbSmr');
    if(needDownload === null) {
      var base_uri = Asset.fromModule(require('../../assets/database/dbSmr.db')).uri;
      var new_uri = `${FileSystem.documentDirectory}SQLite/dbSmr.db`;
      ensureFolderExists().then(() => {
        FileSystem.createDownloadResumable(base_uri, new_uri).downloadAsync().then(() => {
          var db = SQLite.openDatabase('dbSmr.db');
          //console.log('dbSmr loaded');
          dispatch(done('LOAD_DB_SMR', {db: db, dbLoaded: true}));
        })
        .then(AsyncStorage.setItem('@dbSmr', 'done'))
        .catch((err) => {
          console.log(err);
        });
      });
    } else {
      var db = SQLite.openDatabase('dbSmr.db');
      dispatch(done('LOAD_DB_SMR', {db: db, dbLoaded: true}));
    }
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
          reinitStorage();
          dispatch(done('SEARCH_BY_DENO', {isSearching: false, data: [], denomination: '' }));
        }
      );
  }
};

export const fillData = (cis, dn) => {
  return (dispatch, getState) => {
    //console.log(getState());
    var deno = dn.substr(0, dn.indexOf(','));
    dispatch(done('SET_DENO', {denomination: deno }));
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
    //dispatch(done('SEARCH_BY_CIP13', {data: [], scanError: false, isRunning: true}));
    //dispatch(done('INIT_DATA', {}));
    db.transaction(
        tx => {
          tx.executeSql(`SELECT * FROM CIP_CIS WHERE cip13 = ?`, [cip13], (_, { rows }) => {
            //console.log(JSON.stringify(rows))
            if(rows.length >= 1) {
              //console.log(rows);
              dispatch(done('SET_DENO', {denomination: "SCAN" }));
              dispatch(done('SEARCH_BY_CIP13', {data: rows._array, scanError: false, isRunning: false}));
              var appReducer = getState().app;
              fetchData (appReducer.dbAsmr, 'CIS_HAS_ASMR', 'asmrData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbCompo, 'CIS_COMPO', 'compoData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbCondition, 'CIS_CPD', 'conditionData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbGeneral, 'CIS_GENERAL', 'generalData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbInfo, 'CIS_InfoImportantes', 'infoData', rows._array[0].cis, dispatch);
              fetchData (appReducer.dbSmr, 'CIS_HAS_SMR', 'smrData', rows._array[0].cis, dispatch);
            }
          });
        },
        (err) => {
          console.log("Failed Message", err);
          reinitStorage();
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
        //await AsyncStorage.clear();
        try {
          AsyncStorage.setItem('@historique', JSON.stringify([]));
        } catch (error) {
          console.log(error);
        }
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

var ensureFileExists = (file) => {
  const path = `${FileSystem.cacheDirectory}SQLite/${file}`
  return FileSystem.getInfoAsync(path).then(({exists}) => {
    if (!exists) {
      return Promise.resolve(true)
    } else {
      return Promise.resolve(false)
    }
  })
};

var reinitStorage = () => {
  try {
    AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

var fetchData = (db, dbName, storeName, cis, dispatch) => {
  db.transaction(
      tx => {
        tx.executeSql(`SELECT * FROM `+dbName+` WHERE cis = ?`, [cis], (_, { rows }) => {
          //console.log(JSON.stringify(rows))
          if(rows.length >= 1) {
            //console.log(storeName);
            //console.log(rows._array);
            dispatch(done('FETCH_DATA',{storeName: storeName, data: rows._array}));
          }
        });
      },
      (err) => {
        console.log("Failed Message", err);
      }
    );
};
