import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addSemester, removeSemester } from "src/actions/misc";

import "../style/CapHeader.css";
import Search from "./Search";

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
    <header className="App-header">
      <nav className="nav container">
        <span className="logo" />
        {totalGradePoint ? (
          <div className="total-cap">
            CAP: {(totalGradePoint / totalMcs).toFixed(2)}
          </div>
        ) : null}
      </nav>

      <div className="sem-buttons-wrapper">
        <button
          type="button"
          className="btn btn-outline-primary sem-btn"
          onClick={onAddSemester}
        >
          add semester
        </button>

        <button
          type="button"
          className="btn btn-outline-primary sem-btn"
          onClick={handleRemoveSemester}
        >
          delete latest semester
        </button>
      </div>
      <Search />
    </header>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CapHeader);
