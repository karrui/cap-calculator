import { ISaveModuleAction } from "src/actions";
import { ADD_MOD, REMOVE_MOD } from "./constants";

const defaultCapCalcState: ICapCalcState = {
  totalMcs: 0,
  semesterMcs: {},
};

interface ICapCalcState {
  totalMcs: number;
  semesterMcs: {
    [semester: string]: number;
  };
}

// uses same actions ADD/REMOVE_MOD actions as savedModules
const capCalculatorReducer = (
  state: ICapCalcState = defaultCapCalcState,
  action: ISaveModuleAction
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MOD: {
      // assert no duplicate modules since front end already blocks
      return {
        totalMcs: state.totalMcs + parseInt(payload.module.ModuleCredit!, 10),
        semesterMcs: {
          ...state.semesterMcs,
          [payload.semNum]:
            state.semesterMcs[payload.semNum] +
            parseInt(payload.module.ModuleCredit!, 10),
        },
      };
    }
    case REMOVE_MOD: {
      return {
        totalMcs: state.totalMcs - parseInt(payload.module.ModuleCredit!, 10),
        semesterMcs: {
          ...state.semesterMcs,
          [payload.semNum]:
            state.semesterMcs[payload.semNum] -
            parseInt(payload.module.ModuleCredit!, 10),
        },
      };
    }
    default:
      return state;
  }
};

export default capCalculatorReducer;
