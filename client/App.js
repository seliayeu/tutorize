import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './authContext'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home";
import { useContext, useEffect, useState } from 'react';
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Chat from "./screens/Chat";
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ConditionalNav = () => {
  const auth = useContext(AuthContext);
  console.log(auth)

  if (auth.user.token !== null) {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    )
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Sign In',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Sign Up',
          }}
        />
      </Stack.Navigator>
    )
  }
}

const App = () => {
  return (
    <AuthProvider>     
      <NavigationContainer>
        <ConditionalNav />
      </NavigationContainer>
    </AuthProvider>
  );
}

const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState({
    username: null,
    token: null,
    locationLat: null,
    locationLong: null
  })

  useEffect(() => {
    const tryGetUser = async  () => {
      try {
        const value = JSON.parse(await AsyncStorage.getItem('@user'))
        console.log(value)

        if (value !== null) {
          setUser({
            ...value
          })
        }
      } catch(e) {
        console.log(e)
      }
    }

    tryGetUser();

    // const timer = setTimeout(() => setShow(true), delay * 5000);

    // this will clear Timeout
    // when component unmount like in willComponentUnmount
    // and show will not change to true
    // return () => {
    //   clearTimeout(timer1);
    // };

  }, []);


  const login = (userObj) => (
    setUser({ ...userObj, locationLat: user.locationLat, locationLong: user.locationLong })
  );

  const logout = (userObj) => {
    setUser({ username: null, token:null, locationLat: user.locationLat, locationLong: user.locationLong })
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default App;