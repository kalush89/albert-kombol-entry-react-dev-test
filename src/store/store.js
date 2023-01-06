import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import { rootReducer, loadFromLocalStorage, saveToLocalStorage } from './root-reducer';

//const middlewares = [logger];

//const composedEnhancers = compose(applyMiddleware(...middlewares));

const persistedStore = loadFromLocalStorage();

export const store = createStore(rootReducer, persistedStore);

store.subscribe(() => {
    saveToLocalStorage(store.getState());
  });