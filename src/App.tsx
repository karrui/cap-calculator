import * as React from "react";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
import Search from "./components/Search";
import CapHeader from "./components/CapHeader";
import Footer from "./components/Footer";

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">CAP Calculator</h1>
        <CapHeader />
        <Search />
      </header>
      <div className="container">
        <SavedTable />
      </div>
      <Footer />
    </div>
  );
};

export default App;
