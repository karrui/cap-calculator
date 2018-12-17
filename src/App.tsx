import * as React from 'react';
import './style/App.css';

import ModuleList from './components/ModuleList';
import Search from './components/Search';

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Search />
        <ModuleList />
      </div>
    );
  }
}

export default App;
