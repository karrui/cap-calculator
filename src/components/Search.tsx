import * as React from "react";
import onClickOutside from 'react-onclickoutside';
import { connect } from 'react-redux';

import { addModule } from 'src/actions';
import { IModule } from "src/App";
import { ISavedModule } from 'src/reducers/savedModules';
import { RootState } from 'src/store/configureStore';
import { asyncSetModuleBank } from '../actions/moduleBank';
import Suggestion from './Suggestion';

import '../style/Search.css';

export interface IFilteredModule extends IModule {
  isDisabled?: boolean,
}

interface ISearchProps {
  moduleBank: IModule[];
  savedModules: { [moduleCode: string]: ISavedModule };
  onSetModuleBank: () => void;
  onAddSavedModule: (module: IModule) => void;
}

interface ISearchState {
  userInput: string;
  filteredModules: IFilteredModule[];
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

  public handleClickOutside = (event:any) => this.resetState();

  public componentDidMount() {
    const { moduleBank, onSetModuleBank } = this.props;
    if(moduleBank.length === 0) {
      onSetModuleBank();
    }
  }

  public render() {
    const { showSuggestion, userInput, filteredModules, currentHighlighted } = this.state;
    return (
      <div className="search-container">
        <input
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          value={userInput}
          placeholder="Add Module for CAP Calculation"
        />
        {showSuggestion && userInput &&
          <Suggestion
            filteredModules={filteredModules}
            currentHighlighted={currentHighlighted}
            handleClick={this.handleClick}
            handleHover={this.handleHover}
          />
        }
      </div>
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
    let filteredModules: IFilteredModule[] = [];

    if (moduleBank && userInput.length >= 2) {
      // filter modules that doesn't fit input
      filteredModules = moduleBank.filter(
        module =>
          module.ModuleCode!.toLowerCase().startsWith(userInput.toLowerCase()) ||
          module.ModuleTitle!.toLowerCase().startsWith(userInput.toLowerCase())
      );

      filteredModules.map(module => {
        if (savedModules.hasOwnProperty(module.ModuleCode!)) {
          module.isDisabled = true;
        }
      });
    }

    this.setState({
      currentHighlighted: 0,
      filteredModules,
      showSuggestion: true,
      userInput
    });
  };

  private handleClick = (module: IModule) => (event: React.MouseEvent<HTMLLIElement>) => {
    if(event.button === 0) {
      const { onAddSavedModule } = this.props
      onAddSavedModule(module);
      this.resetState();
    }
  }

  private handleHover = (index: number) => (event: React.MouseEvent<HTMLLIElement>) => {
    this.setState({
      currentHighlighted: index
    });
  }

  private handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentHighlighted, filteredModules } = this.state;
    const { onAddSavedModule } = this.props;
    const { key } = event;

    switch(key) {
      case "Enter":  {
        const module = filteredModules[currentHighlighted];
        if(!module.isDisabled) {
          onAddSavedModule(filteredModules[currentHighlighted]);
          this.resetState();
        }
        break;
      }
      case "ArrowUp": {
        if (currentHighlighted === 0) {
          return;
        }
        this.setState({
          currentHighlighted: currentHighlighted - 1
        });
        break;
      }
      case "ArrowDown": {
        if (currentHighlighted - 1 === filteredModules.length) {
          return;
        }
        this.setState({
          currentHighlighted: currentHighlighted + 1
        });
        break;
      }
      case "Escape": {
        this.resetState();
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Search));
