import * as React from "react";
import * as ReactDOM from "react-dom";
import scrollIntoViewIfNeeded from "scroll-into-view-if-needed";
import { connect } from "react-redux";
import { actions as UndoActionCreators } from "redux-undo-redo";

import { RootState } from "../store/configureStore";
import { ISavedModuleState, ISavedModule } from "src/reducers/savedModules";
import Module from "./Module";
import { ICapCalcState } from "src/reducers/capCalculator";

import "../style/SavedTable.css";
import { Dispatch } from "redux";
import { setCurrentSemester } from "src/actions";
import { REMOVE_SEMESTER } from "src/reducers/constants";

export const SavedTableHeader: React.FunctionComponent = () => (
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
  canUndo:
    state.undoHistory.undoQueue.length > 0 &&
    state.undoHistory.undoQueue[0].action.type === REMOVE_SEMESTER,
  deletedSemNum:
    state.undoHistory.undoQueue.length > 0
      ? state.undoHistory.undoQueue[0].action.payload
      : -1,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetSemester: (semester: string) => dispatch(setCurrentSemester(semester)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onClear: () => dispatch(UndoActionCreators.clear()),
});

interface ISavedTableProps {
  savedModules: ISavedModuleState;
  numSemesters: number;
  currSemester: string;
  semesterGradePoint: ICapCalcState["semesterGradePoint"];
  semesterMcs: ICapCalcState["semesterMcs"];
  canUndo: boolean;
  deletedSemNum: number;
  onSetSemester: (semNum: string) => void;
  onUndo: () => void;
  onClear: () => void;
}

class SavedTable extends React.Component<ISavedTableProps, {}> {
  constructor(props: ISavedTableProps) {
    super(props);
  }

  private handleClick(semNum: number) {
    if (this.props.currSemester !== semNum.toString()) {
      this.props.onSetSemester(semNum.toString());
    }
  }

  public render() {
    const {
      savedModules,
      numSemesters,
      semesterGradePoint,
      semesterMcs,
      currSemester,
      canUndo,
      onUndo,
      onClear,
      deletedSemNum,
    } = this.props;

    const savedSemesterModules: JSX.Element[] = [];
    if (canUndo) {
      savedSemesterModules.push(
        <div key={`sem ${deletedSemNum}`} className="undo-table-wrapper">
          <div className="undo-details">
            <span>{`Semester ${deletedSemNum} deleted`}</span>
            <div className="undo-actions">
              <button
                type="button"
                className="btn btn-sm btn-link"
                onClick={onClear}
              >
                Dismiss
              </button>
              <button
                type="button"
                className="btn btn-sm btn-link"
                onClick={onUndo}
              >
                Undo
              </button>
            </div>
          </div>
        </div>
      );
    }
    for (let i = numSemesters; i > 0; i = i - 1) {
      const isCurrSem = i.toString() === currSemester;
      savedSemesterModules.push(
        <div
          className="saved-table-wrapper"
          key={i}
          ref={isCurrSem ? "currSemRef" : ""}
        >
          <div
            className={`saved-table ${isCurrSem ? "curr-sem" : ""}`}
            onClick={() => this.handleClick(i)}
          >
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
            <div className="sem-table-wrapper">
              {savedModules[i] && Object.keys(savedModules[i]).length
                ? this.showSemesterModules(savedModules[i], i)
                : this.showEmptyTable(i)}
            </div>
          </div>
        </div>
      );
    }

    return <div className="saved-tables">{savedSemesterModules}</div>;
  }

  showSemesterModules(
    semesterModules: { [ModuleCode: string]: ISavedModule },
    semester: number
  ) {
    return Object.keys(semesterModules).map((moduleCode, index) => (
      <Module
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
        scrollIntoViewIfNeeded(domNode, {
          scrollMode: "if-needed",
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedTable);
