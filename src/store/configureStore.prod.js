import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { routerMiddleware, connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import rootReducer from "../reducers";
import rootSaga from "../sagas";

export default function configureStore() {
  const initialState = {};

  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(...middleware)
  );

  store.runSaga = () => sagaMiddleware.run(rootSaga);
  store.history = history;
  store.close = () => store.dispatch(END);

  return store;
}
