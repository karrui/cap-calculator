import { action } from "typesafe-actions";
import { RESET_CAP_CALC } from "src/reducers/constants";

export const resetCapCalculator = () => action(RESET_CAP_CALC);
