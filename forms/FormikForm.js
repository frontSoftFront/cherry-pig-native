import React from 'react';
import * as R from 'ramda';
import { Formik } from 'formik';
import { compose } from 'recompose';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput } from 'react-native-formik';
// root
import { StyledView } from '../ui';
// //////////////////////////////////////////////////

const FormInput = compose(
  handleTextInput,
  withNextInputAutoFocusInput,
)(TextInput);

const Form = withNextInputAutoFocusForm(View);

const FormField = (props) => {
  const {
    name,
    label,
    values,
    errors } = props;
  const error = errors[name];
  const value = R.path([name], values);

  return (
    <FormInput
      name={name}
      error={error}
      label={label}
      value={value}
      disabled={false}
      style={styles.input} />
  );
};

const FormikForm = props => (
  <Formik
    onSubmit={props.submitHandler}
    initialValues={props.initialValues}
    validationSchema={props.validationSchema}
    render={formikProps => (
      <Form>
        <StyledView p={15}>
          {props.formSettings.map(setting => (
            <FormField
              key={setting.name}
              {...setting}
              {...formikProps} />
          ))}
          <Button mode='contained' onPress={formikProps.handleSubmit}>
           {props.submitBtnText}
          </Button>
        </StyledView>
      </Form>
    )} />
);

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
});

export default FormikForm;
