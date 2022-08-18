import React , {useContext}from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/users/Login';
import Register from '../screens/users/Register';
import UserProfile from '../screens/users/UserProfile';
import AuthGlobal from '../Context/store/AuthGlobal';
import WhiteBoard from '../screens/drawing/WhiteBoard';
import SplashScreen from '../screens/SplashScreen';
import LibraryDetails from '../screens/users/LibraryDetails';
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
        title:' '
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
      <Stack.Screen
        name="WhiteBoard"
        component={WhiteBoard}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      /> 
       <Stack.Screen
        name="LibraryDetails"
        component={LibraryDetails}
        options={{
          headerShown: true,  title:' '
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
