import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import misc from "./misc";
import moduleBank from "./moduleBank";
import savedModules from "./savedModules";
import capCalculator from "./capCalculator";
import undoHistoryReducer from "./undoHistoryReducer";

const miscPersistConfig = {
  storage,
  key: "misc",
  blacklist: ["customModuleModalInfo"],
};

const rootReducer = combineReducers({
  moduleBank,
  savedModules,
  capCalculator,
  misc: persistReducer(miscPersistConfig, misc),
  undoHistory: undoHistoryReducer,
});

export default rootReducer;
