import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import UserDetails from '../screens/UserDetails';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="User_Details"
        component={UserDetails}
        options={{
          headerShown: true,
          title:' '
        }}
      />

    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
