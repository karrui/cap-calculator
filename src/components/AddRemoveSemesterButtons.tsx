import * as React from "react";
import { Dispatch, Action } from "redux";
import { actions as UndoActionCreators } from "redux-undo-redo";

import { addSemester, removeSemester } from "src/actions/misc";
import { PayloadAction } from "typesafe-actions/dist/types";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";

interface IARSemButtonsStateProps {
  numSemesters: number;
}

interface IARSemButtonsDispatchProps {
  onAddSemester: () => void;
  onRemoveSemester: (
    semester: number
  ) => PayloadAction<"REMOVE_SEMESTER", number>;
  onClear: () => Action<any>;
}

interface IARSemButtonsProps
  extends IARSemButtonsStateProps,
    IARSemButtonsDispatchProps {
  handleAddButtonClicked: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const mapStateToProps = (state: RootState) => ({
  numSemesters: state.misc.numSemesters,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddSemester: () => dispatch(addSemester()),
  onRemoveSemester: (semester: number) => dispatch(removeSemester(semester)),
  onClear: () => dispatch(UndoActionCreators.clear()),
});

const mergeProps = (
  stateProps: IARSemButtonsStateProps,
  dispatchProps: IARSemButtonsDispatchProps,
  ownProps: any
) => ({
  ...stateProps,
  ...ownProps,
  onRemoveSemester: dispatchProps.onRemoveSemester,
  handleAddButtonClicked: () => {
    dispatchProps.onClear();
    dispatchProps.onAddSemester();
  },
});

const AddRemoveSemesterButtons: React.FunctionComponent<IARSemButtonsProps> = ({
  handleAddButtonClicked,
  onRemoveSemester,
  numSemesters,
}) => {
  return (
    <div className="sem-buttons-wrapper">
      <button
        type="button"
        className="btn btn-outline-primary sem-btn"
        onClick={handleAddButtonClicked}
      >
        add sem
      </button>

      <button
        type="button"
        className="btn btn-outline-primary sem-btn"
        onClick={() => onRemoveSemester(numSemesters)}
      >
        delete sem {numSemesters}
      </button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AddRemoveSemesterButtons);
