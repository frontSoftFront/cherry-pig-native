import logger from 'redux-logger';
import { createLogicMiddleware } from 'redux-logic';
import { compose, applyMiddleware, createStore as createReduxStore } from 'redux';
// root
import logic from './logic';
import reducer from './reducer';
//////////////////////////////////////////////////

let devToolsExtensionComposable = null;

if (typeof window !== 'undefined' && process && process.env && process.env.NODE_ENV !== 'production') {
  if (window.devToolsExtension) {
    devToolsExtensionComposable = window.devToolsExtension();
  }
}

function createStore(initialState = {}) {
  let additionalMiddlewares = [];
  const logicMiddleware = createLogicMiddleware(logic);
  if (typeof window !== 'undefined' && process && process.env && process.env.NODE_ENV === 'development') {
    additionalMiddlewares.push(logger);
  }
  const middleWares = [
    logicMiddleware,
    ...additionalMiddlewares,
  ];
  const composables = [applyMiddleware(...middleWares)];
  if (devToolsExtensionComposable) {
    composables.push(devToolsExtensionComposable);
  }
  const store = createReduxStore(reducer, initialState, compose(...composables));
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducer);
    });
  }
  return store;
}

export default createStore;
