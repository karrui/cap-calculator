import * as React from "react";
import * as ReactModal from "react-modal";
import * as qs from "query-string";
import * as md5 from "md5";
// tslint:disable-next-line: import-name
import ReactLoading from "react-loading";

import { connect } from "react-redux";
import * as CopyToClipboard from "react-copy-to-clipboard";

import "../style/Export.css";
import "../style/Modal.css";

import firestore, { FS_COLLECTION_LINKS } from "../data/firestore";
import { RootState } from "src/store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import { HOME_URL } from "src";

import CopySvg from "./svgs/CopySvg";
import ShareSvg from "./svgs/ShareSvg";
import CrossSvg from "./svgs/CrossSvg";
import { Theme } from "src/reducers/constants";

interface IExportState {
  showModal: boolean;
  shortenedLink: string;
  copied: boolean;
  loading: boolean;
}

interface IExportProps {
  savedModules: ISavedModuleState;
  numSemesters: number;
  theme: Theme;
}

const mapStateToProps = (state: RootState) => ({
  savedModules: state.savedModules,
  numSemesters: state.misc.numSemesters,
  theme: state.misc.theme,
});

interface ISerializedModule {
  numSemesters?: number;
  [semNum: number]: [];
}

class Export extends React.Component<IExportProps, IExportState> {
  constructor(props: IExportProps) {
    super(props);
    this.state = {
      showModal: false,
      loading: false,
      copied: false,
      shortenedLink: "",
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal = () => {
    // activate load state
    this.setState({
      loading: true,
      showModal: true,
    });

    const serializedModules = this.serializeExportModules();
    const shortenedLink = md5(serializedModules).slice(0, 7);

    firestore
      .collection(FS_COLLECTION_LINKS)
      .doc(shortenedLink)
      .set({
        fullLink: serializedModules,
      })
      .then(() => {
        this.setState({
          shortenedLink,
          loading: false,
        });
      });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, copied: false });
  };

  serializeExportModules = () => {
    const { savedModules } = this.props;
    const serializedObj: ISerializedModule = {};
    serializedObj.numSemesters = this.props.numSemesters;
    Object.keys(savedModules).map((semNum: string) => {
      serializedObj[semNum] = [];
      Object.keys(savedModules[semNum]).map((moduleCode: string) => {
        serializedObj[semNum].push([
          moduleCode,
          savedModules[semNum][moduleCode].grade,
        ]);
      });
    });
    return qs.stringify(serializedObj, {
      arrayFormat: "bracket",
    });
  };

  render() {
    const exportUrl = `${HOME_URL}import?${this.state.shortenedLink}`;
    const { loading } = this.state;
    const { theme } = this.props;

    return (
      <div className="export-wrapper">
        <button
          className="btn btn-outline-primary export-sync-btn"
          onClick={this.handleOpenModal}
        >
          <ShareSvg />
          <span>Share/Sync</span>
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Export modules modal"
          overlayClassName={`${theme} modal-overlay`}
          className={`${theme} my-modal`}
          onRequestClose={this.handleCloseModal}
          closeTimeoutMS={200}
        >
          <button className="modal-close-btn" onClick={this.handleCloseModal}>
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
          {loading ? (
            <ReactLoading
              className="loading-spinner"
              height={80}
              color="#ff5138"
              type="bubbles"
            />
          ) : (
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
          )}
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Export);
