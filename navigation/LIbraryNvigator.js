import React, {useState, useRef, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WhiteBoard from '../screens/drawing/WhiteBoard';
import AuthGlobal from '../Context/store/AuthGlobal';
import Login from '../screens/users/Login';
import UserProfile from '../screens/users/UserProfile';
import MainDrow from '../screens/drawing/MainDrow';

import Display from '../screens/drawing/Display';
import LibraryDetails from '../screens/users/LibraryDetails';
import LibraryUser from '../screens/users/LibraryUser';
const Stack = createStackNavigator();

function MyStack({navigation}) {
  const context = useContext(AuthGlobal);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={LibraryUser} />
      <Stack.Screen
        name="LibraryDetails"
        component={LibraryDetails}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default function LibraryNavigator() {
  return <MyStack />;
}
