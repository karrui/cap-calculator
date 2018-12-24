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
      const { semester, module, grade, prevGrade = "" } = payload;
      const prevGradePoint =
        GRADE_DICT[prevGrade] * parseInt(module.ModuleCredit, 10);
      const newGradePoint =
        GRADE_DICT[grade] * parseInt(module.ModuleCredit, 10);
      let newSemesterGradePoint;
      if (state.semesterGradePoint && state.semesterGradePoint[semester]) {
        newSemesterGradePoint =
          state.semesterGradePoint[semester] - prevGradePoint + newGradePoint;
      } else {
        newSemesterGradePoint = newGradePoint;
      }

      let newSemesterMcs;
      let newTotalMcs;

      const currSemesterMcs =
        state.semesterMcs && state.semesterMcs[semester]
          ? state.semesterMcs[semester]
          : 0;
      if (prevGrade === "") {
        newTotalMcs = state.totalMcs + parseInt(module.ModuleCredit, 10);
        newSemesterMcs = currSemesterMcs + parseInt(module.ModuleCredit, 10);
      } else if (grade === "") {
        newTotalMcs = state.totalMcs - parseInt(module.ModuleCredit, 10);
        newSemesterMcs = currSemesterMcs - parseInt(module.ModuleCredit, 10);
      } else {
        newTotalMcs = state.totalMcs;
        newSemesterMcs = currSemesterMcs;
      }
      const newTotalGradePoint =
        state.totalGradePoint - prevGradePoint + newGradePoint;

      return {
        ...state,
        totalMcs: newTotalMcs,
        semesterGradePoint: {
          [semester]: newSemesterGradePoint,
        },
        semesterMcs: {
          [semester]: newSemesterMcs,
        },
        totalGradePoint: newTotalGradePoint,
      };
    }
    default:
      return state;
  }
};

export default capCalculatorReducer;
