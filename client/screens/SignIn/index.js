 import React from 'react';
 import { Button, TextInput, View } from 'react-native';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../authContext'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authServices from '../../services/authService';


 const signInValidationSchema = Yup.object().shape({
   username: Yup
     .string()
     .email("Please enter a valid username")
     .required('Username is required'),
   password: Yup
     .string()
     .min(8, ({ min }) => `Password must be at least ${min} characters`)
     .required('Password is required'),
 })
  
const SignIn = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const handleSignIn = values => {
    auth.login({
      username: "poggers",
      token: "17",
    })
    // await authServices.login({ ...values }, (credentials, data) => {
    //   localStorage.setItem("email", credentials.email)
    //   localStorage.setItem("token", data.token)
    //   localStorage.setItem("id", data.id)
      
    //   console.log(localStorage.getItem("email"))
    //   console.log(localStorage.getItem("token"))
    //   console.log(localStorage.getItem("id"))

    //   auth.login(credentials.email, () => {})
    // })
  }

  return (
    <>
      <Formik
          // validationSchema={signInValidationSchema}
          initialValues={{ 
            username: '',
            password: '',
          }}
        onSubmit={values => handleSignIn(values)}
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
            <Button onPress={handleSignIn} title="Submit" />
          </View>
        )}
      </Formik>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </>
  );
}

export default SignIn;