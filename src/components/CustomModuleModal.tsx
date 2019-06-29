import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme } from "src/reducers/constants";
import { RootState } from "src/store/configureStore";

import "../style/Settings.css";
import "../style/Modal.css";
import CrossSvg from "./svgs/CrossSvg";
import { closeCustomModuleModal } from "src/actions/misc";
import { IModule } from "src/App";

interface ICustomModuleModalProp {
  theme: Theme;
  showModal: boolean;
  moduleInfo: IModule;
  onCloseModal: () => void;
}

const mapStateToProps = (state: RootState) => ({
  theme: state.misc.theme,
  showModal: state.misc.customModuleModalInfo.isShown,
  moduleInfo: state.misc.customModuleModalInfo.module,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCloseModal: () => {
    dispatch(closeCustomModuleModal());
  },
});

const CustomModuleModal: React.FunctionComponent<
  ICustomModuleModalProp
> = props => {
  const { theme, showModal, onCloseModal } = props;
  return (
    <ReactModal
      isOpen={showModal}
      contentLabel="Custom module modal"
      overlayClassName={`${theme} modal-overlay`}
      className={`${theme} custom-module-modal my-modal`}
      onRequestClose={onCloseModal}
      closeTimeoutMS={200}
    >
      <button className="modal-close-btn" onClick={onCloseModal}>
        <CrossSvg />
      </button>
      <h2>Create custom module</h2>
      <div>Form here to create custom thingamagics</div>
    </ReactModal>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomModuleModal);
