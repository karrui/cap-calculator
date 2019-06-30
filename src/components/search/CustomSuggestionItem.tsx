import * as React from "react";
import { IModule } from "src/App";

interface ICustomSuggestionItemProps {
  userInput: string;
  handleClick: (
    module?: IModule,
    isCustom?: boolean
  ) => (event: React.MouseEvent<HTMLLIElement>) => void;
}

class CustomSuggestionItem extends React.Component<
  ICustomSuggestionItemProps,
  {}
> {
  constructor(props: ICustomSuggestionItemProps) {
    super(props);
  }

  public render() {
    const { userInput, handleClick } = this.props;

    return (
      <ul className="suggestions">
        <li
          className="suggestion-active"
          onClick={handleClick(undefined, true)}
        >
          <span>
            No results found for <mark>"{userInput}"</mark>. Select to add{" "}
            <mark>"{userInput}"</mark> as custom module.
          </span>
        </li>
      </ul>
    );
  }
}

export default CustomSuggestionItem;
