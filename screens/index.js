import React from 'react';
import { AppLoading } from 'expo';
import { compose } from 'recompose';
import { connect } from 'react-redux';
//
import MainScreen from './MainScreen';
import LoginScreen from '../features/auth/LoginScreen';
import { selectAuthStore } from '../features/auth/selectors';
// //////////////////////////////////////////////////

const enhance = compose(
  connect(
    state => ({
      authStore: selectAuthStore(state),
    }),
  ),
);

function Screens(props) {
  const { authStore } = props;
  const { isLoading, isSignedIn } = authStore;

  if (isLoading) return <AppLoading />;
  if (isSignedIn) {
    return (
      <MainScreen />
    );
  }
  return (
    <LoginScreen />
  );
}

export default enhance(Screens);
