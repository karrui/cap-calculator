import axios from "axios";
import * as _ from "lodash";
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { action } from "typesafe-actions";

import { IModule } from "src/App";
import { CLEAR_MODULE_BANK, SET_MODULE_BANK } from "src/reducers/constants";

const API_URL_SEM_1 = "http://api.nusmods.com/2018-2019/1/modules.json";
const API_URL_SEM_2 = "http://api.nusmods.com/2018-2019/2/modules.json";

export const asyncSetModuleBank: ActionCreator<
  ThunkAction<any, any, any, any>
> = () => {
  return async (dispatch: Dispatch): Promise<Action> => {
    const sem1ModuleData = await getModules(API_URL_SEM_1);
    const sem2ModuleData = await getModules(API_URL_SEM_2);

    const combined = _.uniqBy(
      sem1ModuleData.concat(sem2ModuleData),
      "ModuleCode"
    );
    return dispatch(action(SET_MODULE_BANK, combined));
  };
};

const getModules = async (url: string) => {
  const { data }: { data: object[] } = await axios.get(url);
  const cleanedData: IModule[] = [];
  data.map(module =>
    cleanedData.push(
      _.pick(module, ["ModuleTitle", "ModuleCode", "ModuleCredit"])
    )
  );
  return cleanedData;
};

export const clearModuleBank = () => action(CLEAR_MODULE_BANK);
