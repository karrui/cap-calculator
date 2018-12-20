import * as React from "react";
import { IModule } from "src/App";
import { IFilteredModule } from "./Search";

import "../style/Suggestion.css";

interface ISuggestionProps {
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

        return (
          <li
            className={className}
            key={module.ModuleCode}
            onMouseDown={module.isDisabled ? undefined : handleClick(module)}
            onMouseEnter={module.isDisabled ? undefined : handleHover(index)}
          >
            {getModuleValue(module)}
            {module.isDisabled && <span className="alr-added">Added</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default Suggestion;
