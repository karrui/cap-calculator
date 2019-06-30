import reduxLogger from "redux-logger";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import { StateType } from "typesafe-actions";

import reducers from "../reducers";

export type RootState = StateType<typeof reducers>;

const persistConfig = {
  storage,
  key: "root",
  blacklist: ["misc"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
  "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__";
const composeEnhancers =
  (window[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__] as typeof compose) || compose;

const middleware =
  process.env.NODE_ENV !== "production"
    ? applyMiddleware(reduxThunk, reduxLogger)
    : applyMiddleware(reduxThunk);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(middleware));
  const persistor = persistStore(store);
  return { store, persistor };
};
