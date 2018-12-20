import * as _ from "lodash";

import { IModuleBankAction } from "src/actions";
import { IModule } from "src/App";
import { CLEAR_MODULE_BANK, SET_MODULE_BANK } from "./constants";

const defaultModuleBankState: IModule[] = [];

const moduleBankReducer = (
  state: IModule[] = defaultModuleBankState,
  action: IModuleBankAction
) => {
  switch (action.type) {
    case SET_MODULE_BANK:
      return action.payload;
    case CLEAR_MODULE_BANK:
      return defaultModuleBankState;
    default:
      return state;
  }
};

export default moduleBankReducer;
