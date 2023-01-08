import { Text, Modal, Button, View, Pressable, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect, useContext, useReducer } from "react";
import { Formik } from 'formik';
import { addListing, findTutors } from "../../services/tutorService"
import { AuthContext } from '../../authContext';

import { getCurrentLocation } from '../../utils/geolocation';

const Home = ({ navigation }) => {
  const [ teachModalVisible, setTeachModalVisible ] = useState(false)
  const [ learnModalVisible, setLearnModalVisible ] = useState(false)
  const [ tutorList, setTutorList ] = useState([])
  const auth = useContext(AuthContext)

  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const loc = await getCurrentLocation();
      auth.login({ ...auth.user, locationLat: loc.coords.latitude, locationLong: loc.coords.longitude })
    }, 5 * 1000);

    return () => {
      clearTimeout(timer);
    };
  })

  const startChat = (username) => {
    // navigation.navigate('SignUp', {props: {}})
  }

  const handleListing = (values) => {
    values = values.subjects.split(" ")
    addListing({ token: auth.user.token, locationLat: auth.user.locationLat, locationLong: auth.user.locationLong, subjects: values })
    setTeachModalVisible(false)
  }

  const handleFindTutors = async (values) => {
    const tutors = await findTutors({ subject: values.subject })
    setTutorList(tutors.data.map(t => t.username))
    console.log(tutors)
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
            initialValues={{ 
              subjects: '',
            }}
          onSubmit={values => handleListing(values)}
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
          renderItem={({item}) => <Pressable onPress={startChat(item)}><Text>{item}</Text></Pressable>}
        />
      </Modal>
    </View>

  );
}

export default Home;