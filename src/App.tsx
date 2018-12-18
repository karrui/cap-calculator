import * as React from 'react';
import { connect } from 'react-redux';

import './style/App.css';

import ModuleList from './components/ModuleList';
import SavedTable from './components/SavedTable';
import Search from './components/Search';
import { ISavedModuleState } from './reducers/savedModules';
import { RootState } from './store/configureStore';

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

const mapStateToProps = (state: RootState) => ({
  savedModules: state.savedModules,
});

interface IAppProps {
  savedModules: ISavedModuleState;
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    const { savedModules } = this.props;
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="App-title">CAP Calculator</h1>
        </header>
        <SavedTable />
        <Search />
        {savedModules &&
          Object.keys(savedModules).map(sem =>
            <ModuleList key={sem} semNum={sem} semesterSavedModules={savedModules[sem]} />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
