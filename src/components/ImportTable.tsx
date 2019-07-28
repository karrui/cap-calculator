import * as React from "react";
import { ISavedModuleState, ISavedModule } from "src/reducers/savedModules";
import Module from "./Module";
import { SavedTableHeader } from "./SavedTable";

interface IImportTableProps {
  importedModules: {
    savedModules: ISavedModuleState;
    numSemesters: number;
  };
}

class ImportTable extends React.Component<IImportTableProps, {}> {
  render() {
    const { numSemesters, savedModules } = this.props.importedModules;

    const importedSemesterModules: JSX.Element[] = [];

    for (let i = numSemesters; i > 0; i -= 1) {
      importedSemesterModules.push(
        <div className="saved-table-wrapper" key={i}>
          <div className="saved-table">
            <div className="sem-header-details">
              <div className="sem-info">
                <div>Semester {i}</div>
              </div>
            </div>
            <SavedTableHeader />
            <div className="sem-table-wrapper">
              {savedModules[i]
                ? this.showSemesterModules(savedModules[i], i)
                : this.showEmptyTable(i)}
            </div>
          </div>
        </div>
      );
    }

    if (importedSemesterModules.length > 0) {
      return <div className="saved-tables">{importedSemesterModules}</div>;
    }

    return <div className="table-empty">No modules to import.</div>;
  }

  showSemesterModules(
    semesterModules: { [ModuleCode: string]: ISavedModule },
    semester: number
  ) {
    return Object.keys(semesterModules).map((moduleCode, index) => (
      <Module
        isImported={true}
        key={moduleCode}
        semester={semester}
        module={semesterModules[moduleCode]}
        index={index}
      />
    ));
  }

  showEmptyTable(semester: number) {
    return (
      <div className="sem-empty">
        No modules added yet for Semester {semester}
      </div>
    );
  }
}

export default ImportTable;
