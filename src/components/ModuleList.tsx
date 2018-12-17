import * as React from 'react';
import { connect } from 'react-redux';

import Module from './Module';
import './ModuleList.css';

import { ISavedModule } from 'src/reducers/savedModules';
import { RootState } from 'src/store/configureStore';

interface IModuleListProps {
  savedModules: {
    [ModuleCode: string]: ISavedModule
  },
}

const mapStateToProps = (state: RootState) => ({
  savedModules: state.savedModules
});

class ModuleList extends React.Component<IModuleListProps, {}> {
  public render() {
    const { savedModules } = this.props;
    return (
      <div className="module-list">
        Hello

        {savedModules && Object.keys(savedModules).map(key => <Module key={key} data={savedModules[key]} />)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ModuleList);
