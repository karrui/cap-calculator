import * as React from "react";
import { ISavedModule } from "src/reducers/savedModules";
import { Dispatch } from "redux";
import { removeModule } from "src/actions";
import { connect } from "react-redux";
import GradeSelector from "./GradeSelector";
import TrashSvg from "src/svgs/TrashSvg";

import "../style/Module.css";

interface IModuleProp {
  module: ISavedModule;
  semester: number;
  onRemoveModule: (module: ISavedModule, semNum: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRemoveModule: (module: ISavedModule, semNum: string) => {
    dispatch(removeModule(module, semNum));
  },
});

const Module: React.FunctionComponent<IModuleProp> = ({
  module,
  onRemoveModule,
  semester,
}) => {
  const handleClick = (module: ISavedModule) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    onRemoveModule(module, semester.toString());
  };
  return (
    <div className="row no-gutters module-row">
      <div className="col-6 mod-title">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://nusmods.com/modules/${module.ModuleCode}`}
        >
          {module.ModuleCode} {module.ModuleTitle}
        </a>
      </div>
      <div className="col-2 mod-mc">{module.ModuleCredit} MCs</div>
      <div className="col-2 grade-selector-wrapper">
        <GradeSelector semester={semester.toString()} module={module} />
      </div>
      <div className="col-2">
        <button
          onClick={handleClick(module)}
          className="btn btn-outline-secondary btn-trash"
        >
          <TrashSvg />
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Module);
