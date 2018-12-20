import { action } from "typesafe-actions";

import { SET_CURR_SEMESTER } from "src/reducers/constants";

export const setCurrentSemester = (semNum: string) =>
  action(SET_CURR_SEMESTER, semNum);
