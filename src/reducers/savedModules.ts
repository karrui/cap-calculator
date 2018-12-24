import * as _ from "lodash";

import { ISaveModuleAction, ISetGradeAction } from "src/actions";
import { ADD_MOD, REMOVE_MOD, SET_GRADE } from "./constants";

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
      const { semester, moduleCode, grade } = payload;
      return {
        ...state,
        [semester]: {
          ...state[semester],
          [moduleCode]: {
            ...state[semester][moduleCode],
            grade,
            gradePoint:
              parseInt(state[semester][moduleCode].ModuleCredit, 10) *
              gradeDict[grade],
          },
        },
      };
    default:
      return state;
  }
};

const gradeDict = {
  "A+": 5,
  A: 5,
  "A-": 4.5,
  "B+": 4,
  B: 3.5,
  "B-": 3,
  "C+": 2.5,
  C: 2,
  "D+": 1.5,
  D: 1,
  F: 0,
  S: 0,
  U: 0,
};

export default savedModuleReducer;
