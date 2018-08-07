import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();

store.runSaga();

const logReduxState = store =>
  window.setInterval(() => {
    return console.log(store.getState());
  }, 1000);

logReduxState(store);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={store.history} />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render();
registerServiceWorker();

if (module.hot) {
  module.hot.accept("./App", () => {
    render();
  });
}
