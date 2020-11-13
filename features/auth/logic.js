import { createLogic } from 'redux-logic';
// feature auth
import * as A from './actions';
// //////////////////////////////////////////////////

const handleGetAuth = createLogic({
  type: A.getCurrentUser,
  debounce: 2000,
  validate({ getState, action }: Object, allow: void) {
    allow(action);
  },
  process({ getState, action }: Object, dispatch: void, done: void) {
    dispatch(A.setCurrentUser({ name: 'Vitaliy' }));
    done();
  },
});

export default [
  handleGetAuth,
];
