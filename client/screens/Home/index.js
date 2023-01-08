import { Text, TouchableOpacity, Button, View, Pressable, TextInput, FlatList } from 'react-native';
import Modal from "react-native-modal";
import { Card } from 'react-native-paper';
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
    navigation.navigate('SignUp', {props: {}})
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
      <Card onPress={() => setTeachModalVisible(true)} title="Teach"
        style={{backgroundColor: "#1483b2", marginHorizontal: "2%", marginTop: "2%", borderRadius: "7pt"}}
      >
        <Card.Title title="TEACH" style={{ paddingTop: "10%" }} titleStyle={{ fontWeight: "bold", color: "white", fontSize: "10pt"}} />
      </Card>
      <Card onPress={() => setLearnModalVisible(true)} title="Learn"
        style={{backgroundColor: "#Bd62c3", margin: "2%", borderRadius: "7pt", marginBottom: "0"}}
      >
        <Card.Title title="LEARN" titleStyle={{ fontWeight: "bold", color: "white", fontSize: "10pt"}} style={{ paddingTop: "10%"}} />
      </Card>
      <Modal
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          margin:0
        }}
        // animationType="slide"
        transparent={true}
        visible={teachModalVisible}
        backdropOpacity={0.6}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
          margin: 20,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>
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
        </View>
      </Modal>
      <Modal
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          margin:0
        }}
        // animationType="slide"
        transparent={true}
        visible={learnModalVisible}
        backdropOpacity={0.6}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
          margin: 20,
          backgroundColor: "white",
          borderRadius: 10,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>
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

          <Pressable
            onPress={() => setLearnModalVisible(!learnModalVisible)}
          >
            <Text>Hide Modal</Text>
          </Pressable>

          <Text>learn</Text>
          <FlatList
            data={tutorList}
            renderItem={({item}) => <Pressable onPress={startChat(item)}><Text>{item}</Text></Pressable>}
          />
        </View>
      </Modal>
    </View>

  );
}

export default Home;