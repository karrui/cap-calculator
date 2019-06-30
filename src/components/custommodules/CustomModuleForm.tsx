import * as React from "react";
import { ISavedModule } from "src/reducers/savedModules";

import "src/style/CustomModuleForm.css";

interface ICustomModuleFormProps {
  initialModule: ISavedModule;
}

interface ICustomModuleFormState {
  moduleCodeValue: string;
  moduleTitleValue: string;
  moduleCreditValue: string;
  moduleGradeValue: string;
}

class CustomModuleForm extends React.Component<
  ICustomModuleFormProps,
  ICustomModuleFormState
> {
  constructor(props: ICustomModuleFormProps) {
    super(props);

    const { initialModule } = this.props;
    this.state = {
      moduleCodeValue: initialModule.ModuleCode || "",
      moduleTitleValue: initialModule.ModuleTitle || "",
      moduleCreditValue: initialModule.ModuleCredit || "",
      moduleGradeValue: initialModule.grade || "",
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ moduleTitleValue: event.target.value });
  }

  handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ moduleCodeValue: event.target.value });
  }

  handleCreditChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newCreditValue = Math.abs(Number(event.target.value));
    if (newCreditValue > 100) {
      newCreditValue = 100;
    }
    this.setState({
      moduleCreditValue: newCreditValue.toString(),
    });
  }

  handleGradeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ moduleGradeValue: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert(`A name was submitted: ${this.state.moduleTitleValue}`);
    event.preventDefault();
  }
  render() {
    return (
      <form
        className="custom-module-form container"
        onSubmit={this.handleSubmit}
      >
        <div className="row no-gutters">
          <label className="col-12 col-md-3">
            code
            <input
              className="custom-module-form-input"
              placeholder="CS1010"
              type="text"
              value={this.state.moduleCodeValue}
              onChange={this.handleCodeChange}
            />
          </label>
          <label className="col-12 col-md-9">
            name
            <input
              className="custom-module-form-input"
              placeholder="Programming Methodology"
              type="text"
              value={this.state.moduleTitleValue}
              onChange={this.handleTitleChange}
            />
          </label>
        </div>

        <label className="cm-form-label">
          credit
          <input
            type="number"
            min="0"
            max="100"
            placeholder="4"
            className="custom-module-form-input mc-input"
            value={this.state.moduleCreditValue}
            onChange={this.handleCreditChange}
          />
        </label>

        <label className="cm-form-label">
          grade
          <select
            className="custom-module-form-input grade-input"
            onChange={this.handleGradeChange}
            value={this.state.moduleGradeValue}
          >
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
        </label>
        <input
          className="btn btn-outline-primary cm-modal-done-btn"
          type="submit"
          value="Done"
        />
      </form>
    );
  }
}

export default CustomModuleForm;
