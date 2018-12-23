import * as React from "react";
import { connect } from "react-redux";

import { RootState } from "../store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import Module from "./Module";

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
  savedModules: state.savedModules[state.misc.currSemester],
});

interface ISavedTableProps {
  savedModules: ISavedModuleState;
}

const SavedTable: React.FunctionComponent<ISavedTableProps> = ({
  savedModules,
}) => {
  return (
    <table className="table">
      <SavedTableHeader />
      <tbody>
        {Object.keys(savedModules).map(moduleCode => (
          <Module key={moduleCode} module={savedModules[moduleCode]} />
        ))}
      </tbody>
    </table>
  );
};

export default connect(mapStateToProps)(SavedTable);
