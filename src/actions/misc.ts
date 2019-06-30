import { action } from "typesafe-actions";

import {
  SET_CURR_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
  SET_NUM_SEMESTER,
  TOGGLE_THEME,
  SHOW_CUSTOM_MODULE_MODAL,
  CLOSE_CUSTOM_MODULE_MODAL,
} from "src/reducers/constants";
import { IModule } from "src/App";

export const setCurrentSemester = (semNum: string) =>
  action(SET_CURR_SEMESTER, semNum);

export const addSemester = () => action(ADD_SEMESTER);

export const removeSemester = (semester: number) =>
  action(REMOVE_SEMESTER, semester);

export const setNumSemester = (semNum: number) =>
  action(SET_NUM_SEMESTER, semNum);

export const toggleTheme = () => action(TOGGLE_THEME);

export const showCustomModuleModal = (customModule: IModule) =>
  action(SHOW_CUSTOM_MODULE_MODAL, customModule);

export const closeCustomModuleModal = () => action(CLOSE_CUSTOM_MODULE_MODAL);
