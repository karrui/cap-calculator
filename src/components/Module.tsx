import * as React from 'react';
import { ISavedModule } from 'src/reducers/savedModules';

interface IModuleProp {
  moduleData: ISavedModule;
}

class Module extends React.Component<IModuleProp> {
  public render() {
    const { moduleData } = this.props;
    console.log(module)
    return (
    <div className="module-details">
      <span className="module-code">{moduleData.ModuleCode}</span>
      <span className="module-title">{moduleData.ModuleTitle}</span>
      <span className="module-mc">{moduleData.ModuleCredit}</span>
    </div>
    )
  }
}

export default Module;
