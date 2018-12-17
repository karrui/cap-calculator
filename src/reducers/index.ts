import { combineReducers } from 'redux';

import moduleBankReducer from './moduleBank';
import savedModuleReducer from './savedModules';

const rootReducer = combineReducers({
  moduleBank: moduleBankReducer,
  savedModules: savedModuleReducer,
});

export default rootReducer;
