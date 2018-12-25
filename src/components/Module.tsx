import * as React from "react";
import { ISavedModule } from "src/reducers/savedModules";
import { Dispatch } from "redux";
import { removeModule } from "src/actions";
import { RootState } from "src/store/configureStore";
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
        <GradeSelector module={module} />
      </td>
      <td>
        <button onClick={handleClick(module)}>Delete</button>
      </td>
    </tr>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Module);
