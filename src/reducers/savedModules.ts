import * as _ from "lodash";

import { ISaveModuleAction, ISetGradeAction } from "src/actions";
import { ADD_MOD, REMOVE_MOD, SET_GRADE, GRADE_DICT } from "./constants";

export interface ISavedModule {
  ModuleTitle: string;
  ModuleCode: string;
  ModuleCredit: string;
  grade?: string;
  gradePoint?: number;
}

export interface ISavedModuleState {
  [semesterNum: number]: {
    [ModuleCode: string]: ISavedModule;
  };
}

const defaultSavedModuleState: ISavedModuleState = {};

const savedModuleReducer = (
  state: ISavedModuleState = defaultSavedModuleState,
  action: any
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
    case SET_GRADE:
      const {
        semester,
        grade,
        module: { ModuleCode },
      } = payload;
      return {
        ...state,
        [semester]: {
          ...state[semester],
          [ModuleCode]: {
            ...state[semester][ModuleCode],
            grade,
            gradePoint:
              parseInt(state[semester][ModuleCode].ModuleCredit, 10) *
              GRADE_DICT[grade],
          },
        },
      };
    default:
      return state;
  }
};

export default savedModuleReducer;
