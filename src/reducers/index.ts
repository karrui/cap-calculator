import { combineReducers } from "redux";

import misc from "./misc";
import moduleBank from "./moduleBank";
import savedModules from "./savedModules";

const rootReducer = combineReducers({
  misc,
  moduleBank,
  savedModules,
});

export default rootReducer;
