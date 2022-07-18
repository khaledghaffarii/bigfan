import React, {useState, useRef, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WhiteBoard from '../screens/drawing/WhiteBoard';
import AuthGlobal from '../Context/store/AuthGlobal';
import Login from '../screens/users/Login';
import UserProfile from '../screens/users/UserProfile';
import MainDrow from '../screens/drawing/MainDrow';

import Display from '../screens/drawing/Display';
const Stack = createStackNavigator();

function MyStack({navigation}) {
  const context = useContext(AuthGlobal);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WhiteBoard"
        component={MainDrow}
        options={{
          headerShown: false,
        }}
      />   
      <Stack.Screen
      name="display"
      component={Display}
      options={{
        headerShown: true,title: ' ',
      }}
    />
      {/* {context.stateUser.isAuthenticated ? (
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      )} */}
    </Stack.Navigator>
  );
}

export default function WhiteBoardNavigator() {
  return <MyStack />;
}
