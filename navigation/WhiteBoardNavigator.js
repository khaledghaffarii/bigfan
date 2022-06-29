import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WhiteBoard from '../screens/drawing/WhiteBoard';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WhiteBoard"
        component={WhiteBoard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function WhiteBoardNavigator() {
  return <MyStack />;
}
