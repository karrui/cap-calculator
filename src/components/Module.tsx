import * as React from 'react';
import { IModule } from 'src/App';

interface IModuleProp {
  data: IModule;
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
