/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Context API
import Auth from './Context/store/Auth';

import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Main from './navigation/Main';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Main />
        <Toast />
      </NavigationContainer>
    </Auth>
  );
}
