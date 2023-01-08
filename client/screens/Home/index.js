import { Text, Modal, Button, View, Pressable, TextInput, FlatList } from 'react-native';
import React, { useState } from "react";
 import { Formik } from 'formik';

const Home = ({ navigation }) => {
  const [ teachModalVisible, setTeachModalVisible ] = useState(false)
  const [ learnModalVisible, setLearnModalVisible ] = useState(false)
  const [ tutorList, setTutorList ] = useState([])

  console.log("aa")

  const handleSubject = (values) => {
    console.log(values.subjects.split(" "))
  }

  const handleFindTutors = (values) => {
    setLearnModalVisible(false)
    navigation.navigate("Chat") 
  }

  return (
    <View>
      <Button onPress={() => setTeachModalVisible(true)} title="Teach">teach</Button>
      <Button onPress={() => setLearnModalVisible(true)} title="Learn">learn</Button>
      <Modal
        animationType="slide"
        transparent={false}
        visible={teachModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Formik
            // validationSchema={signInValidationSchema}
            initialValues={{ 
              subjects: '',
            }}
          onSubmit={values => handleSubject(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('subjects')}
                onBlur={handleBlur('subjects')}
                value={values.subjects}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
        <Pressable
          onPress={() => setTeachModalVisible(!teachModalVisible)}
        >
          <Text>Hide Modal</Text>
        </Pressable>
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
        <Formik
            // validationSchema={signInValidationSchema}
            initialValues={{ 
              subject: '',
            }}
          onSubmit={values => handleFindTutors(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('subject')}
                onBlur={handleBlur('subject')}
                value={values.subject}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
        <Text>learn</Text>
        <FlatList
          data={tutorList}
          renderItem={({item}) => <Text>{item}</Text>}
        />
      </Modal>
    </View>

  );
}

export default Home;