import * as React from "react";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
import Search from "./components/Search";
import CapHeader from "./components/CapHeader";

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

const App: React.FunctionComponent = () => {
  return (
    <div className="App container">
      <header className="App-header">
        <h1 className="App-title">CAP Calculator</h1>
        <CapHeader />
        <Search />
      </header>
      <SavedTable />
    </div>
  );
};

export default App;
