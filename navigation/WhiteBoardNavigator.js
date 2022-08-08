import React, {useState, useRef, useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WhiteBoard from '../screens/drawing/WhiteBoard';
import AuthGlobal from '../Context/store/AuthGlobal';
import Login from '../screens/users/Login';
import UserProfile from '../screens/users/UserProfile';
import MainDrow from '../screens/drawing/MainDrow';

import Display from '../screens/drawing/Display';
import LibraryDetails from '../screens/users/LibraryDetails';
import Register from '../screens/users/Register';
import UserNavigator from './UserNavigator';
const Stack = createStackNavigator();

function MyStack({navigation}) {
  const context = useContext(AuthGlobal);

  return (
    <Stack.Navigator>
      {context.stateUser.isAuthenticated ? (
        <Stack.Screen
          name="WhiteBoard"
          component={MainDrow}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="User"
            component={UserNavigator}
            options={{
              headerShown: false,
            }}
          />
         
        </>
      )}

      <Stack.Screen
        name="Display"
        component={Display}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
      name="User Profile"
      component={UserProfile}
      options={{
        headerShown: false,
      }}
    /> */}
    </Stack.Navigator>
  );
}

export default function WhiteBoardNavigator() {
  return <MyStack />;
}
