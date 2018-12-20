import { action } from "typesafe-actions";

import { ADD_MOD, REMOVE_MOD } from "src/reducers/constants";
import { IFilteredModule } from "src/components/Search";

export const addModule = (module: IFilteredModule, semNum: string) =>
  action(ADD_MOD, { module, semNum });

export const removeModule = (module: IFilteredModule, semNum: string) =>
  action(REMOVE_MOD, { module, semNum });
