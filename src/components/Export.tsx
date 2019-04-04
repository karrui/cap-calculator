import * as React from "react";
import * as ReactModal from "react-modal";

import "../style/Export.css";
import { RootState } from "src/store/configureStore";
import { ISavedModuleState } from "src/reducers/savedModules";
import { connect } from "react-redux";

interface IExportState {
  showModal: boolean;
  serializedModules: string;
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
    this.setState({ showModal: false });
  }

  render() {
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
        >
          <div>{this.state.serializedModules}</div>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Export);
