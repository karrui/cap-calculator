import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactModal from "react-modal";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import "./style/index.css";

import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store/configureStore";

const { store, persistor } = configureStore();

export const HOME_URL =
  process.env.NODE_ENV === "production"
    ? "https://cap.karrui.me"
    : "http://localhost:3000/";

// Initialize ReactModal
ReactModal.setAppElement("#root");

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
