import React, {useContext} from 'react';
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
} from 'react-native';

// Stacks
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import WhiteBoardNavigator from './WhiteBoardNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';
import LibraryUser from '../screens/users/LibraryUser';
const Tab = createBottomTabNavigator();
const Main = () => {
  const context = useContext(AuthGlobal);
  console.log(context.stateUser.isAuthenticated);
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
        {/* {context.stateUser.isAuthenticated ? (
          ) : null} */}
          <Tab.Screen
            name="Library"
            component={LibraryUser}
            options={{
              headerShown: true,
              title: 'Library',
              tabBarIcon: ({color}) => (
                <Icons name="photo-library" color={color} size={30} />
              ),
            }}
          />

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
      </Tab.Navigator>
    </>
  );
};

export default Main;
