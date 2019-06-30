import * as React from "react";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import "src/style/CapHeader.css";

import { setNumSemester } from "src/actions/misc";
import {
  setSavedModules,
  setGrade,
  IGradeObject,
  setSU,
} from "src/actions/savedModules";

import Search from "./search/Search";
import { IImportedModulesState } from "src/App";
import { resetCapCalculator } from "src/actions/capCalculator";

interface ICapHeaderProps extends ICapHeaderStateProps, ICapHeaderOwnProps {
  handleImportModules: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleBackToSavedModules: () => void;
}

interface ICapHeaderOwnProps extends RouteComponentProps {
  isImport: boolean;
  isImportError: boolean;
  importedModules: IImportedModulesState;
}

interface ICapHeaderStateProps {
  totalMcs: number;
  totalGradePoint: number;
}

interface ICapHeaderDispatchProps {
  onImportModules: (importedModules: IImportedModulesState) => void;
}

const mapStateToProps = (state: RootState) => ({
  totalMcs: state.capCalculator.totalMcs,
  totalGradePoint: state.capCalculator.totalGradePoint,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onImportModules: (importedModules: IImportedModulesState) => {
    const { savedModules, numSemesters } = importedModules;

    // reset cap calc
    dispatch(resetCapCalculator());

    dispatch(setSavedModules(savedModules));
    dispatch(setNumSemester(numSemesters));

    // process cap calculation :O
    // pretty hacky, but you do not need to do it that often so should be fine
    Object.keys(savedModules).map((semNum: string) => {
      Object.keys(savedModules[semNum]).map((moduleCode: string) => {
        const module = savedModules[semNum][moduleCode];
        if (module.grade) {
          const gradeObj: IGradeObject = {
            module,
            semester: semNum,
            grade: module.grade,
            prevGrade: "",
          };
          dispatch(setGrade(gradeObj));

          if (module.grade === "S" || module.grade === "U") {
            dispatch(setSU(gradeObj));
          }
        }
      });
    });
  },
});

const mergeProps = (
  stateProps: ICapHeaderStateProps,
  dispatchProps: ICapHeaderDispatchProps,
  ownProps: ICapHeaderOwnProps
) => {
  const { history } = ownProps;
  const { onImportModules } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    handleImportModules: () => {
      onImportModules(ownProps.importedModules);
      history.push("/");
    },
    handleBackToSavedModules: () => {
      history.push("/");
    },
  };
};

const CapHeader: React.FunctionComponent<ICapHeaderProps> = props => {
  const {
    isImport,
    isImportError,
    handleBackToSavedModules,
    handleImportModules,
    ...other
  } = props;
  return (
    <header className="App-header">
      {isImport ? (
        isImportError ? (
          <ImportErrorHeader
            handleBackToSavedModules={handleBackToSavedModules}
          />
        ) : (
          <ImportHeader
            handleBackToSavedModules={handleBackToSavedModules}
            handleImportModules={handleImportModules}
          />
        )
      ) : (
        <DefaultHeader {...other} />
      )}
    </header>
  );
};

const ImportErrorHeader: React.FunctionComponent<Partial<ICapHeaderProps>> = ({
  handleBackToSavedModules,
}) => {
  return (
    <React.Fragment>
      <nav className="nav container">
        <span className="logo" />
      </nav>
      <div className="import-banner container">
        <div className="alert alert-danger">
          <div className="row">
            <div className="col banner-wrapper">
              <h3 className="banner-title">
                Error trying to import saved modules.
              </h3>
              <p>
                The given link seems to be invalid or expired. Check the link
                again!
              </p>
            </div>
            <div className="col-md-auto import-btns-wrapper">
              <button
                onClick={handleBackToSavedModules}
                className="btn btn-outline-primary"
                type="button"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const ImportHeader: React.FunctionComponent<Partial<ICapHeaderProps>> = ({
  handleBackToSavedModules,
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
                onClick={handleBackToSavedModules}
                className="btn btn-outline-primary"
                type="button"
              >
                Back
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
