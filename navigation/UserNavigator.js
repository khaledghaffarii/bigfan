import React , {useContext}from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/users/Login';
import Register from '../screens/users/Register';
import UserProfile from '../screens/users/UserProfile';
import AuthGlobal from '../Context/store/AuthGlobal';
const Stack = createStackNavigator();
const MyStack = () =>{
  const context = useContext(AuthGlobal);
  return (
    <Stack.Navigator>
    {!context.stateUser.isAuthenticated ? (
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      ) :  <Stack.Screen
      name="User Profile"
      component={UserProfile}
      options={{
        headerShown: false,
      }}
    />}
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,

          title: 'Create a New Account',
        }}
      />
     
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
