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
  SHOW_CUSTOM_MODULE_MODAL,
  CLOSE_CUSTOM_MODULE_MODAL,
  UNDO,
} from "./constants";
import { IModule } from "src/App";

const defaultMiscState: IMiscState = {
  currSemester: "1",
  numSemesters: 1,
  theme: LIGHT_MODE,
  customModuleModalInfo: {
    isShown: false,
  },
};

export interface IMiscState {
  currSemester: string;
  numSemesters: number;
  theme: Theme;
  customModuleModalInfo: {
    isShown: boolean;
    module?: IModule;
  };
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

    case SHOW_CUSTOM_MODULE_MODAL: {
      return {
        ...state,
        customModuleModalInfo: {
          isShown: true,
          module: action.payload,
        },
      };
    }

    case CLOSE_CUSTOM_MODULE_MODAL: {
      return {
        ...state,
        customModuleModalInfo: {
          isShown: false,
        },
      };
    }

    case UNDO: {
      // @ts-ignore
      return action.payload ? action.payload.misc : state;
    }

    default:
      return {
        ...defaultMiscState,
        ...state,
      };
  }
};

export default miscReducer;
