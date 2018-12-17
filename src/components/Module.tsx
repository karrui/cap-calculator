import * as React from 'react';
import { ISavedModule } from 'src/reducers/savedModules';

interface IModuleProp {
  data: ISavedModule;
}

class Module extends React.Component<IModuleProp> {
  public render() {
    return (
    <div className="module">
      Module
    </div>
    )
  }
}

export default Module;
