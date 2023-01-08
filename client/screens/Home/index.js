import { Text, Modal, Button, View, Pressable } from 'react-native';
import React, { useState } from "react";
 import { Formik } from 'formik';

const Home = () => {
  const [ teachModalVisible, setTeachModalVisible ] = useState(false)
  const [ learnModalVisible, setLearnModalVisible ] = useState(false)
  return (
    <View>
      <Button onPress={() => setTeachModalVisible(true)}>teach</Button>
      <Button onPress={() => setLearnModalVisible(true)}>learn</Button>
      <Modal
        animationType="slide"
        transparent={false}
        visible={teachModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setTeachModalVisible(!teachModalVisible)}
        >
          <Text>Hide Modal</Text>
        </Pressable>
        
        <Formik
            // validationSchema={signInValidationSchema}
            initialValues={{ 
              subject: '',
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

        <Text>bbbb</Text>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={learnModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setLearnModalVisible(!learnModalVisible)}
        >
          <Text>Hide Modal</Text>
        </Pressable>

        <Text>learn</Text>
      </Modal>
    </View>

  );
}

export default Home;