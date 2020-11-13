import * as R from 'ramda';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
//
import Screens from './screens';
import createStore from './redux/store';
import { getCurrentUser } from './features/auth/actions';
// //////////////////////////////////////////////////

// redux store
const store = createStore({ some: 'some' });

// firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDZF62oZmsR6GioSI13oX5vAE7zC5-tV-o',
  authDomain: 'cherry-pig-api.firebaseapp.com',
  databaseURL: 'https://cherry-pig-api.firebaseio.com',
  projectId: 'cherry-pig-api',
  storageBucket: 'cherry-pig-api.appspot.com',
  messagingSenderId: '693052839390',
  appId: '1:693052839390:web:d70656f654482c643a794f',
  measurementId: 'G-Q7MKYKHT66',
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.database(); // <- needed if using firestore
firebase.firestore(); // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    // store.dispatch(getCurrentUser());

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'), // eslint-disable-line
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (R.not(isLoadingComplete)) {
    return null;
  }
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Screens />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
