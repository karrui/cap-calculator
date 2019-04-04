import * as React from "react";
// import * as qs from "query-string";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
import CapHeader from "./components/CapHeader";
import Footer from "./components/Footer";
import Export from "./components/Export";
import { RouteComponentProps } from "react-router";
import ImportTable from "./components/ImportTable";

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

interface IAppState {
  isImport: boolean;
  encodedImports: string;
}

class App extends React.Component<RouteComponentProps, IAppState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      isImport: false,
      encodedImports: "",
    };
  }

  componentDidMount() {
    this.setState({
      isImport: this.props.location.pathname === "/import",
      encodedImports: this.props.location.search,
    });
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        isImport: this.props.location.pathname === "/import",
        encodedImports: this.props.location.search,
      });
    }
  }

  render() {
    const { isImport, encodedImports } = this.state;
    return (
      <div className="App">
        <CapHeader isImport={isImport} />
        <div className="app-body container">
          {isImport ? (
            <ImportTable encodedImports={encodedImports.slice(1)} />
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
