import * as React from "react";

import Module from "./Module";
import "./ModuleList.css";

import { ISavedModule } from "src/reducers/savedModules";

interface IModuleListProps {
  semesterSavedModules: {
    [moduleCode: string]: ISavedModule;
  };
  semNum: string;
}

interface IModuleListState {
  totalMc: number;
  currentCap: number;
}

class ModuleList extends React.Component<IModuleListProps, IModuleListState> {
  constructor(props: IModuleListProps) {
    super(props);

    this.state = {
      currentCap: 0,
      totalMc: 0,
    };
  }

  public render() {
    const { semesterSavedModules, semNum } = this.props;
    return (
      <div className="module-list">
        Total MCs so far: {this.state.totalMc}
        {semesterSavedModules &&
          Object.keys(semesterSavedModules).map(key => (
            <Module
              key={key}
              semNum={semNum}
              moduleData={semesterSavedModules[key]}
            />
          ))}
      </div>
    );
  }
}

export default ModuleList;
