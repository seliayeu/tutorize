 import React from 'react';
 import { Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
 import * as Yup from 'yup'

 const signUpValidationSchema = Yup.object().shape({
   username: Yup
     .string()
     .email("Please enter a valid username")
     .required('Username is required'),
   password: Yup
     .string()
     .min(8, ({ min }) => `Password must be at least ${min} characters`)
     .required('Password is required'),
 })
  
const SignUp = () => {
  return (
    <>
      <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{ 
            username: '',
            password: '',
          }}
        onSubmit={values => console.log(values)}
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
    </>
  );
}

export default SignUp;