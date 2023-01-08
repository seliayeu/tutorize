import { Text, Modal, Button, View, Pressable, TextInput, FlatList } from 'react-native';
import { useState } from "react";
import { Formik } from 'formik';

const ListingModal = (props) => {
  const [ tutorList, setTutorList ] = useState([])

  const handleFindTutors = (values) => {
    setLearnModalVisible(false)
    props.navigation.navigate("Chat") 
  }

  console.log(props)
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <Pressable
        onPress={() => props.setModalVisible(!props.modalVisible)}
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
  )
}

export default ListingModal;