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
  ActivityIndicator,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useNavigation} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
const SplashScreen = ({}) => {
  const navigation = useNavigation();
  const navigationRef = createNavigationContainerRef();
  return (
    <View style={tw`h-full w-full bg-black`}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
   
        }}>
        <ActivityIndicator size="200%" color="#fff" />
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
