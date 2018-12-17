import { action } from 'typesafe-actions';

import { IModule } from 'src/App';
import { ADD_MOD, REMOVE_MOD } from 'src/reducers/constants';

export const addModule = (module: IModule) => action(ADD_MOD, module);

export const removeModule = (module: IModule) => action(REMOVE_MOD, module);
