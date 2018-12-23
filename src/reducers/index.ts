import { combineReducers } from "redux";

import misc from "./misc";
import moduleBank from "./moduleBank";
import savedModules from "./savedModules";
import capCalculator from "./capCalculator";

const rootReducer = combineReducers({
  misc,
  moduleBank,
  savedModules,
  capCalculator,
});

export default rootReducer;
