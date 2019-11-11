import { combineReducers } from 'redux';

const INITIAL_STATE = {
  dbAsmr: null,
  dbAsmrLoaded: false,
  dbCIP: null,
  dbCIPLoaded: false,
  dbCompo: null,
  dbCompoLoaded: false,
  dbCondition: null,
  dbConditionLoaded: false,
  dbGeneral: null,
  dbGeneralLoaded: false,
  dbInfo: null,
  dbInfoLoaded: false,
  dbSmr: null,
  dbSmrLoaded: false,
  scanError: false,
  isSearching: false,
  asmrData: [],
  cipData: [],
  compoData: [],
  conditionData: [],
  generalData: [],
  infoData: [],
  smrData: [],
  historic: [],
  denomination: ''
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOAD_DB_ASMR':
      return {
        ...state,
        dbAsmr: action.payload.db,
        dbAsmrLoaded: action.payload.dbLoaded
      };
    case 'LOAD_DB_CIP':
      return {
        ...state,
        dbCIP: action.payload.db,
        dbCIPLoaded: action.payload.dbLoaded
      };
    case 'LOAD_DB_COMPO':
      return {
        ...state,
        dbCompo: action.payload.db,
        dbCompoLoaded: action.payload.dbLoaded
      };
    case 'LOAD_DB_CONDITION':
      return {
        ...state,
        dbCondition: action.payload.db,
        dbConditionLoaded: action.payload.dbLoaded
      };
    case 'LOAD_DB_GENERAL':
      return {
        ...state,
        dbGeneral: action.payload.db,
        dbGeneralLoaded: action.payload.dbLoaded
      };
    case 'LOAD_DB_INFO':
      return {
        ...state,
        dbInfo: action.payload.db,
        dbInfoLoaded: action.payload.dbLoaded
      };
    case 'LOAD_DB_SMR':
      return {
        ...state,
        dbSmr: action.payload.db,
        dbSmrLoaded: action.payload.dbLoaded
      };
    case 'FETCH_DATA':
      return {
        ...state,
        [`${action.payload.storeName}`]: action.payload.data
      };
    case 'SEARCH_BY_DENO':
      return {
        ...state,
        generalData: action.payload.data,
        isSearching: action.payload.isSearching,
        denomination: action.payload.denomination
      };
    case 'SEARCH_BY_CIP13':
      return {
        ...state,
        cipData: action.payload.data,
        isRunning: action.payload.isRunning,
        scanError: action.payload.scanError
      };
    case 'UPDATE_HISTORIC':
      return {
        ...state,
        historic: action.payload.historic
      };
    case 'INIT_SEARCH':
      return {
        ...state,
        generalData: []
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer,
});
