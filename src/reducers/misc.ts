import { IMiscAction } from "src/actions";
import {
  SET_CURR_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
  SET_NUM_SEMESTER,
  LIGHT_MODE,
  Theme,
  TOGGLE_THEME,
  DARK_MODE,
} from "./constants";

const defaultMiscState: IMiscState = {
  currSemester: "1",
  numSemesters: 1,
  theme: LIGHT_MODE,
};

interface IMiscState {
  currSemester: string;
  numSemesters: number;
  theme: Theme;
}

const miscReducer = (state = defaultMiscState, action: IMiscAction) => {
  switch (action.type) {
    case SET_CURR_SEMESTER:
      return {
        ...state,
        currSemester: action.payload,
      };
    case ADD_SEMESTER: {
      return {
        ...state,
        currSemester: (state.numSemesters + 1).toString(),
        numSemesters: state.numSemesters + 1,
      };
    }
    case SET_NUM_SEMESTER: {
      return {
        ...state,
        currSemester: action.payload.toString(),
        numSemesters: Number(action.payload),
      };
    }
    case REMOVE_SEMESTER: {
      // disallow removing semester if only 1 semester left
      if (state.numSemesters === 1) {
        return state;
      }
      // edge case where currSemester is now the removed semester
      const newCurrSemester =
        parseInt(state.currSemester, 10) === state.numSemesters
          ? (state.numSemesters - 1).toString()
          : state.currSemester;
      return {
        ...state,
        currSemester: newCurrSemester,
        numSemesters: state.numSemesters - 1,
      };
    }
    case TOGGLE_THEME: {
      return {
        ...state,
        theme: state.theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE,
      };
    }
    default:
      return state;
  }
};

export default miscReducer;
