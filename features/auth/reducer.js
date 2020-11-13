import { $all, $set } from 'plow-js';
import { createReducer } from 'redux-act';
//
import * as A from './actions';
// //////////////////////////////////////////////////

const initialState = {
  user: null,
  isLoading: false,
  isSignedIn: false,
};

// const initialState = {
//   user: null,
//   isLoading: false,
//   isSignedIn: true,
// };

const setCurrentUser = (state: Object, data: string) => $all(
  $set('user', data),
  $set('isSignedIn', true),
  $set('isLoading', false),
  state,
);

export default createReducer({
  [A.setCurrentUser]: setCurrentUser,
}, initialState);
