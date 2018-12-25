import * as React from "react";
import { connect } from "react-redux";

import { RootState } from "../store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import Module from "./Module";
import { ICapCalcState } from "src/reducers/capCalculator";

const SavedTableHeader: React.FunctionComponent = () => (
  <thead>
    <tr>
      <th scope="col">Module Name</th>
      <th scope="col">MCs</th>
      <th scope="col">Grade</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
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
        Semester {i}
        <div className="sem-cap">
          Semester CAP:{" "}
          {semesterMcs[i] ? semesterGradePoint[i] / semesterMcs[i] : "--"}
        </div>
        <table className="table">
          <SavedTableHeader />
          <tbody>
            {savedModules[i] &&
              Object.keys(savedModules[i]).map(moduleCode => (
                <Module
                  key={moduleCode}
                  semester={i}
                  module={savedModules[i][moduleCode]}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div className="saved-tables">{savedSemesterModules}</div>;
};

export default connect(mapStateToProps)(SavedTable);
