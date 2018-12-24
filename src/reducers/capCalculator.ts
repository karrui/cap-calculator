import { ISaveModuleAction, ISetGradeAction } from "src/actions";
import { ADD_MOD, REMOVE_MOD, SET_GRADE, GRADE_DICT } from "./constants";

const defaultCapCalcState: ICapCalcState = {
  totalMcs: 0,
  totalGradePoint: 0,
  semesterMcs: {},
  semesterGradePoint: {},
};

interface ICapCalcState {
  totalMcs: number;
  totalGradePoint: number;
  semesterMcs: {
    [semester: string]: number;
  };
  semesterGradePoint: {
    [semester: string]: number;
  };
}

// uses same actions ADD/REMOVE_MOD actions as savedModules
const capCalculatorReducer = (
  state: ICapCalcState = defaultCapCalcState,
  action: any
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MOD: {
      // assert no duplicate modules since front end already blocks
      const { semNum, module } = payload;
      let newSemesterMcs;
      if (state.semesterMcs && state.semesterMcs[semNum]) {
        newSemesterMcs =
          state.semesterMcs[semNum] + parseInt(module.ModuleCredit!, 10);
      } else {
        newSemesterMcs = parseInt(module.ModuleCredit!, 10);
      }
      return {
        ...state,
        totalMcs: state.totalMcs + parseInt(module.ModuleCredit!, 10),
        semesterMcs: {
          ...state.semesterMcs,
          [semNum]: newSemesterMcs,
        },
      };
    }
    case REMOVE_MOD: {
      const { semNum, module } = payload;
      // since it is remove mod, must have current semesterMcs
      const newSemesterMcs =
        state.semesterMcs[semNum] - parseInt(module.ModuleCredit!, 10);
      const newSemesterGradePoint = module.gradePoint
        ? state.semesterGradePoint[semNum] - module.gradePoint
        : state.semesterGradePoint[semNum];
      const newTotalGradePoint = module.gradePoint
        ? state.totalGradePoint - module.gradePoint
        : state.totalGradePoint;
      return {
        ...state,
        totalMcs: state.totalMcs - parseInt(module.ModuleCredit!, 10),
        semesterMcs: {
          ...state.semesterMcs,
          [semNum]: newSemesterMcs,
        },
        semesterGradePoint: {
          [semNum]: newSemesterGradePoint,
        },
        totalGradePoint: newTotalGradePoint,
      };
    }
    case SET_GRADE: {
      const { semester, mc, grade, prevGrade = "" } = payload;
      const prevGradePoint = GRADE_DICT[prevGrade] * parseInt(mc, 10);
      const newGradePoint = GRADE_DICT[grade] * parseInt(mc, 10);
      let newSemesterGradePoint;
      if (state.semesterGradePoint && state.semesterGradePoint[semester]) {
        newSemesterGradePoint =
          state.semesterGradePoint[semester] - prevGradePoint + newGradePoint;
      } else {
        newSemesterGradePoint = newGradePoint;
      }

      const newTotalGradePoint =
        state.totalGradePoint - prevGradePoint + newGradePoint;
      return {
        ...state,
        semesterGradePoint: {
          [semester]: newSemesterGradePoint,
        },
        totalGradePoint: newTotalGradePoint,
      };
    }
    default:
      return state;
  }
};

export default capCalculatorReducer;
