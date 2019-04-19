import * as React from "react";
import { Dispatch } from "redux";
import { addSemester, removeSemester } from "src/actions/misc";
import { PayloadAction } from "typesafe-actions/dist/types";
import { RootState } from "src/store/configureStore";
import { connect } from "react-redux";

interface IARSemButtonsProps {
  numSemesters: number;
  onAddSemester: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveSemester: (
    semester: number
  ) => PayloadAction<"REMOVE_SEMESTER", number>;
}

const mapStateToProps = (state: RootState) => ({
  numSemesters: state.misc.numSemesters,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddSemester: () => dispatch(addSemester()),
  onRemoveSemester: (semester: number) => dispatch(removeSemester(semester)),
});

const AddRemoveSemesterButtons: React.FunctionComponent<IARSemButtonsProps> = ({
  onAddSemester,
  onRemoveSemester,
  numSemesters,
}) => {
  return (
    <div className="sem-buttons-wrapper">
      <button
        type="button"
        className="btn btn-outline-primary sem-btn"
        onClick={onAddSemester}
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
  mapDispatchToProps
)(AddRemoveSemesterButtons);
