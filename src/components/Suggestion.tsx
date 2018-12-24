import * as React from "react";
// @ts-ignore
import reactStringReplace from "react-string-replace";

import { IModule } from "src/App";
import { IFilteredModule } from "./Search";

import "../style/Suggestion.css";

interface ISuggestionProps {
  userInput: string;
  filteredModules: IFilteredModule[];
  currentHighlighted: number;
  handleClick: (
    module: IModule
  ) => (event: React.MouseEvent<HTMLLIElement>) => void;
  handleHover: (
    index: number
  ) => (event: React.MouseEvent<HTMLLIElement>) => void;
}

const getModuleValue = (module: IModule) =>
  `${module.ModuleCode} ${module.ModuleTitle}`;

const Suggestion: React.SFC<ISuggestionProps> = props => {
  const {
    filteredModules,
    currentHighlighted,
    handleClick,
    handleHover,
    userInput,
  } = props;

  return (
    <ul className="suggestions">
      {filteredModules.map((module, index) => {
        let className = "";
        if (index === currentHighlighted) {
          className = "suggestion-active";
        }

        if (module.isDisabled) {
          className += " disabled";
        }

        const regexInput = new RegExp(userInput, "g");

        return (
          <li
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
};

export default Suggestion;
