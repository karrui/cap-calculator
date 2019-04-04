import * as React from "react";
// import * as qs from "query-string";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
import CapHeader from "./components/CapHeader";
import Footer from "./components/Footer";
import Export from "./components/Export";
import { RouteComponentProps } from "react-router";

// follows NUSMod's API
export interface IModule {
  ModuleCode?: string;
  ModuleTitle?: string;
  ModuleCredit?: string;
  ModuleLink?: string;
}

interface IAppState {
  isImport: boolean;
}

class App extends React.Component<RouteComponentProps, IAppState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      isImport: false,
    };
  }

  componentDidMount() {
    this.setState({
      isImport: this.props.location.pathname === "/import",
    });
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        isImport: this.props.location.pathname === "/import",
      });
    }
  }

  render() {
    return (
      <div className="App">
        <CapHeader isImport={this.state.isImport} />
        <div className="app-body container">
          <SavedTable />
        </div>
        <Export />
        <Footer />
      </div>
    );
  }
}

export default App;
