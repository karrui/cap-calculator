import * as _ from "lodash";

import { IModuleBankAction } from "src/actions";
import { IModule } from "src/App";
import { CLEAR_MODULE_BANK, SET_MODULE_BANK } from "./constants";

const defaultModuleBankState: IModule[] = [];

const moduleBankReducer = (
  state: IModule[] = defaultModuleBankState,
  action: IModuleBankAction
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MODULE_BANK:
      return payload;
    case CLEAR_MODULE_BANK:
      return defaultModuleBankState;
    default:
      return state;
  }
};

export default moduleBankReducer;
