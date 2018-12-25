import { IMiscAction } from "src/actions";
import { SET_CURR_SEMESTER, ADD_SEMESTER, REMOVE_SEMESTER } from "./constants";

const defaultMiscState: IMiscState = {
  currSemester: "1",
  numSemesters: 1,
};

interface IMiscState {
  currSemester: string;
  numSemesters: number;
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
        numSemesters: state.numSemesters + 1,
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
    default:
      return state;
  }
};

export default miscReducer;
