import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addSemester, removeSemester } from "src/actions/misc";

import "../style/CapHeader.css";
interface ICapHeaderProps {
  totalMcs: number;
  totalGradePoint: number;

  onAddSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const mapStateToProps = (state: RootState) => ({
  numSemesters: state.misc.numSemesters,
  totalMcs: state.capCalculator.totalMcs,
  totalGradePoint: state.capCalculator.totalGradePoint,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddSemester: () => dispatch(addSemester()),
  onRemoveSemester: (semester: number) => dispatch(removeSemester(semester)),
});

const mergeProps = (
  { numSemesters, totalMcs, totalGradePoint }: any,
  { onAddSemester, onRemoveSemester }: any
) => ({
  totalMcs,
  totalGradePoint,
  onAddSemester,
  handleRemoveSemester: () => {
    onRemoveSemester(numSemesters);
  },
});

const CapHeader: React.FunctionComponent<ICapHeaderProps> = ({
  totalGradePoint,
  totalMcs,
  onAddSemester,
  handleRemoveSemester,
}) => {
  return (
    <div className="cap-header">
      {totalGradePoint ? (
        <div className="total-cap">
          Total CAP: {(totalGradePoint / totalMcs).toFixed(2)}
        </div>
      ) : null}
      <button onClick={onAddSemester}>Add Semester</button>
      <button onClick={handleRemoveSemester}>Remove LATEST Semester</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CapHeader);
