import { useNavigation } from '@react-navigation/native';
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

const SplashScreen = (props) => {
    const navigation = useNavigation();
  return (
    <View>
      <View style={tw`mt-36 mb-24  items-center`}>
        <Image
          style={{resizeMode: 'stretch', height: 300, width: 150}}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={tw`items-center`}>
        <TouchableOpacity
          style={tw`bg-blue-500 w-48 flex  font-bold py-2 px-4 rounded items-center`}
          onPress={() =>
            navigation.navigate("Login")
          }>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;
