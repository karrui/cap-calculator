import * as _ from "lodash";
import { Dispatch } from "redux";
import { action } from "typesafe-actions";

import { CLEAR_MODULE_BANK, SET_MODULE_BANK } from "src/reducers/constants";

export const setModuleBank = () => (dispatch: Dispatch) => {
  const jsonData = require("../data/moduleList.json");
  return dispatch(action(SET_MODULE_BANK, jsonData));
};

export const clearModuleBank = () => action(CLEAR_MODULE_BANK);
