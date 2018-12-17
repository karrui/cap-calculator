import * as _ from 'lodash';

import { ISaveModuleAction } from 'src/actions';
import { IModule } from 'src/App';
import { ADD_MOD, REMOVE_MOD } from './constants';

export interface ISavedModule {
  module: IModule,
  cap: number
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
      return Object.keys(state)
      .filter(key => key !== module!.ModuleCode)
      .reduce((result, current) => {
        result[current] = state[current];
        return result;
    }, defaultSavedModuleState);
    default:
      return state;
  }
}

export default savedModuleReducer;
