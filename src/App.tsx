import * as React from "react";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
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
      <CapHeader />
      <div className="app-body container">
        <SavedTable />
      </div>
      <Footer />
    </div>
  );
};

export default App;
