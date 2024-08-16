import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage';
import * as History from 'history';

import rootReducer, { key } from './reducers';

export const history = History.createBrowserHistory();

export const persistConfig = {
  key,
  storage: localforage,
  blacklist: ['betslips', 'matches'],
};
const initialState = {};
const enhancers = [];

const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(thunk),
  ...enhancers,
);

const store = createStore(persistedReducer, initialState, composedEnhancers);
const persistor = persistStore(store);

export default { store, persistor };
