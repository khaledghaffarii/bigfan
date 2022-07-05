import React, {useEffect, useContext, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import Error from '../../Context/store/Error';

import AuthGlobal from '../../Context/store/AuthGlobal';
import {loginUser} from '../../Context/actions/Auth.actions';

const Login = ({navigation}) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  setTimeout(() => {
    setError('');
  }, 9000);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === '' || password === '') {
      setError('Please fill in your credentials');
    } else {
      loginUser(user, context.dispatch);
    }
  };
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
     return navigation.navigate('User Profile');
    }
  }, []);
  return (
    <ScrollView style={tw`bg-white`}>
      <View style={tw`mt-12  items-center`}>
        <Image
          style={{resizeMode: 'stretch', height: 150, width: 100}}
          source={require('../../assets/logo2.png')}
        />
      </View>
      <View style={tw`items-center`}>
        <TextInput
          style={tw`  w-80  text-gray-700 border-blue-500 border-b rounded py-3 px-4  mt-8   `}
          placeholder={'Email'}
          // onChangeText={(text) => setUsername(text)}
          autoCapitalize={'none'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={text => setEmail(text.toLowerCase())}
        />
        <TextInput
          style={tw`  w-80  text-gray-700 border-blue-500 border-b-2 rounded py-3 px-4 mb-12 mt-8   `}
          placeholder={'Password'}
          // onChangeText={(text) => setPassword(text)}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      {error ? <Error message={error} /> : null}
      <View style={tw`w-72  h-full  rounded-full m-12 my-5 `}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={tw`bg-blue-500     py-2 px-4 rounded-lg items-center`}>
          <Text style={tw`text-white font-bold my-1 `}>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={tw`text-blue-500 font-bold text-center mt-8 text-lg`}>
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border border-gray-300 mt-12`}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={tw` m-10  border border-blue-500 w-52   py-2  rounded-full  items-center`}>
          <Text style={tw`text-black font-bold text-base`}>
            Create a new account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
