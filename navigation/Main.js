import React, {useContext, useState, useCallback, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// Stacks
import baseURL from '../assets/common/baseUrl';
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import WhiteBoardNavigator from './WhiteBoardNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';
import LibraryUser from '../screens/users/LibraryUser';
import LibraryNavigator from './LIbraryNvigator';
import axios from 'axios';
const Tab = createBottomTabNavigator();
const Main = () => {
  const context = useContext(AuthGlobal);
  console.log(context.stateUser.isAuthenticated);
  const [userProfile, setUserProfile] = useState('');
  useEffect(() => {
    if (context.stateUser.user.userId) {
      axios
        .get(`${baseURL}users/${context.stateUser.user.userId}`)
        .then(user => setUserProfile(user.data));
    }
  }, [context.stateUser.user.userId]);
  //console.log(context.stateUser.user.userId);
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          keyboardHidesTabBar: false,
          showLabel: false,

          tabBarActiveTintColor: 'tomato',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: false,
        }}>
        <Tab.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={30} />
            ),
          }}
        />
        
        <Tab.Screen
          name="WhiteBoardNavigator"
          component={WhiteBoardNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <Icons name="library-add" color={color} size={30} />
            ),
          }}
        />
     
        {context.stateUser.isAuthenticated  ? (
          <Tab.Screen
            name="User"
            component={UserNavigator}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <View>
                  <Image
                    source={{uri: userProfile.image}}
                    style={{
                      resizeMode: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 300,
                    }}
                  />
                </View>
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="User"
            component={UserNavigator}
            options={{
              headerShown: false,
              tabBarIcon: ({color}) => (
                <Icon name="user" color={color} size={30} />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </>
  );
};

export default Main;
