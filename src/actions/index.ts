import { IModule } from 'src/App';
import { asyncSetModuleBank, clearModuleBank } from './moduleBank';
import { addModule, removeModule } from './savedModules';

export interface ISaveModuleAction {
  type: string;
  payload: IModule;
}

export interface IModuleBankAction {
  type: string;
  payload: IModule[];
}

export { addModule, removeModule, asyncSetModuleBank, clearModuleBank };
