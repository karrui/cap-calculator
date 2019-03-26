import * as React from "react";
import { connect } from "react-redux";

import { RootState } from "../store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import Module from "./Module";
import { ICapCalcState } from "src/reducers/capCalculator";

import "../style/SavedTable.css";

const SavedTableHeader: React.FunctionComponent = () => (
  <div className="row no-gutters sem-row-header">
    <div className="col-6">Module Name</div>
    <div className="col-2">MCs</div>
    <div className="col-2">Grade</div>
    <div className="col-2">Delete</div>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  numSemesters: state.misc.numSemesters,
  savedModules: state.savedModules,
  semesterGradePoint: state.capCalculator.semesterGradePoint,
  semesterMcs: state.capCalculator.semesterMcs,
});

interface ISavedTableProps {
  savedModules: ISavedModuleState;
  numSemesters: number;
  semesterGradePoint: ICapCalcState["semesterGradePoint"];
  semesterMcs: ICapCalcState["semesterMcs"];
}

const SavedTable: React.FunctionComponent<ISavedTableProps> = ({
  savedModules,
  numSemesters,
  semesterGradePoint,
  semesterMcs,
}) => {
  const savedSemesterModules = [];
  for (let i = numSemesters; i > 0; i = i - 1) {
    savedSemesterModules.push(
      <div className="sem-table" key={i}>
        <div className="sem-header-details">
          <div className="sem-info">
            <div>Semester {i}</div>
            <div className="sem-cap">
              {semesterMcs[i]
                ? `Semester CAP: ${(
                    semesterGradePoint[i] / semesterMcs[i]
                  ).toFixed(2)}`
                : ""}
            </div>
          </div>
          <SavedTableHeader />
        </div>
        <div className="sem-table-wrapper">
          {savedModules[i] &&
            Object.keys(savedModules[i]).map(moduleCode => (
              <Module
                key={moduleCode}
                semester={i}
                module={savedModules[i][moduleCode]}
              />
            ))}
        </div>
      </div>
    );
  }

  return <div className="saved-tables">{savedSemesterModules}</div>;
};

export default connect(mapStateToProps)(SavedTable);
