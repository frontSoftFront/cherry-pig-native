import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
// features
import auth from '../features/auth/reducer';
// //////////////////////////////////////////////////

const reducers = combineReducers({
  auth,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default reducers;
