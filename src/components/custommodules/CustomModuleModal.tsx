import * as React from "react";
import * as ReactModal from "react-modal";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Theme } from "src/reducers/constants";
import { RootState } from "src/store/configureStore";

import "src/style/Settings.css";
import "src/style/Modal.css";
import CrossSvg from "../svgs/CrossSvg";
import { closeCustomModuleModal } from "src/actions/misc";
import CustomModuleForm from "./CustomModuleForm";
import { ISavedModule } from "src/reducers/savedModules";

interface ICustomModuleModalProp {
  theme: Theme;
  showModal: boolean;
  moduleInfo: ISavedModule;
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
  const { theme, showModal, onCloseModal, moduleInfo } = props;
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
      <CustomModuleForm initialModule={moduleInfo} />
    </ReactModal>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomModuleModal);
