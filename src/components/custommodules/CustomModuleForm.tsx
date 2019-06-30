import * as React from "react";
import { ISavedModule } from "src/reducers/savedModules";

import "src/style/CustomModuleForm.css";
import { Dispatch } from "redux";
import {
  IGradeObject,
  setGrade,
  setSU,
  addModule,
} from "src/actions/savedModules";
import { RootState } from "src/store/configureStore";
import { IModule } from "src/App";
import { connect } from "react-redux";

interface ICustomModuleFormProps {
  initialModule: ISavedModule;
  onSubmitClose: () => void;

  currSemNum: string;
  onAddCustomModule: (module: IModule, semNum: string) => void;
  onSetGrade: (gradeObj: IGradeObject) => void;
  onSetSU: (gradeObj: IGradeObject) => void;
}

interface ICustomModuleFormState {
  moduleCodeValue: string;
  moduleNameValue: string;
  moduleCreditValue: string;
  moduleGradeValue: string;

  errors: {
    code: boolean;
    name: boolean;
    credit: boolean;
    // grade is optional
  };
}

const mapStateToProps = (state: RootState) => ({
  currSemNum: state.misc.currSemester,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddCustomModule: (module: IModule, semNum: string) => {
    dispatch(addModule(module, semNum));
  },
  onSetGrade: (gradeObj: IGradeObject) => dispatch(setGrade(gradeObj)),
  onSetSU: (gradeObj: IGradeObject) => dispatch(setSU(gradeObj)),
});

class CustomModuleForm extends React.Component<
  ICustomModuleFormProps,
  ICustomModuleFormState
> {
  constructor(props: ICustomModuleFormProps) {
    super(props);

    const { initialModule } = this.props;
    this.state = {
      moduleCodeValue: initialModule.ModuleCode || "",
      moduleNameValue: initialModule.ModuleTitle || "",
      moduleCreditValue: initialModule.ModuleCredit || "",
      moduleGradeValue: initialModule.grade || "",

      errors: {
        code: false,
        name: false,
        credit: false,
      },
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      moduleNameValue: event.target.value,
      errors: {
        ...this.state.errors,
        name: false,
      },
    });
  }

  handleCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      moduleCodeValue: event.target.value,
      errors: {
        ...this.state.errors,
        code: false,
      },
    });
  }

  handleCreditChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      this.setState({
        moduleCreditValue: "",
      });
      return;
    }
    let newCreditValue = Math.abs(Number(event.target.value));
    if (newCreditValue > 100) {
      newCreditValue = 100;
    }
    this.setState({
      moduleCreditValue: newCreditValue.toString(),
      errors: {
        ...this.state.errors,
        credit: false,
      },
    });
  }

  handleGradeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ moduleGradeValue: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const {
      moduleCodeValue,
      moduleCreditValue,
      moduleNameValue,
      moduleGradeValue,
    } = this.state;
    const {
      onAddCustomModule,
      currSemNum,
      onSetGrade,
      onSetSU,
      initialModule,
      onSubmitClose,
    } = this.props;
    if (
      moduleCodeValue === "" ||
      moduleCreditValue === "" ||
      moduleNameValue === ""
    ) {
      this.setState({
        errors: {
          name: moduleNameValue === "",
          code: moduleCodeValue === "",
          credit: moduleCreditValue === "",
        },
      });
      event.preventDefault();
      return;
    }

    // Create module object to save from form
    const customModuleObj: IModule = {
      ModuleCode: moduleCodeValue,
      ModuleCredit: moduleCreditValue,
      ModuleTitle: moduleNameValue,
    };

    onAddCustomModule(customModuleObj, currSemNum);

    if (moduleGradeValue !== "") {
      const customGradeObj: IGradeObject = {
        module: {
          ModuleCode: customModuleObj.ModuleCode!,
          ModuleCredit: customModuleObj.ModuleCredit!,
          ModuleTitle: customModuleObj.ModuleTitle!,
        },
        semester: currSemNum,
        grade: moduleGradeValue,
        prevGrade: initialModule.grade || "",
      };

      onSetGrade(customGradeObj);

      if (moduleGradeValue === "S" || moduleGradeValue === "U") {
        onSetSU(customGradeObj);
      }
    }
    event.preventDefault();
    onSubmitClose();
  }
  render() {
    const fieldsHaveError =
      this.state.errors.name ||
      this.state.errors.code ||
      this.state.errors.credit;
    return (
      <form
        className="custom-module-form container"
        onSubmit={this.handleSubmit}
      >
        <div className="row no-gutters">
          <label className="col-12 col-md-3">
            code
            <input
              className={`custom-module-form-input ${
                this.state.errors.code ? "error" : ""
              }`}
              placeholder="CS1010"
              type="text"
              value={this.state.moduleCodeValue}
              onChange={this.handleCodeChange}
            />
          </label>
          <label className="col-12 col-md-9">
            name
            <input
              className={`custom-module-form-input ${
                this.state.errors.name ? "error" : ""
              }`}
              placeholder="Programming Methodology"
              type="text"
              value={this.state.moduleNameValue}
              onChange={this.handleNameChange}
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
            className={`custom-module-form-input mc-input ${
              this.state.errors.credit ? "error" : ""
            }`}
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
        {fieldsHaveError && (
          <div className="error-msg">
            Oops! Some fields have not been filled.
          </div>
        )}
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomModuleForm);
