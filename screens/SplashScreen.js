import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useNavigation} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
const SplashScreen = ({}) => {
  const navigation = useNavigation();
  const navigationRef = createNavigationContainerRef();
  return (
    <View style={tw`h-full w-full`}>
      <View style={tw`m-24 items-center bg-white`}>
        <Image
          style={{resizeMode: 'stretch', height: 500, width: 250}}
          source={require('../assets/logo2.png')}
        />
      </View>
      {/* <View style={tw`items-center`}>
        <TouchableOpacity
          style={tw`bg-blue-500 w-48 flex  font-bold py-2 px-4 rounded items-center`}
          onPress={() => {
            navigationRef.navigate('Login');
          }}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default SplashScreen;
