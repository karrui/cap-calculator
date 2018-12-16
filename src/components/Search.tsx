import * as React from "react";
import { IModule } from "src/App";

interface ISearchState {
  userInput: string;
  filteredModules: IModule[];
  currentHighlighted: number;
  showSuggestion: boolean;
}

interface ISearchProps {
  moduleBank: IModule[] | null;
}

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      currentHighlighted: 0,
      filteredModules: [],
      showSuggestion: false,
      userInput: ""
    };
  }

  public render() {
    const {
      userInput,
      currentHighlighted,
      showSuggestion,
      filteredModules
    } = this.state;

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
                  onClick={this.handleClick}
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
        />
        {suggestionsModuleComponent}
      </React.Fragment>
    );
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { moduleBank } = this.props;
    const userInput = event.currentTarget.value;
    let filteredModules: IModule[] = [];

    if (moduleBank && userInput.length >= 2) {
      // filter modules that doesn't fit input
      filteredModules = moduleBank.filter(
        module =>
          module.ModuleCode!.toLowerCase().startsWith(userInput.toLowerCase()) ||
          module.ModuleTitle!.toLowerCase().startsWith(userInput.toLowerCase())
      ).slice(0, 6);
    }

    this.setState({
      currentHighlighted: 0,
      filteredModules,
      showSuggestion: true,
      userInput
    });
  };

  private handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    this.setState({
      currentHighlighted: 0,
      filteredModules: [],
      showSuggestion: false,
      userInput: event.currentTarget.innerText,
    })
  }

  private handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentHighlighted, filteredModules } = this.state;
    const { keyCode } = event;
    // enter key pressed, update input + close suggestions
    if (keyCode === 13) {
      this.setState({
        currentHighlighted: 0,
        showSuggestion: false,
        userInput: this.getModuleValue(filteredModules[currentHighlighted])
      });
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
    module.ModuleCode + "|" + module.ModuleTitle;
}

export default Search;
