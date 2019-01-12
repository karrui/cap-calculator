import * as React from "react";
import { connect } from "react-redux";
import { IGradeObject, setGrade, setSU } from "src/actions/savedModules";
import { Dispatch } from "redux";
import { ISavedModule } from "src/reducers/savedModules";

interface IGradeSelectorState {
  currentValue: string;
}

interface IGradeSelectorProps {
  semester: string;
  module: ISavedModule;
  onSetGrade: (gradeObj: IGradeObject) => void;
  onSetSU: (gradeObj: IGradeObject) => void;
}

class GradeSelector extends React.Component<
  IGradeSelectorProps,
  IGradeSelectorState
> {
  constructor(props: IGradeSelectorProps) {
    super(props);

    this.state = {
      currentValue: this.props.module.grade!,
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
    const { onSetGrade, onSetSU, semester, module } = this.props;
    const prevValue = this.state.currentValue;
    const newValue = event.target.value;
    this.setState({
      currentValue: newValue,
    });

    const gradeObj = {
      module,
      semester,
      grade: newValue,
      prevGrade: prevValue,
    };

    onSetGrade(gradeObj);

    if (newValue === "S" || newValue === "U") {
      onSetSU(gradeObj);
    }
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetGrade: (gradeObj: IGradeObject) => dispatch(setGrade(gradeObj)),
  onSetSU: (gradeObj: IGradeObject) => dispatch(setSU(gradeObj)),
});

export default connect(
  null,
  mapDispatchToProps
)(GradeSelector);
