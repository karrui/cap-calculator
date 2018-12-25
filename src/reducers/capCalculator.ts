import { ISaveModuleAction, ISetGradeAction } from "src/actions";
import {
  ADD_MOD,
  REMOVE_MOD,
  SET_GRADE,
  GRADE_DICT,
  SET_SU,
  REMOVE_SEMESTER,
} from "./constants";

const defaultCapCalcState: ICapCalcState = {
  totalMcs: 0,
  totalGradePoint: 0,
  semesterMcs: {},
  semesterGradePoint: {},
};

export interface ICapCalcState {
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
        module.gradePoint && module.gradePoint !== 0
          ? state.semesterMcs[semNum] - parseInt(module.ModuleCredit!, 10)
          : state.semesterMcs[semNum];
      const newSemesterGradePoint = module.gradePoint
        ? state.semesterGradePoint[semNum] - module.gradePoint
        : state.semesterGradePoint[semNum];
      const newTotalGradePoint = module.gradePoint
        ? state.totalGradePoint - module.gradePoint
        : state.totalGradePoint;

      const newTotalMcs =
        module.gradePoint && module.gradePoint !== 0
          ? state.totalMcs - parseInt(module.ModuleCredit!, 10)
          : state.totalMcs;
      return {
        ...state,
        totalMcs: newTotalMcs,
        semesterMcs: {
          ...state.semesterMcs,
          [semNum]: newSemesterMcs,
        },
        semesterGradePoint: {
          ...state.semesterGradePoint,
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
      if (prevGrade === "" || prevGrade === "S" || prevGrade === "U") {
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
          ...state.semesterGradePoint,
          [semester]: newSemesterGradePoint,
        },
        semesterMcs: {
          ...state.semesterMcs,
          [semester]: newSemesterMcs,
        },
        totalGradePoint: newTotalGradePoint,
      };
    }
    case SET_SU: {
      const { semester, module, grade, prevGrade = "" } = payload;

      const currSemesterMcs =
        state.semesterMcs && state.semesterMcs[semester]
          ? state.semesterMcs[semester]
          : 0;

      // minus MCs
      const newTotalMcs = state.totalMcs - parseInt(module.ModuleCredit, 10);
      const newSemesterMcs =
        currSemesterMcs - parseInt(module.ModuleCredit, 10);

      return {
        ...state,
        totalMcs: newTotalMcs,
        semesterMcs: {
          [semester]: newSemesterMcs,
        },
      };
    }
    case REMOVE_SEMESTER: {
      const semesterToRemove = Object.keys(state.semesterMcs).length;
      let mcsToRemove = state.semesterMcs[semesterToRemove];
      let gradePointsToRemove = state.semesterGradePoint[semesterToRemove];

      if (!mcsToRemove) {
        mcsToRemove = 0;
      }

      if (!gradePointsToRemove) {
        gradePointsToRemove = 0;
      }

      const {
        [semesterToRemove]: removedValueGP,
        ...restGradePoint
      } = state.semesterGradePoint;
      const {
        [semesterToRemove]: removedValueMcs,
        ...restMcs
      } = state.semesterMcs;
      return {
        ...state,
        totalMcs: state.totalMcs - mcsToRemove,
        totalGradePoint: state.totalGradePoint - gradePointsToRemove,
        semesterGradePoint: restGradePoint,
        semesterMcs: restMcs,
      };
    }
    default:
      return state;
  }
};

export default capCalculatorReducer;
