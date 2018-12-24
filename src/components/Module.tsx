import * as React from "react";
import { ISavedModule } from "src/reducers/savedModules";
import { Dispatch } from "redux";
import { removeModule } from "src/actions";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";
import GradeSelector from "./GradeSelector";

interface IModuleProp {
  module: ISavedModule;
  currSem: string;
  onRemoveModule: (module: ISavedModule, semNum: string) => void;
}

const mapStateToProps = (state: RootState) => ({
  currSem: state.misc.currSemester,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRemoveModule: (module: ISavedModule, semNum: string) => {
    dispatch(removeModule(module, semNum));
  },
});

const Module: React.FunctionComponent<IModuleProp> = ({
  module,
  onRemoveModule,
  currSem,
}) => {
  const handleClick = (module: ISavedModule) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    onRemoveModule(module, currSem);
  };
  return (
    <tr>
      <td>
        {module.ModuleCode} {module.ModuleTitle}
      </td>
      <td>{module.ModuleCredit}</td>
      <td>
        <GradeSelector moduleCode={module.ModuleCode} />
      </td>
      <td>
        <button onClick={handleClick(module)}>Delete</button>
      </td>
    </tr>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);
