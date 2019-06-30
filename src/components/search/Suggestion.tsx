import * as React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
import reactStringReplace from "react-string-replace";

import { IModule } from "src/App";
import { IFilteredModule } from "./Search";

import "src/style/Suggestion.css";
import CustomSuggestionItem from "./CustomSuggestionItem";

interface ISuggestionProps {
  userInput: string;
  filteredModules: IFilteredModule[];
  currentHighlighted: number;
  scroll: boolean;
  handleClick: (
    module: IModule,
    isCustom?: boolean
  ) => (event: React.MouseEvent<HTMLLIElement>) => void;
  handleHover: (
    index: number
  ) => (event: React.MouseEvent<HTMLLIElement>) => void;
}

const getModuleValue = (module: IModule) =>
  `${module.ModuleCode} ${module.ModuleTitle}`;

class Suggestion extends React.Component<ISuggestionProps, {}> {
  constructor(props: ISuggestionProps) {
    super(props);
  }

  public render() {
    const {
      currentHighlighted,
      handleClick,
      handleHover,
      userInput,
      filteredModules,
    } = this.props;
    return filteredModules.length === 0 ? (
      <CustomSuggestionItem userInput={userInput} handleClick={handleClick} />
    ) : (
      <ul className="suggestions">
        {filteredModules.map((module: IFilteredModule, index: number) => {
          const active = currentHighlighted === index;
          let className = "suggestion";
          if (active) {
            className += " suggestion-active";
          }

          if (module.isDisabled) {
            className += " disabled";
          }

          return (
            <li
              ref={active ? "activeItem" : ""}
              className={className}
              key={module.ModuleCode}
              onMouseDown={module.isDisabled ? undefined : handleClick(module)}
              onMouseEnter={module.isDisabled ? undefined : handleHover(index)}
            >
              <span>
                {reactStringReplace(
                  getModuleValue(module),
                  userInput,
                  (match: string, i: number) => (
                    <mark key={i}>{match}</mark>
                  )
                )}
              </span>
              {module.isDisabled && <span className="alr-added">Added</span>}
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidUpdate(prevProps: ISuggestionProps) {
    // only scroll into view if the active item changed last render
    if (
      this.props.currentHighlighted !== prevProps.currentHighlighted &&
      this.props.scroll
    ) {
      this.ensureActiveItemVisible();
    }
  }

  ensureActiveItemVisible() {
    const itemComponent = this.refs.activeItem;
    if (itemComponent) {
      const domNode = ReactDOM.findDOMNode(itemComponent);
      if (domNode instanceof Element) {
        domNode.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }
}

export default Suggestion;
