import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { removeModule } from "../actions";
import { ISavedModule } from "../reducers/savedModules";

interface IModuleProp {
  moduleData: ISavedModule;
  semNum: string;
  onRemoveModule: any;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRemoveModule: (module: ISavedModule, semNum: string) => {
    dispatch(removeModule(module, semNum));
  },
});

class Module extends React.Component<IModuleProp> {
  public render() {
    const { moduleData } = this.props;

    return (
      <div className="module-details" onClick={this.handleClick(moduleData)}>
        <div className="module-name">
          <span className="module-code">{moduleData.ModuleCode} </span>
          <span className="module-title">{moduleData.ModuleTitle}</span>
        </div>
        <span className="module-mc">{moduleData.ModuleCredit} MCs</span>
      </div>
    );
  }

  private handleClick = (module: ISavedModule) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    const { onRemoveModule, semNum } = this.props;
    onRemoveModule(module, semNum);
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Module);
