import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";

import { RootState } from "../store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import Module from "./Module";
import { ICapCalcState } from "src/reducers/capCalculator";

import "../style/SavedTable.css";

const SavedTableHeader: React.FunctionComponent = () => (
  <div className="row no-gutters sem-row-header">
    <div className="col-6">Module Name</div>
    <div className="col-2">MCs</div>
    <div className="col-2">Grade</div>
    <div className="col-2">Delete</div>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  numSemesters: state.misc.numSemesters,
  currSemester: state.misc.currSemester,
  savedModules: state.savedModules,
  semesterGradePoint: state.capCalculator.semesterGradePoint,
  semesterMcs: state.capCalculator.semesterMcs,
});

interface ISavedTableProps {
  savedModules: ISavedModuleState;
  numSemesters: number;
  currSemester: string;
  semesterGradePoint: ICapCalcState["semesterGradePoint"];
  semesterMcs: ICapCalcState["semesterMcs"];
}

class SavedTable extends React.Component<ISavedTableProps, {}> {
  constructor(props: ISavedTableProps) {
    super(props);
  }

  public render() {
    const {
      savedModules,
      numSemesters,
      semesterGradePoint,
      semesterMcs,
      currSemester,
    } = this.props;

    const savedSemesterModules: JSX.Element[] = [];
    for (let i = numSemesters; i > 0; i = i - 1) {
      const isCurrSem = i.toString() === currSemester;
      savedSemesterModules.push(
        <div
          className="saved-table-wrapper"
          key={i}
          ref={isCurrSem ? "currSemRef" : ""}
        >
          <div className={`saved-table ${isCurrSem ? "curr-sem" : ""}`}>
            <div className="sem-header-details">
              <div className="sem-info">
                <div>Semester {i}</div>
                <div className="sem-cap">
                  {semesterMcs[i]
                    ? `SAP: ${(semesterGradePoint[i] / semesterMcs[i]).toFixed(
                        2
                      )}`
                    : ""}
                </div>
              </div>
              <SavedTableHeader />
            </div>
            <div className="sem-table-wrapper" />
            {savedModules[i] &&
              Object.keys(savedModules[i]).map(moduleCode => (
                <Module
                  key={moduleCode}
                  semester={i}
                  module={savedModules[i][moduleCode]}
                />
              ))}
          </div>
        </div>
      );
    }

    return <div className="saved-tables">{savedSemesterModules}</div>;
  }

  componentDidUpdate(prevProps: ISavedTableProps) {
    if (this.props.currSemester !== prevProps.currSemester) {
      this.scrollToSemester();
    }
  }

  private scrollToSemester() {
    const itemComponent = this.refs.currSemRef;
    if (itemComponent) {
      const domNode = ReactDOM.findDOMNode(itemComponent);
      if (domNode instanceof Element) {
        domNode.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }
}

// const SavedTable: React.FunctionComponent<ISavedTableProps> = ({
//   savedModules,
//   numSemesters,
//   semesterGradePoint,
//   semesterMcs,
// }) => {
//   const savedSemesterModules: JSX.Element[] = [];
//   for (let i = numSemesters; i > 0; i = i - 1) {
//     savedSemesterModules.push(
//       <div className="sem-table" key={i}>
//         <div className="sem-header-details">
//           <div className="sem-info">
//             <div>Semester {i}</div>
//             <div className="sem-cap">
//               {semesterMcs[i]
//                 ? `SAP: ${(semesterGradePoint[i] / semesterMcs[i]).toFixed(2)}`
//                 : ""}
//             </div>
//           </div>
//           <SavedTableHeader />
//         </div>
//         <div className="sem-table-wrapper">
//           {savedModules[i] &&
//             Object.keys(savedModules[i]).map(moduleCode => (
//               <Module
//                 key={moduleCode}
//                 semester={i}
//                 module={savedModules[i][moduleCode]}
//               />
//             ))}
//         </div>
//       </div>
//     );
//   }

//   return <div className="saved-tables">{savedSemesterModules}</div>;
// };

export default connect(mapStateToProps)(SavedTable);
