import { not } from 'ramda';
import * as Yup from 'yup';
import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { useFirebase } from 'react-redux-firebase';
import { compose, withState, withHandlers } from 'recompose';
//
import { setCurrentUser } from './actions';
import FormikForm from '../../forms/FormikForm';
// //////////////////////////////////////////////////

// vito@gmail.com vito@gmail.com

const enhance = compose(
  connect(
    null,
    {
      setCurrentUser,
    },
  ),
);

const withSnackbarState = compose(
  enhance,
  withState('snackbarMsg', 'setSnackbarMsg', ''),
  withState('snackbarVisible', 'setSnackbarVisible', false),
  withHandlers({
    onToggleSnackbar: props => (msg) => {
      const { setSnackbarMsg, isSnackbarVisible, setSnackbarVisible } = props;
      setSnackbarVisible(not(isSnackbarVisible));
      setSnackbarMsg(msg);
    },
    onDismissSnackbar: props => () => {
      const { setSnackbarVisible } = props;
      setSnackbarVisible(false);
    },
  }),
);

const initialValues = {
  email: '',
  password: '',
};

const formSettings = [
  {
    type: 'text',
    name: 'email',
    label: 'Email',
  },
  {
    type: 'text',
    name: 'password',
    label: 'Password',
  },
];

export const validationSchema = Yup.object({
  'email': Yup.string()
    .nullable(true)
    .required('Field is required')
    .email('Enter a valid Email'),
  'password': Yup.string()
    .nullable(true)
    .required('Field is required')
    .max(50, 'Maximum 50 characters'),
});

function LoginScreen(props) {
  const { snackbarMsg, setCurrentUser, snackbarVisible, onDismissSnackbar, onToggleSnackbar } = props;

  //const [setLoading] = useState(false);

  const firebase = useFirebase();

  async function sendLoginData(data) {
    //setLoading(true);
    const { email, password } = data;
    await firebase
      .login({ email, password })
      .then((res) => {
        console.log('//////////////////////////////////////res', res);
        if (res.user) {
          setCurrentUser({ name: 'alex' });
        }
      })
      .catch((err) => {
        console.log('//////////////////////////////////////err', err);
        onToggleSnackbar(err.message);
      });
    //setLoading(false);
  }

  return (
    <View>
      <FormikForm
        submitBtnText={'Login'}
        formSettings={formSettings}
        initialValues={initialValues}
        submitHandler={sendLoginData}
        validationSchema={validationSchema} />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackbar}
        action={{
          label: 'Undo',
          onPress: () => {},
        }}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

export default withSnackbarState(LoginScreen);
