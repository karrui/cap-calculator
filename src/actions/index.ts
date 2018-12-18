import { IModule } from 'src/App';
import { setCurrentSemester } from './misc';
import { asyncSetModuleBank, clearModuleBank } from './moduleBank';
import { addModule, removeModule } from './savedModules';

export interface ISaveModuleAction {
  type: string;
  payload: {
    module: IModule;
    semNum: string;
  }
}

export interface IModuleBankAction {
  type: string;
  payload: IModule[];
}

export interface IMiscAction {
  type: string;
  payload: string;
}

export { addModule, removeModule, asyncSetModuleBank, clearModuleBank, setCurrentSemester };
