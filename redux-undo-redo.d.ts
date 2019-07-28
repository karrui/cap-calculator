declare module "redux-undo-redo" {
  import { Action } from "redux";

  export interface UndoHistoryState {
    undoQueue: any[];
    redoQueue: any[];
  }

  export function undoHistoryReducer(state: UndoHistoryState, action: any): any;

  export namespace actions {
    export function undo(): Action;
    export function redo(): Action;
    export function addUndoItem(): Action;
    export function clear(): Action;
  }
}
