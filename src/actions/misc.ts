import { action } from "typesafe-actions";

import {
  SET_CURR_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
} from "src/reducers/constants";

export const setCurrentSemester = (semNum: string) =>
  action(SET_CURR_SEMESTER, semNum);

export const addSemester = () => action(ADD_SEMESTER);

export const removeSemester = (semester: number) =>
  action(REMOVE_SEMESTER, semester);
