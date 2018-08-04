import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import { routerMiddleware, connectRouter } from "connected-react-router";

import rootReducer from "../reducers";

export default function configureStore(initialState, history) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(...middleware)
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
