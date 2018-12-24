import * as React from "react";
import { connect } from "react-redux";
import { IGradeObject, setGrade } from "src/actions/savedModules";
import { RootState } from "src/store/configureStore";
import { Dispatch } from "redux";
import { ISavedModule } from "src/reducers/savedModules";

interface IGradeSelectorState {
  currentValue: string;
}

interface IGradeSelectorProps {
  currSem: string;
  module: ISavedModule;
  currentValue: string;
  onSetGrade: (gradeObj: IGradeObject) => void;
}

class GradeSelector extends React.Component<
  IGradeSelectorProps,
  IGradeSelectorState
> {
  constructor(props: IGradeSelectorProps) {
    super(props);

    this.state = {
      currentValue: this.props.currentValue,
    };
  }

  public render() {
    const { currentValue } = this.state;
    return (
      <select onChange={this.handleChange} value={currentValue}>
        <option value="" />
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="F">F</option>
        <option disabled>_________</option>
        <option value="S">S</option>
        <option value="U">U</option>
      </select>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { onSetGrade, currSem, module } = this.props;
    const prevValue = this.state.currentValue;
    const newValue = event.target.value;
    this.setState({
      currentValue: newValue,
    });

    onSetGrade({
      module,
      semester: currSem,
      grade: newValue,
      prevGrade: prevValue,
    });
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetGrade: (gradeObj: IGradeObject) => dispatch(setGrade(gradeObj)),
});

const mapStateToProps = (
  state: RootState,
  ownProps: { module: ISavedModule }
) => {
  const currSem = state.misc.currSemester;
  return {
    currSem,
    currentValue: ownProps.module.grade!,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GradeSelector);
