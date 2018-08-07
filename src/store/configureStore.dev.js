import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import { routerMiddleware, connectRouter } from "connected-react-router";
import onlineStoreEnhancer from "redux-online-store-enhancer";

import rootReducer from "../reducers";

export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middleware = [
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

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
