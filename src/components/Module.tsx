import * as React from "react";
import { ISavedModule } from "src/reducers/savedModules";
import { Dispatch } from "redux";
import { removeModule } from "src/actions";
import { connect } from "react-redux";
import GradeSelector from "./GradeSelector";

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
    <tr>
      <td>
        {module.ModuleCode} {module.ModuleTitle}
      </td>
      <td>{module.ModuleCredit}</td>
      <td>
        <GradeSelector semester={semester.toString()} module={module} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleClick(module)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Module);
