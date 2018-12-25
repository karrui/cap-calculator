import * as React from "react";
import { Dispatch } from "redux";
import { RootState } from "src/store/configureStore";
import { setCurrentSemester, IMiscAction } from "src/actions";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  currSemester: state.misc.currSemester,
  numSemesters: state.misc.numSemesters,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetSemester: (semester: string) => dispatch(setCurrentSemester(semester)),
});

const mergeProps = (
  state: { currSemester: string; numSemesters: number },
  { onSetSemester }: { onSetSemester: (semester: string) => IMiscAction }
) => ({
  ...state,
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSetSemester(event.target.value);
  },
});

interface ISemesterSelectorProps {
  currSemester: string;
  numSemesters: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

class SemesterSelector extends React.Component<ISemesterSelectorProps, {}> {
  public render() {
    const { handleChange, currSemester, numSemesters } = this.props;

    const options = [];

    for (let i = 1; i <= numSemesters; i = i + 1) {
      options.push(
        <option key={i} value={i}>
          Semester {i}
        </option>
      );
    }

    return (
      <select onChange={handleChange} value={currSemester}>
        {options}
      </select>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SemesterSelector);
