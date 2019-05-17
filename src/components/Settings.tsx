import * as React from "react";
import * as ReactModal from "react-modal";
import * as Mousetrap from "mousetrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { toggleTheme, setNumSemester } from "src/actions/misc";
import { Theme } from "src/reducers/constants";
import { RootState } from "src/store/configureStore";

import "../style/Settings.css";
import "../style/Modal.css";
import { resetCapCalculator } from "src/actions/capCalculator";
import { setSavedModules } from "src/actions/savedModules";
import CrossSvg from "./svgs/CrossSvg";
import SettingsSvg from "./svgs/SettingsSvg";

interface ISettingsProp {
  dispatch: Dispatch;
  theme: Theme;
}

interface ISettingsState {
  showModal: boolean;
  confirmReset: boolean;
}

const mapStateToProps = (state: RootState) => ({
  theme: state.misc.theme,
});

type Shortcut = string | string[];

class Settings extends React.PureComponent<ISettingsProp, ISettingsState> {
  constructor(props: ISettingsProp) {
    super(props);

    this.state = {
      showModal: false,
      confirmReset: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // Toggle night mode
    this.bind("x", () => {
      dispatch(toggleTheme());
    });

    this.bind("?", this.toggleModal);
  }

  bind(key: Shortcut, action: (e: Event) => void) {
    Mousetrap.bind(key, action);
  }

  toggleDarkMode = () => {
    const { dispatch } = this.props;
    dispatch(toggleTheme());
  };

  toggleModal = () => {
    this.setState((prevState: ISettingsState) => ({
      showModal: !prevState.showModal,
      confirmReset: false,
    }));
  };

  resetCalculator = () => {
    const { dispatch } = this.props;
    dispatch(resetCapCalculator());
    dispatch(setSavedModules({}));
    dispatch(setNumSemester(1));

    this.closeModal();
  };

  handleResetModules = () => {
    this.setState({
      confirmReset: true,
    });
  };

  cancelResetModules = () => {
    this.setState({
      confirmReset: false,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      confirmReset: false,
    });
  };

  render() {
    const { theme } = this.props;
    const { confirmReset } = this.state;
    return (
      <div className="settings-wrapper">
        <button
          className="btn btn-outline-primary settings-btn"
          onClick={this.toggleModal}
        >
          <SettingsSvg />
          <span>Settings</span>
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Settings modal"
          overlayClassName={`${theme} modal-overlay`}
          className={`${theme} settings-modal my-modal`}
          onRequestClose={this.closeModal}
          closeTimeoutMS={200}
        >
          <button className="modal-close-btn" onClick={this.closeModal}>
            <CrossSvg />
          </button>
          <h2>Settings</h2>
          <table className="table table-sm">
            <tbody>
              <tr>
                <th />
                <th>Appearance</th>
              </tr>
              <tr>
                <td className="keybind">
                  <kbd>X</kbd>
                </td>
                <td>
                  <span
                    className="setting-action"
                    onClick={this.toggleDarkMode}
                  >
                    Toggle dark mode
                  </span>
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th />
                <th>Misc</th>
              </tr>
              <tr>
                <td />
                <td>
                  {confirmReset ? (
                    <React.Fragment>
                      <span>
                        Are you sure? This is <b>irreversible</b>.
                      </span>
                      <span
                        className="setting-action"
                        onClick={this.resetCalculator}
                      >
                        {" "}
                        Yes{" "}
                      </span>{" "}
                      /{" "}
                      <span
                        className="setting-action"
                        onClick={this.cancelResetModules}
                      >
                        No
                      </span>
                    </React.Fragment>
                  ) : (
                    <span
                      className="setting-action"
                      onClick={this.handleResetModules}
                    >
                      Reset modules
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Settings);
