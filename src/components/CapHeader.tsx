import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { EmptyAction, PayloadAction } from "typesafe-actions/dist/types";
import { RouteComponentProps, withRouter } from "react-router-dom";

import "../style/CapHeader.css";

import { addSemester, removeSemester, setNumSemester } from "src/actions/misc";
import { setSavedModules } from "src/actions/savedModules";

import Search from "./Search";
import { IImportedModulesState } from "src/App";

interface ICapHeaderProps extends ICapHeaderStateProps, ICapHeaderOwnProps {
  onAddSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleImportModules: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onBackToSavedModules: () => void;
}

interface ICapHeaderOwnProps extends RouteComponentProps {
  isImport: boolean;
  importedModules: IImportedModulesState;
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
  onImportModules: (importedModules: IImportedModulesState) => void;
}

const mapStateToProps = (state: RootState) => ({
  numSemesters: state.misc.numSemesters,
  totalMcs: state.capCalculator.totalMcs,
  totalGradePoint: state.capCalculator.totalGradePoint,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddSemester: () => dispatch(addSemester()),
  onRemoveSemester: (semester: number) => dispatch(removeSemester(semester)),
  onImportModules: (importedModules: IImportedModulesState) => {
    dispatch(setSavedModules(importedModules.savedModules));
    dispatch(setNumSemester(importedModules.numSemesters));
  },
});

const mergeProps = (
  stateProps: ICapHeaderStateProps,
  dispatchProps: ICapHeaderDispatchProps,
  ownProps: ICapHeaderOwnProps
) => {
  const { numSemesters } = stateProps;
  const { history } = ownProps;
  const { onAddSemester, onRemoveSemester, onImportModules } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    onAddSemester,
    handleImportModules: () => {
      onImportModules(ownProps.importedModules);
      history.push("/");
    },
    handleRemoveSemester: () => {
      onRemoveSemester(numSemesters);
    },
    onBackToSavedModules: () => {
      history.push("/");
    },
  };
};

const CapHeader: React.FunctionComponent<ICapHeaderProps> = props => {
  const { isImport, history, handleImportModules, ...other } = props;
  return (
    <header className="App-header">
      {isImport ? (
        <ImportHeader
          handleImportModules={handleImportModules}
          history={history}
        />
      ) : (
        <DefaultHeader {...other} />
      )}
    </header>
  );
};

const ImportHeader: React.FunctionComponent<Partial<ICapHeaderProps>> = ({
  onBackToSavedModules,
  handleImportModules,
}) => {
  return (
    <React.Fragment>
      <nav className="nav container">
        <span className="logo" />
      </nav>
      <div className="import-banner container">
        <div className="alert alert-success">
          <div className="row">
            <div className="col banner-wrapper">
              <h3 className="banner-title">
                These shared modules are pending import.
              </h3>
              <p>
                Clicking import will <strong>replace</strong> your saved modules
                with the ones below.
              </p>
            </div>
            <div className="col-md-auto import-btns-wrapper">
              <button
                onClick={handleImportModules}
                className="btn btn-success"
                type="button"
              >
                Import
              </button>
              <button
                onClick={onBackToSavedModules}
                className="btn btn-outline-primary"
                type="button"
              >
                Back to saved modules
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(CapHeader)
);
