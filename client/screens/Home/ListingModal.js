import { useState } from "react";
import { Text, Modal, Button, View, Pressable, TextInput, FlatList } from 'react-native';
import { Formik } from 'formik';

const ListingModal = (props) => {
  const handleSubject = (values) => {
    console.log(values.subjects.split(" "))
  }
  console.log(props)
  props.setModalVisible(false)
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
      <Formik
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
        onPress={() => props.setModalVisible(!props.modalVisible)}
      >
        <Text>Hide Modal</Text>
      </Pressable>
    </Modal>
  )
}

export default ListingModal;