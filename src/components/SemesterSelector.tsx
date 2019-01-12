import * as React from "react";
import { Dispatch } from "redux";
import { RootState } from "src/store/configureStore";
import { setCurrentSemester, IMiscAction } from "src/actions";
import { connect } from "react-redux";

import ArrowLeftSvg from "../svgs/ArrowLeftSvg";
import ArrowRightSvg from "../svgs/ArrowRightSvg";

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
  handleNextSem: () => {
    const { currSemester, numSemesters } = state;
    if (parseInt(currSemester, 10) < numSemesters) {
      onSetSemester((parseInt(currSemester, 10) + 1).toString());
    }
  },
  handlePrevSem: () => {
    const { currSemester, numSemesters } = state;
    if (parseInt(currSemester, 10) > 1) {
      onSetSemester((parseInt(currSemester, 10) - 1).toString());
    }
  },
});

interface ISemesterSelectorProps {
  currSemester: string;
  numSemesters: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleNextSem: () => void;
  handlePrevSem: () => void;
}

class SemesterSelector extends React.Component<ISemesterSelectorProps, {}> {
  public render() {
    const {
      handleChange,
      currSemester,
      numSemesters,
      handleNextSem,
      handlePrevSem,
    } = this.props;

    const options = [];

    for (let i = 1; i <= numSemesters; i = i + 1) {
      options.push(
        <option key={i} value={i}>
          Semester {i}
        </option>
      );
    }

    const arrowLeftDisabled = parseInt(currSemester, 10) <= 1;
    const arrowRightDisabled = parseInt(currSemester, 10) >= numSemesters;

    return (
      <div className="semester-selector">
        <ArrowLeftSvg
          handleClick={arrowLeftDisabled ? undefined : handlePrevSem}
          disabled={arrowLeftDisabled}
        />
        <select onChange={handleChange} value={currSemester}>
          {options}
        </select>
        <ArrowRightSvg
          handleClick={arrowRightDisabled ? undefined : handleNextSem}
          disabled={arrowRightDisabled}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(SemesterSelector);
