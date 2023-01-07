import { Text } from 'react-native';
import { useContext, useEffect, useReducer, useState } from 'react';

const Profile = () => {
  [ user, setUser ] = useState({displayName: "nimbathy"})

  return (
    <View>
      <Text>{user}</Text>
    </View>
  );
}

export default Profile;