import { combineReducers } from 'redux';

import miscReducer from './misc';
import moduleBankReducer from './moduleBank';
import savedModuleReducer from './savedModules';



const rootReducer = combineReducers({
  misc: miscReducer,
  moduleBank: moduleBankReducer,
  savedModules: savedModuleReducer,
});

export default rootReducer;
