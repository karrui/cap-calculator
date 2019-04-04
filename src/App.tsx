import * as React from "react";
// import * as qs from "query-string";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
import CapHeader from "./components/CapHeader";
import Footer from "./components/Footer";
import Export from "./components/Export";
import { RouteComponentProps } from "react-router";
import ImportTable from "./components/ImportTable";
import { ISavedModuleState } from "./reducers/savedModules";

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

export interface IImportedModulesState {
  savedModules: ISavedModuleState;
  numSemesters: number;
}

interface IAppState {
  isImport: boolean;
  importedModules: IImportedModulesState;
}

class App extends React.Component<RouteComponentProps, IAppState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      isImport: false,
      importedModules: { savedModules: {}, numSemesters: 0 },
    };
  }

  componentDidMount() {
    const encodedImports = this.props.location.search.slice(1);
    const isImport = this.props.location.pathname === "/import";

    if (isImport) {
      this.setState({
        isImport,
        importedModules: JSON.parse(decodeURIComponent(encodedImports)),
      });
    }
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        isImport: this.props.location.pathname === "/import",
      });
    }
  }

  render() {
    const { isImport, importedModules } = this.state;
    return (
      <div className="App">
        <CapHeader importedModules={importedModules} isImport={isImport} />
        <div className="app-body container">
          {isImport ? (
            <ImportTable importedModules={importedModules} />
          ) : (
            <SavedTable />
          )}
        </div>
        {!isImport && <Export />}
        <Footer />
      </div>
    );
  }
}

export default App;
