import { createSelector } from 'reselect';
// //////////////////////////////////////////////////

const selectAuth = (state: Object) => state.auth;

const selectAuthStore = createSelector(
  selectAuth,
  (auth: Object) => auth,
);

export {
  selectAuthStore,
};
