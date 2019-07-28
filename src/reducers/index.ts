import { combineReducers } from "redux";
import { undoHistoryReducer } from "redux-undo-redo";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import misc from "./misc";
import moduleBank from "./moduleBank";
import savedModules from "./savedModules";
import capCalculator from "./capCalculator";

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
