import * as React from "react";
import { connect } from 'react-redux';

import { addModule } from 'src/actions';
import { IModule } from "src/App";
import { ISavedModule } from 'src/reducers/savedModules';
import { RootState } from 'src/store/configureStore';
import { asyncSetModuleBank } from '../actions/moduleBank';

import '../style/Search.css';

interface ISearchProps {
  moduleBank: IModule[];
  savedModules: { [moduleCode: string]: ISavedModule };
  onSetModuleBank: () => void;
  onAddSavedModule: (module: IModule) => void;
}

interface ISearchState {
  userInput: string;
  filteredModules: IModule[];
  currentHighlighted: number;
  showSuggestion: boolean;
}

const mapStateToProps = (state: RootState) => ({
  moduleBank: state.moduleBank,
  savedModules: state.savedModules,
})

const mapDispatchToProps = (dispatch: any) => ({
  onSetModuleBank: () => {
    dispatch(asyncSetModuleBank());
  },

  onAddSavedModule: (module: IModule) => {
    dispatch(addModule(module));
  }
});

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);

    this.state = {
      currentHighlighted: 0,
      filteredModules: [],
      showSuggestion: false,
      userInput: '',
    }
  }

  public componentDidMount() {
    const { moduleBank, onSetModuleBank } = this.props;
    if(moduleBank.length === 0) {
      onSetModuleBank();
    }
  }

  public render() {
    const {showSuggestion, userInput, filteredModules, currentHighlighted} = this.state;
    let suggestionsModuleComponent;

    if (showSuggestion && userInput) {
      // has suggestions
      if (filteredModules.length) {
        suggestionsModuleComponent = (
          <ul className="suggestions">
            {filteredModules.map((module, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === currentHighlighted) {
                className = "suggestion-active";
              }

              return (
                <li
                  className={className}
                  key={module.ModuleCode}
                  onClick={this.handleClick(module)}
                >
                  {this.getModuleValue(module)}
                </li>
              );
            })}
          </ul>
        );
      }
    }

    return (
      <React.Fragment>
        <input
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          value={userInput}
          placeholder="Add Module for CAP Calculation"
        />
        {suggestionsModuleComponent}
      </React.Fragment>
    );
  }

  private resetState = () => {
    this.setState({
      currentHighlighted: 0,
      filteredModules: [],
      showSuggestion: false,
      userInput: ''
    });
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { moduleBank, savedModules } = this.props;
    const userInput = event.currentTarget.value;
    let filteredModules: IModule[] = [];

    if (moduleBank && userInput.length >= 2) {
      // filter modules that doesn't fit input
      filteredModules = moduleBank.filter(
        module =>
          !savedModules.hasOwnProperty(module.ModuleCode!) && (
            module.ModuleCode!.toLowerCase().startsWith(userInput.toLowerCase()) ||
            module.ModuleTitle!.toLowerCase().startsWith(userInput.toLowerCase())
          )
      ).slice(0, 6);
    }

    this.setState({
      currentHighlighted: 0,
      filteredModules,
      showSuggestion: true,
      userInput
    });
  };

  private handleClick = (module: IModule) => (event: React.MouseEvent<HTMLLIElement>) => {
    const { onAddSavedModule } = this.props
    onAddSavedModule(module);
    this.resetState();
  }

  private handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentHighlighted, filteredModules } = this.state;
    const { onAddSavedModule } = this.props;
    const { keyCode } = event;
    // enter key pressed, update input + close suggestions
    if (keyCode === 13) {
      onAddSavedModule(filteredModules[currentHighlighted]);
      this.resetState();
    } else if (keyCode === 38) {
      // up arrow
      if (currentHighlighted === 0) {
        return;
      }
      this.setState({
        currentHighlighted: currentHighlighted - 1
      });
    } else if (keyCode === 40) {
      // down arrow
      if (currentHighlighted - 1 === filteredModules.length) {
        return;
      }
      this.setState({
        currentHighlighted: currentHighlighted + 1
      });
    }
  };

  private getModuleValue = (module: IModule) =>
    module.ModuleCode + " " + module.ModuleTitle;
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
