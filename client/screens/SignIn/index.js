import React from 'react';
import { Button, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../../authContext'
 import { Formik } from 'formik';
 import * as Yup from 'yup'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authService from '../../services/authService';

const SignIn = ({ navigation }) => {
  const auth = useContext(AuthContext);

  const handleSignIn = async values => {
    await authService.signIn({ ...values }, async (credentials, data) => {
      try {
        console.log("saving...")
        const jsonValue = JSON.stringify({ ...credentials, ...data })
        await AsyncStorage.setItem('@user', jsonValue)
      } catch (e) {
        console.log("error saving item")
      }
        // console.log(localStorage.getItem("email"))
        // console.log(localStorage.getItem("token"))
        // console.log(localStorage.getItem("id"))

      auth.login({ ...credentials }, () => {})
    })
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
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <Button
        onPress={() => navigation.navigate('SignUp')}
        title="Submit"
      />
    </>
  );
}

export default SignIn;