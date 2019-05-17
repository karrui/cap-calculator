import { action } from "typesafe-actions";

import {
  SET_CURR_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
  SET_NUM_SEMESTER,
  TOGGLE_THEME,
} from "src/reducers/constants";

export const setCurrentSemester = (semNum: string) =>
  action(SET_CURR_SEMESTER, semNum);

export const addSemester = () => action(ADD_SEMESTER);

export const removeSemester = (semester: number) =>
  action(REMOVE_SEMESTER, semester);

export const setNumSemester = (semNum: number) =>
  action(SET_NUM_SEMESTER, semNum);

export const toggleTheme = () => action(TOGGLE_THEME);
