import * as React from "react";
import { connect } from "react-redux";

interface IGradeSelectorState {
  currentValue: string;
}

interface IGradeSelectorProps {
  currSem: string;
  moduleCode: string;
  onSetGrade: (newGrade: string) => void;
}

class GradeSelector extends React.Component<
  IGradeSelectorProps,
  IGradeSelectorState
> {
  constructor(props: IGradeSelectorProps) {
    super(props);

    this.state = {
      currentValue: "",
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
    const newValue = event.target.value;
    this.setState({
      currentValue: newValue,
    });

    this.props.onSetGrade(newValue);
  };
}

const mapDispatchToProps = () => ({
  onSetGrade: (newGrade: string) =>
    console.log(`setting mock grade: ${newGrade}`),
});

export default connect(
  null,
  mapDispatchToProps
)(GradeSelector);
