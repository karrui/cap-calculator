import * as React from "react";
import * as qs from "query-string";
import { find } from "lodash";

import "./style/App.css";

import SavedTable from "./components/SavedTable";
import CapHeader from "./components/CapHeader";
import Footer from "./components/Footer";
import Export from "./components/Export";
import { RouteComponentProps } from "react-router";
import ImportTable from "./components/ImportTable";
import { ISavedModuleState } from "./reducers/savedModules";
import { RootState } from "./store/configureStore";
import { connect } from "react-redux";
import { GRADE_DICT } from "./reducers/constants";

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
  importError: boolean;
}

interface IAppProps extends RouteComponentProps {
  moduleBank: IModule[];
}

const mapStateToProps = (state: RootState) => ({
  moduleBank: state.moduleBank,
});

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isImport: false,
      importedModules: { savedModules: {}, numSemesters: 0 },
      importError: false,
    };
  }

  componentDidMount() {
    const encodedImportString = this.props.location.search.slice(1);
    const isImport = this.props.location.pathname === "/import";

    if (isImport) {
      const encodedImports = qs.parse(encodedImportString, {
        arrayFormat: "bracket",
      });
      this.setState({
        isImport,
        importedModules: this.deserializeImports(encodedImports),
      });
    }
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      const encodedImportString = this.props.location.search.slice(1);
      const isImport = this.props.location.pathname === "/import";

      if (isImport) {
        const encodedImports = qs.parse(encodedImportString, {
          arrayFormat: "bracket",
        });
        this.setState({
          isImport,
          importedModules: this.deserializeImports(encodedImports),
        });
      } else {
        this.setState({
          isImport,
        });
      }
    }
  }

  deserializeImports(encodedImports: any) {
    const { numSemesters } = encodedImports;

    // rebuild saved modules from encoding
    const importedModules = {};
    for (let semNum = 1; semNum <= numSemesters; semNum += 1) {
      importedModules[semNum] = {};
      const semesterModules: [] = encodedImports[semNum];
      if (!semesterModules) continue;
      // encodedStr -> "CS1010, B+"
      semesterModules.map((encodedStr: string) => {
        const encodedSplitStr = encodedStr.split(",");
        // encodedSplitStr -> [moduleCode, grade]
        const moduleCode = encodedSplitStr[0];
        const retrievedModule = this.retrieveModule(moduleCode);

        if (!retrievedModule) {
          this.setState({
            importError: true,
          });
          return;
        }

        const grade = encodedSplitStr[1];

        importedModules[semNum][moduleCode] = {
          grade,
          gradePoint:
            GRADE_DICT[grade] * parseInt(retrievedModule.ModuleCredit!, 10),
          ...retrievedModule,
        };
      });
    }

    return {
      numSemesters,
      savedModules: importedModules,
    };
  }

  retrieveModule(moduleCode: string) {
    return find(this.props.moduleBank, ["ModuleCode", moduleCode]);
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

export default connect(mapStateToProps)(App);
