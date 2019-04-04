import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";
import * as CopyToClipboard from "react-copy-to-clipboard";

import "../style/Export.css";
import { RootState } from "src/store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import { HOME_URL } from "src";

import CopySvg from "./svgs/CopySvg";
import ShareSvg from "./svgs/ShareSvg";
import CrossSvg from "./svgs/CrossSvg";

interface IExportState {
  showModal: boolean;
  serializedModules: string;
  copied: boolean;
}

interface IExportProps {
  savedModules: ISavedModuleState;
  numSemesters: number;
}

const mapStateToProps = (state: RootState) => ({
  savedModules: state.savedModules,
  numSemesters: state.misc.numSemesters,
});

class Export extends React.Component<IExportProps, IExportState> {
  constructor(props: IExportProps) {
    super(props);
    this.state = {
      showModal: false,
      copied: false,
      serializedModules: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({
      showModal: true,
      serializedModules: encodeURI(
        JSON.stringify({
          savedModules: this.props.savedModules,
          numSemesters: this.props.numSemesters,
        })
      ),
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false, copied: false });
  }

  render() {
    const exportUrl = `${HOME_URL}import?${this.state.serializedModules}`;

    return (
      <div>
        <button
          className="btn btn-outline-primary"
          onClick={this.handleOpenModal}
        >
          Trigger Modal
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          overlayClassName="export-overlay"
          className="export-modal"
          onRequestClose={this.handleCloseModal}
          closeTimeoutMS={200}
        >
          <button className="close-btn" onClick={this.handleCloseModal}>
            <CrossSvg />
          </button>
          <div className="export-header">
            <ShareSvg />
            <h3>Share/Sync Your Modules</h3>
            <p>
              Send this link to your friends to{" "}
              <span className="strikethrough">brag about</span> share your saved
              modules or <br />
              to yourself to keep your saved modules synced on all devices.
            </p>
          </div>
          <div className="input-wrapper">
            <div className="input-group input-group-lg">
              <input
                className="form-control"
                readOnly
                value={exportUrl}
                type="text"
              />
              <div className="input-group-append">
                <CopyToClipboard
                  text={exportUrl}
                  onCopy={() => this.setState({ copied: true })}
                >
                  <button
                    className="btn btn-primary"
                    type="button"
                    aria-label="Copy URL"
                  >
                    <CopySvg />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            {this.state.copied && <p className="copy-msg">Link copied!</p>}
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Export);
