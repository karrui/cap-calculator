// Duplicated from redux-undo-redo and modified to only allow 1 undo step.

import { omitBy, isNil } from "lodash";

const INITIAL_UNDO_HISTORY_STATE = {
  undoQueue: [],
  redoQueue: [],
};

export default function undoHistoryReducer(
  state = INITIAL_UNDO_HISTORY_STATE,
  action: any
) {
  const { type, payload: undoItem } = action;
  const { undoQueue, redoQueue } = state;

  switch (type) {
    case "UNDO_HISTORY@UNDO": {
      return undoQueue.length === 0
        ? state
        : {
            undoQueue: [],
            redoQueue: [undoQueue[0]],
          };
    }
    case "UNDO_HISTORY@REDO": {
      return redoQueue.length === 0
        ? state
        : {
            undoQueue: [redoQueue[0]],
            redoQueue: [],
          };
    }
    case "UNDO_HISTORY@ADD": {
      return {
        undoQueue: [omitBy(undoItem, isNil)],
        redoQueue: [],
      };
    }
    case "UNDO_HISTORY@CLEAR":
      return INITIAL_UNDO_HISTORY_STATE;
    default:
      return state;
  }
}
