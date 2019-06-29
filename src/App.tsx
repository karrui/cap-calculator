import * as React from "react";
import * as qs from "query-string";
import { find } from "lodash";
// tslint:disable-next-line: import-name
import ReactLoading from "react-loading";

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
import { GRADE_DICT, Theme } from "./reducers/constants";

import firestore, { FS_COLLECTION_LINKS } from "./data/firestore";
import AddRemoveSemesterButtons from "./components/AddRemoveSemesterButtons";
import Settings from "./components/Settings";
import CustomModuleModal from "./components/CustomModuleModal";

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
  isImportError: boolean;
  isLoading: boolean;
}

interface IAppProps extends RouteComponentProps {
  moduleBank: IModule[];
  theme: Theme;
}

const mapStateToProps = (state: RootState) => ({
  moduleBank: state.moduleBank,
  theme: state.misc.theme,
});

const defaultAppState: IAppState = {
  isImport: false,
  isImportError: false,
  isLoading: false,
  importedModules: { savedModules: {}, numSemesters: 0 },
};

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = defaultAppState;
  }

  componentDidMount() {
    const shortenedLink = this.props.location.search.slice(1);
    const isImport = this.props.location.pathname === "/import";

    this.setState({
      isImport,
    });

    if (isImport) {
      this.performImport(shortenedLink);
    }
  }

  componentDidUpdate(prevProps: RouteComponentProps) {
    if (this.props.location !== prevProps.location) {
      const shortenedLink = this.props.location.search.slice(1);
      const isImport = this.props.location.pathname === "/import";

      this.setState({
        isImport,
      });

      if (isImport) {
        this.performImport(shortenedLink);
      } else {
        this.setState(defaultAppState);
      }
    }
  }

  performImport(shortenedLink: string) {
    this.setState({
      isLoading: true,
    });
    firestore
      .collection(FS_COLLECTION_LINKS)
      .doc(shortenedLink)
      .get()
      .then(doc => {
        if (doc.exists) {
          const encodedImportString = doc.data()!.fullLink;
          const encodedImports = qs.parse(encodedImportString, {
            arrayFormat: "bracket",
          });
          this.setState({
            importedModules: this.deserializeImports(encodedImports),
            isImportError: false,
            isLoading: false,
          });
        } else {
          // doc.data() will be undefined in this case
          this.setState({
            isImportError: true,
            isLoading: false,
          });
        }
      });
  }

  deserializeImports(encodedImports: any) {
    const { numSemesters } = encodedImports;

    // rebuild saved modules from encoding
    const importedModules = {};
    for (let semNum = 1; semNum <= numSemesters; semNum += 1) {
      const semesterModules: [] = encodedImports[semNum];
      if (!semesterModules) continue;
      importedModules[semNum] = {};
      // encodedStr -> "CS1010, B+"
      semesterModules.map((encodedStr: string) => {
        const encodedSplitStr = encodedStr.split(",");
        // encodedSplitStr -> [moduleCode, grade]
        const moduleCode = encodedSplitStr[0];
        const retrievedModule = this.retrieveModule(moduleCode);

        if (!retrievedModule) {
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
    const { isImport, isImportError, isLoading, importedModules } = this.state;
    const { theme } = this.props;
    return (
      <div className={`App ${theme}`}>
        <CapHeader
          importedModules={importedModules}
          isImport={isImport}
          isImportError={isImportError}
        />
        <div className="app-body container">
          {!isImport && <AddRemoveSemesterButtons />}
          {isImport ? (
            isLoading ? (
              <ReactLoading
                className="loading-spinner"
                color="#ff5138"
                type="bubbles"
              />
            ) : (
              <ImportTable importedModules={importedModules} />
            )
          ) : (
            <SavedTable />
          )}
        </div>
        <div className="actions">
          {!isImport && <Export />}
          <Settings />
        </div>
        <CustomModuleModal />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
