import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { removeModule } from 'src/actions';
import { ISavedModule } from 'src/reducers/savedModules';

interface IModuleProp {
  moduleData: ISavedModule;
  onRemoveModule: any;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRemoveModule: (module: ISavedModule) => {
    dispatch(removeModule(module));
  }
});

class Module extends React.Component<IModuleProp> {
  public render() {
    const { moduleData } = this.props;
    return (
    <div onClick={this.handleClick(moduleData)} className="module-details">
      <span className="module-code">{moduleData.ModuleCode}</span>
      <span className="module-title">{moduleData.ModuleTitle}</span>
      <span className="module-mc">{moduleData.ModuleCredit}</span>
    </div>
    )
  }

  private handleClick = (module: ISavedModule) => (event: React.MouseEvent<HTMLElement>) => {
    const { onRemoveModule } = this.props
    onRemoveModule(module);
  }
}

export default connect(null, mapDispatchToProps)(Module);
