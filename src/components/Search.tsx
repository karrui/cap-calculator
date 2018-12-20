import * as React from "react";
import * as _ from "lodash";
import reactOnclickoutside from "react-onclickoutside";
import { connect } from "react-redux";

import { addModule } from "../actions";
import { IModule } from "../App";
import { ISavedModuleState } from "../reducers/savedModules";
import { RootState } from "../store/configureStore";
import { asyncSetModuleBank } from "../actions/moduleBank";
import Suggestion from "./Suggestion";

import "../style/Search.css";

export interface IFilteredModule extends IModule {
  isDisabled?: boolean;
}

interface ISearchProps {
  currSemNum: string;
  moduleBank: IModule[];
  savedModules: ISavedModuleState;
  onSetModuleBank: () => void;
  onAddSavedModule: (module: IModule, semNum: string) => void;
}

interface ISearchState {
  userInput: string;
  filteredModules: IFilteredModule[];
  currentHighlighted: number;
  showSuggestion: boolean;
}

const mapStateToProps = (state: RootState) => ({
  currSemNum: state.misc.currSemester,
  moduleBank: state.moduleBank,
  savedModules: state.savedModules,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetModuleBank: () => {
    dispatch(asyncSetModuleBank());
  },

  onAddSavedModule: (module: IFilteredModule, semNum: string) => {
    dispatch(addModule(module, semNum));
  },
});

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      currentHighlighted: 0,
      filteredModules: [],
      showSuggestion: false,
      userInput: "",
    };
  }

  public handleClickOutside = (event: any) => this.resetState();

  public componentDidMount() {
    const { moduleBank, onSetModuleBank } = this.props;
    if (moduleBank.length === 0) {
      onSetModuleBank();
    }
  }

  public render() {
    const {
      showSuggestion,
      userInput,
      filteredModules,
      currentHighlighted,
    } = this.state;
    return (
      <div className="search-container">
        <input
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          value={userInput}
          placeholder="Add Module for CAP Calculation"
        />
        {showSuggestion && userInput && (
          <Suggestion
            filteredModules={filteredModules}
            currentHighlighted={currentHighlighted}
            handleClick={this.handleClick}
            handleHover={this.handleHover}
          />
        )}
      </div>
    );
  }

  private resetState = () => {
    this.setState({
      currentHighlighted: 0,
      filteredModules: [],
      showSuggestion: false,
      userInput: "",
    });
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { moduleBank, savedModules, currSemNum } = this.props;
    const userInput = event.currentTarget.value;
    let filteredModules: IFilteredModule[] = [];

    if (moduleBank && userInput.length >= 2) {
      // filter modules that doesn't fit input
      filteredModules = _.cloneDeep(
        _.filter(
          moduleBank,
          module =>
            module
              .ModuleCode!.toLowerCase()
              .startsWith(userInput.toLowerCase()) ||
            module
              .ModuleTitle!.toLowerCase()
              .startsWith(userInput.toLowerCase())
        )
      );

      filteredModules.map(module => {
        if (savedModules[currSemNum].hasOwnProperty(module.ModuleCode!)) {
          module.isDisabled = true;
        }
      });
    }

    this.setState({
      filteredModules,
      userInput,
      currentHighlighted: 0,
      showSuggestion: true,
    });
  };

  private handleClick = (module: IModule) => (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    if (event.button === 0) {
      const { onAddSavedModule, currSemNum } = this.props;
      onAddSavedModule(module, currSemNum);
      this.resetState();
    }
  };

  private handleHover = (index: number) => (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    this.setState({
      currentHighlighted: index,
    });
  };

  private handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentHighlighted, filteredModules } = this.state;
    const { onAddSavedModule, currSemNum } = this.props;
    const { key } = event;

    switch (key) {
      case "Enter": {
        const module = filteredModules[currentHighlighted];
        if (!module.isDisabled) {
          onAddSavedModule(filteredModules[currentHighlighted], currSemNum);
          this.resetState();
        }
        break;
      }
      case "ArrowUp": {
        if (currentHighlighted === 0) {
          return;
        }
        this.setState({
          currentHighlighted: currentHighlighted - 1,
        });
        break;
      }
      case "ArrowDown": {
        if (currentHighlighted - 1 === filteredModules.length) {
          return;
        }
        this.setState({
          currentHighlighted: currentHighlighted + 1,
        });
        break;
      }
      case "Escape": {
        this.resetState();
      }
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reactOnclickoutside(Search));
