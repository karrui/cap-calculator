import * as _ from "lodash";

import { ISaveModuleAction } from "src/actions";
import { ADD_MOD, REMOVE_MOD } from "./constants";

export interface ISavedModule {
  ModuleTitle: string;
  ModuleCode: string;
  ModuleCredit: string;
  grade?: number;
  SU?: boolean;
}

export interface ISavedModuleState {
  [semesterNum: number]: {
    [ModuleCode: string]: ISavedModule;
  };
}

const defaultSavedModuleState: ISavedModuleState = {};

const savedModuleReducer = (
  state: ISavedModuleState = defaultSavedModuleState,
  action: ISaveModuleAction
) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_MOD:
      return {
        ...state,
        [payload.semNum]: {
          ...state[payload.semNum],
          [payload.module.ModuleCode!]: {
            ModuleTitle: payload.module.ModuleTitle,
            ModuleCode: payload.module.ModuleCode,
            ModuleCredit: payload.module.ModuleCredit,
          },
        },
      };
    case REMOVE_MOD:
      const { [payload.module.ModuleCode!]: removedValue, ...rest } = state[
        payload.semNum
      ];
      return {
        ...state,
        [payload.semNum]: rest,
      };
    default:
      return state;
  }
};

export default savedModuleReducer;
