import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import configureStore from "./store/configureStore";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootSaga from "./sagas";

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__, history);

store.runSaga(rootSaga);

const logReduxState = store =>
  window.setInterval(() => {
    return console.log(store.getState());
  }, 1000);

logReduxState(store);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
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
