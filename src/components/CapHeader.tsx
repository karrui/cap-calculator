import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addSemester, removeSemester } from "src/actions/misc";

import "../style/CapHeader.css";
import Search from "./Search";
import { EmptyAction, PayloadAction } from "typesafe-actions/dist/types";
import SemesterSelector from "./SemesterSelector";

interface ICapHeaderProps extends ICapHeaderStateProps, ICapHeaderOwnProps {
  onAddSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ICapHeaderOwnProps {
  isImport: boolean;
  importedTotalGradePoint?: number;
  importedTotalMcs?: number;
}

interface ICapHeaderStateProps {
  numSemesters: number;
  totalMcs: number;
  totalGradePoint: number;
}

interface ICapHeaderDispatchProps {
  onAddSemester: () => EmptyAction<"ADD_SEMESTER">;
  onRemoveSemester: (
    semester: number
  ) => PayloadAction<"REMOVE_SEMESTER", number>;
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
  stateProps: ICapHeaderStateProps,
  dispatchProps: ICapHeaderDispatchProps,
  ownProps: ICapHeaderOwnProps
) => {
  const { numSemesters } = stateProps;
  const { onAddSemester } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    onAddSemester,
    handleRemoveSemester: () => {
      dispatchProps.onRemoveSemester(numSemesters);
    },
  };
};

const CapHeader: React.FunctionComponent<ICapHeaderProps> = props => {
  const { isImport, ...other } = props;

  return (
    <header className="App-header">
      {isImport ? <ImportHeader /> : <DefaultHeader {...other} />}
    </header>
  );
};

const ImportHeader: React.FunctionComponent<Partial<ICapHeaderProps>> = () => {
  return (
    <React.Fragment>
      <nav className="nav container">
        <span className="logo" />
      </nav>
      <div className="import-banner container">
        <div className="alert alert-success">
          <div className="row">
            <div className="col">
              <h3 className="banner-title">
                These shared modules are pending import.
              </h3>
              <p>
                Clicking import will <strong>replace</strong> your saved modules
                with the ones below.
              </p>
            </div>
            <div className="col-md-auto">
              <button className="btn btn-success" type="button">
                Import
              </button>
              <button className="btn btn-outline-primary" type="button">
                Back to saved modules
              </button>
            </div>
          </div>
        </div>
      </div>
      <SemesterSelector />
    </React.Fragment>
  );
};

const DefaultHeader: React.FunctionComponent<Partial<ICapHeaderProps>> = ({
  totalGradePoint,
  totalMcs,
  onAddSemester,
  handleRemoveSemester,
}) => {
  return (
    <React.Fragment>
      <nav className="nav container">
        <span className="logo" />
        {totalGradePoint ? (
          <div className="total-cap">
            CAP: {(totalGradePoint / totalMcs!).toFixed(2)}
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
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CapHeader);
