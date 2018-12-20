import { action } from "typesafe-actions";

import { IModule } from "src/App";
import { ADD_MOD, REMOVE_MOD } from "src/reducers/constants";

export const addModule = (module: IModule, semNum: string) =>
  action(ADD_MOD, { module, semNum });

export const removeModule = (module: IModule, semNum: string) =>
  action(REMOVE_MOD, { module, semNum });
