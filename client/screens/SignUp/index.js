 import React from 'react';
 import { Button, TextInput, View } from 'react-native';
import authService from '../../services/authService';
 import { Formik } from 'formik';
import * as Yup from 'yup';

import { getCurrentLocation, getDistanceKm } from '../../utils/geolocation';

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string().email('Please enter a valid username').required('Username is required'),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const SignUp = () => {
  const handleSignUp = async (values) => {
    console.log(values);
    await authService.signUp({ ...values }, () => {});
  };

  getCurrentLocation().then((res) => {
    console.log(res);
  });

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button onPress={handleSubmit} title='submit' />
          </View>
        )}
      </Formik>
    </>
  );
};

export default SignUp;