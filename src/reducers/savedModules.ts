import * as _ from "lodash";

import { ISaveModuleAction, ISetGradeAction } from "src/actions";
import {
  ADD_MOD,
  REMOVE_MOD,
  SET_GRADE,
  GRADE_DICT,
  REMOVE_SEMESTER,
} from "./constants";

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
  const { payload, type } = action;
  switch (type) {
    case ADD_MOD: {
      const { semNum, module } = payload;
      return {
        ...state,
        [semNum]: {
          ...state[semNum],
          [module.ModuleCode!]: {
            ModuleTitle: module.ModuleTitle,
            ModuleCode: module.ModuleCode,
            ModuleCredit: module.ModuleCredit,
          },
        },
      };
    }
    case REMOVE_MOD: {
      const { [payload.module.ModuleCode!]: removedValue, ...rest } = state[
        payload.semNum
      ];
      return {
        ...state,
        [payload.semNum]: rest,
      };
    }
    case REMOVE_SEMESTER: {
      const semesterToRemove = Object.keys(state).length;
      const { [semesterToRemove]: removedSemester, ...rest } = state;
      return rest;
    }
    case SET_GRADE: {
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
    }
    default:
      return state;
  }
};

export default savedModuleReducer;
