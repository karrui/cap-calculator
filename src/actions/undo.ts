import { action } from "typesafe-actions";
import { UndoRedoState } from "../middlewares/undo";
import { UNDO } from "../reducers/constants";

export const undo = (undoState: UndoRedoState) => action(UNDO, undoState);
