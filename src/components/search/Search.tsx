import * as React from "react";
import * as _ from "lodash";
import reactOnclickoutside from "react-onclickoutside";
import { connect } from "react-redux";
import { actions as UndoActionCreators } from "redux-undo-redo";

import { addModule } from "../../actions";
import { IModule } from "../../App";
import { ISavedModuleState } from "../../reducers/savedModules";
import { RootState } from "../../store/configureStore";
import { setModuleBank } from "../../actions/moduleBank";
import Suggestion from "./Suggestion";

import "src/style/Search.css";
import SemesterSelector from "../SemesterSelector";
import { showCustomModuleModal } from "src/actions/misc";

export interface IFilteredModule extends IModule {
  isDisabled?: boolean;
}

interface ISearchProps extends ISearchStateProps, ISearchDispatchProps {
  handleAddSavedModule: (module: IFilteredModule, semNum: string) => void;
}

interface ISearchStateProps {
  currSemNum: string;
  moduleBank: IModule[];
  savedModules: ISavedModuleState;
}

interface ISearchDispatchProps {
  onClear: () => void;
  onSetModuleBank: () => void;
  onAddSavedModule: (module: IModule, semNum: string) => void;
  onShowCustomModuleModal: (customModule: IModule) => void;
}

interface ISearchState {
  userInput: string;
  filteredModules: IFilteredModule[];
  currentHighlighted: number;
  showSuggestion: boolean;
  scroll: boolean;
}

const mapStateToProps = (state: RootState) => ({
  currSemNum: state.misc.currSemester,
  moduleBank: state.moduleBank,
  savedModules: state.savedModules,
});

const mapDispatchToProps = (dispatch: any) => ({
  onSetModuleBank: () => {
    dispatch(setModuleBank());
  },

  onClear: () => dispatch(UndoActionCreators.clear()),

  onAddSavedModule: (module: IFilteredModule, semNum: string) => {
    dispatch(addModule(module, semNum));
  },

  onShowCustomModuleModal: (customModule: IModule) => {
    dispatch(showCustomModuleModal(customModule));
  },
});

const mergeProps = (
  stateProps: ISearchStateProps,
  dispatchProps: ISearchDispatchProps,
  ownProps: any
) => ({
  ...stateProps,
  ...ownProps,
  handleAddSavedModule: (module: IFilteredModule, semNum: string) => {
    dispatchProps.onClear();
    dispatchProps.onAddSavedModule(module, semNum);
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
      scroll: false,
    };

    this.handleClick = this.handleClick.bind(this);
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
      scroll,
    } = this.state;
    const { currSemNum } = this.props;
    return (
      <div
        onMouseMove={this.handleOnMouseMove}
        className="search-wrapper container no-gutter"
      >
        <SemesterSelector />
        <input
          className="form-control search-bar"
          type="text"
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          value={userInput}
          placeholder={`Add module to Semester ${currSemNum}`}
        />
        {showSuggestion && userInput && (
          <Suggestion
            scroll={scroll}
            userInput={userInput}
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
      scroll: false,
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
              .includes(userInput.toLowerCase()) ||
            module.ModuleTitle!.toLowerCase().includes(userInput.toLowerCase())
        )
          .sort(
            (a, b) =>
              a.ModuleTitle!.toLowerCase().indexOf(userInput.toLowerCase()) -
              b.ModuleTitle!.toLowerCase().indexOf(userInput.toLowerCase())
          )
          .splice(0, 40)
      );

      filteredModules.map(module => {
        if (
          Object.keys(savedModules).length !== 0 &&
          savedModules[currSemNum] &&
          savedModules[currSemNum].hasOwnProperty(module.ModuleCode!)
        ) {
          module.isDisabled = true;
        }
      });
    }

    this.setState({
      filteredModules,
      userInput,
      currentHighlighted: filteredModules.length === 0 ? -1 : 0,
      // showSuggestion: filteredModules.length !== 0,
      showSuggestion: userInput.length >= 2,
    });
  };

  createCustomModule() {
    const customModule: IModule = {
      ModuleTitle: this.state.userInput,
    };

    return customModule;
  }

  private handleClick = (module?: IModule, isCustom?: boolean) => (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    if (event.button === 0) {
      const {
        handleAddSavedModule,
        onShowCustomModuleModal,
        currSemNum,
      } = this.props;
      if (isCustom) {
        onShowCustomModuleModal(this.createCustomModule());
      } else {
        handleAddSavedModule(module!, currSemNum);
      }
      this.resetState();
    }
  };

  private handleHover = (index: number) => (
    event: React.MouseEvent<HTMLLIElement>
  ) => {
    if (this.state.scroll) return;
    this.setState({
      currentHighlighted: index,
      scroll: false,
    });
  };

  private handleOnMouseMove = () => {
    this.setState({
      scroll: false,
    });
  };

  private handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentHighlighted, filteredModules } = this.state;
    const {
      handleAddSavedModule,
      currSemNum,
      onShowCustomModuleModal,
    } = this.props;
    const { key } = event;

    if (key === "Enter") {
      if (currentHighlighted === -1) {
        onShowCustomModuleModal(this.createCustomModule());
        this.resetState();
        return;
      }
      const module = filteredModules[currentHighlighted];
      if (module && !module.isDisabled) {
        handleAddSavedModule(filteredModules[currentHighlighted], currSemNum);
        this.resetState();
      }
    }

    if (key === "ArrowUp" && currentHighlighted > 0) {
      this.setState(prevState => ({
        currentHighlighted: prevState.currentHighlighted - 1,
        scroll: true,
      }));
    }

    if (
      key === "ArrowDown" &&
      currentHighlighted < filteredModules.length - 1
    ) {
      this.setState(prevState => ({
        currentHighlighted: prevState.currentHighlighted + 1,
        scroll: true,
      }));
    }

    if (key === "Escape") {
      this.resetState();
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(reactOnclickoutside(Search));
