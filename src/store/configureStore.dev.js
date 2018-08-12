import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import onlineStoreEnhancer from "redux-online-store-enhancer";

import customMiddleware, { incrementMiddleware } from "../middlewares";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

export default function configureStore() {
  const initialState = {};

  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = [
    customMiddleware,
    incrementMiddleware,
    routerMiddleware(history),
    sagaMiddleware,
    createLogger()
  ];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancer(applyMiddleware(...middleware), onlineStoreEnhancer())
  );

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      store.replaceReducer(connectRouter(history)(rootReducer));
    });
  }

  store.runSaga = () => sagaMiddleware.run(rootSaga);
  store.history = history;
  store.close = () => store.dispatch(END);

  return store;
}
