import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { addSemester, removeSemester } from "src/actions/misc";
import { ICapCalcState } from "src/reducers/capCalculator";

interface ICapHeaderProps {
  totalMcs: number;
  totalGradePoint: number;
  fullSemesterMcs: ICapCalcState["semesterMcs"];
  fullSemesterGradePoint: ICapCalcState["semesterGradePoint"];
  currSem: string;

  onAddSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const mapStateToProps = (state: RootState) => ({
  currSem: state.misc.currSemester,
  totalMcs: state.capCalculator.totalMcs,
  totalGradePoint: state.capCalculator.totalGradePoint,
  fullSemesterMcs: state.capCalculator.semesterMcs,
  fullSemesterGradePoint: state.capCalculator.semesterGradePoint,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddSemester: () => dispatch(addSemester()),
  onRemoveSemester: () => dispatch(removeSemester()),
});

const CapHeader: React.FunctionComponent<ICapHeaderProps> = ({
  fullSemesterGradePoint,
  fullSemesterMcs,
  totalGradePoint,
  totalMcs,
  onAddSemester,
  onRemoveSemester,
  currSem,
}) => {
  return (
    <div className="cap-header">
      <div className="total-cap">
        CAP: {totalGradePoint ? totalGradePoint / totalMcs : "--"}
      </div>
      {fullSemesterGradePoint[currSem] && fullSemesterMcs[currSem] ? (
        <div className="sem-cap">
          Semester CAP:{" "}
          {fullSemesterGradePoint[currSem] / fullSemesterMcs[currSem]}
        </div>
      ) : null}

      <button onClick={onAddSemester}>Add Semester</button>
      <button onClick={onRemoveSemester}>Remove Semester</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CapHeader);
