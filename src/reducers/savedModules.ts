import * as _ from 'lodash';

import { ISaveModuleAction } from 'src/actions';
import { ADD_MOD, REMOVE_MOD } from './constants';

export interface ISavedModule {
  ModuleTitle: string;
  ModuleCode: string;
  ModuleCredit: string;
  grade?: number;
}

export interface ISavedModuleState {
  [ModuleCode: string] : ISavedModule
};

const defaultSavedModuleState: ISavedModuleState = {};

const savedModuleReducer = (state: ISavedModuleState = defaultSavedModuleState, action: ISaveModuleAction) => {
  const { payload: module } = action;
  switch(action.type) {
    case ADD_MOD:
      return ({
        ...state,
        [module!.ModuleCode!]: module
      })
    case REMOVE_MOD:
      const {[module!.ModuleCode!]: removedValue, ...rest } = state;
      return rest;
    default:
      return state;
  }
}

export default savedModuleReducer;
