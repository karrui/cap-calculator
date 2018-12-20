import { IMiscAction } from "src/actions";
import { SET_CURR_SEMESTER } from "./constants";

const defaultMiscState: IMiscState = {
  currSemester: "1",
};

interface IMiscState {
  currSemester: string;
}

const miscReducer = (state = defaultMiscState, action: IMiscAction) => {
  switch (action.type) {
    case SET_CURR_SEMESTER:
      return {
        currSemester: action.payload,
      };
    default:
      return state;
  }
};

export default miscReducer;
