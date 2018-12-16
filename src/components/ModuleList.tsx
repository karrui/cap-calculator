import * as React from 'react';
import './ModuleList.css';

import { IModule } from 'src/App';
import Module from './Module';

interface IModuleListProps {
  modules: IModule[] | null,
}

class ModuleList extends React.Component<IModuleListProps, {}> {
  public render() {
    const { modules } = this.props;
    return (
      <div className="module-list">
        Hello

        {modules && modules.map(module => <Module key={module.ModuleCode} data={module} />)}
      </div>
    )
  }
}

export default ModuleList;
