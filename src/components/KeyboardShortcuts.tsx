import * as React from "react";
import * as Mousetrap from "mousetrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { toggleTheme } from "src/actions/misc";

interface IKeyboardShortcutsProp {
  dispatch: Dispatch;
}

interface IKeyboardShortcutsState {
  showModal: boolean;
}

type Shortcut = string | string[];

class KeyboardShortcuts extends React.PureComponent<
  IKeyboardShortcutsProp,
  IKeyboardShortcutsState
> {
  constructor(props: IKeyboardShortcutsProp) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // Toggle night mode
    this.bind("x", () => {
      dispatch(toggleTheme());
    });
  }

  bind(key: Shortcut, action: (e: Event) => void) {
    Mousetrap.bind(key, action);
  }

  render() {
    return <div />;
  }
}

export default connect()(KeyboardShortcuts);
