import { action } from "typesafe-actions";

import {
  ADD_MOD,
  REMOVE_MOD,
  SET_GRADE,
  SET_SU,
  SET_SAVED_MODULES,
} from "src/reducers/constants";
import { IFilteredModule } from "src/components/search/Search";
import { ISavedModule, ISavedModuleState } from "src/reducers/savedModules";

export const addModule = (module: IFilteredModule, semNum: string) =>
  action(ADD_MOD, { module, semNum });

export const removeModule = (module: IFilteredModule, semNum: string) =>
  action(REMOVE_MOD, { module, semNum });

export interface IGradeObject {
  module: ISavedModule;
  semester: string;
  grade: string;
  prevGrade: string;
}
export const setGrade = (gradeObj: IGradeObject) => action(SET_GRADE, gradeObj);

export const setSU = (gradeObj: IGradeObject) => action(SET_SU, gradeObj);

export const setSavedModules = (savedModules: ISavedModuleState) =>
  action(SET_SAVED_MODULES, savedModules);
