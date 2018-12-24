import { action } from "typesafe-actions";

import { ADD_MOD, REMOVE_MOD, SET_GRADE } from "src/reducers/constants";
import { IFilteredModule } from "src/components/Search";

export const addModule = (module: IFilteredModule, semNum: string) =>
  action(ADD_MOD, { module, semNum });

export const removeModule = (module: IFilteredModule, semNum: string) =>
  action(REMOVE_MOD, { module, semNum });

export interface IGradeObject {
  mc: string;
  semester: string;
  moduleCode: string;
  grade: string;
  prevGrade: string;
}
export const setGrade = (gradeObj: IGradeObject) => action(SET_GRADE, gradeObj);
