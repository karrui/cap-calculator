// @ts-ignore
import { createUndoMiddleware } from "redux-undo-redo";
import { RootState } from "../store/configureStore";

import { undo } from "../actions/undo";
import { ISavedModuleState } from "src/reducers/savedModules";
import { ICapCalcState } from "src/reducers/capCalculator";
import { IMiscState } from "src/reducers/misc";

export type UndoRedoState = {
  savedModules: ISavedModuleState;
  capCalculator: ICapCalcState;
  misc: IMiscState;
};

const doUndo = {
  action: (_action: any, { undoState }: { undoState: UndoRedoState }) =>
    undo(undoState),
  createArgs: (state: RootState, _action: any) => ({
    undoState: {
      misc: state.misc,
      capCalculator: state.capCalculator,
      savedModules: state.savedModules,
    },
  }),
};

export const undoMiddleware = createUndoMiddleware({
  revertingActions: {
    REMOVE_SEMESTER: doUndo,
    REMOVE_MOD: doUndo,
  },
});
