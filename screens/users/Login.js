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
  ActivityIndicator,
  Pressable,
} from 'react-native';

import tw from 'tailwind-react-native-classnames';
import Error from '../../Context/store/Error';
import {useTogglePasswordVisibility} from './hooks/useTogglePasswordVisibility';
import AuthGlobal from '../../Context/store/AuthGlobal';
import {loginUser} from '../../Context/actions/Auth.actions';
import MaterialCommunityIcons from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import {GoogleSignin, GoogleSigninButton} from 'react-native-login-google';
const Login = ({navigation}) => {
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    if (context.stateUser.isAuthenticated === true) {
      setIsLoading(false);
      return navigation.navigate('User Profile');
    }
  }, []);
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
  const sendGoogleToken = tokenId => {
    axios
      .post(`${baseURL}users/googlelogin`, {
        idToken: tokenId,
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
        //toast.error("⚠️ Google Login Error");
      });
  };
  const responseGoogle = response => {
    console.log('Google Login Response : ', response);
    sendGoogleToken();
  };
  // console.log(context.dispatch)
  return (
    <ScrollView style={tw`bg-white`}>
      <View style={tw`mt-24 mb-10  items-center`}>
        <Image
          style={{resizeMode: 'stretch', height: 70, width: 100}}
          source={require('../../assets/logoHome.png')}
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
          onChangeText={text => setEmail(text)}
        />
        <View>
          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border-b-2 rounded py-3 px-4 mb-12 mt-8   `}
            placeholder={'Password'}
            // onChangeText={(text) => setPassword(text)}
            name={'password'}
            id={'password'}
            secureTextEntry={passwordVisibility}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          {/* <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name="eye" size={22} color="#232323" />
        </Pressable> */}
        </View>
      </View>
      {/* {isLoading && <ActivityIndicator color={"#fff"} />} */}
      {error ? <Error message={error} /> : null}
      <View style={{alignItems: 'center', width: '100%'}}>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={tw`bg-blue-500 w-72    py-2 px-4 rounded-lg items-center`}>
          <Text style={tw`text-white font-bold my-1 `}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            margin: 10,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'space-around',
          }}>
          {/* <TouchableOpacity style={{  margin: 10,}} onPress={() => {sendGoogleToken()}}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../assets/icons8-google-48.png')}
            />
            
          </TouchableOpacity> */}
          {/* <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={responseGoogle()}
            //disabled={this.state.isSigninInProgress}
            webClientId={`${process.env.GOOGLE_CLIENT}`}
          /> */}
          <TouchableOpacity style={{margin: 10}} onPress={() => {}}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../../assets/icons8-facebook-48.png')}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={tw`text-blue-500 font-bold text-center mt-2 text-lg`}>
              Forget Password ?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`border border-gray-300 mt-12`}></View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={tw` border border-blue-500 w-52   py-2  rounded-full  items-center`}>
          <Text style={tw`text-black font-bold text-base`}>
            Create a new account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EEDC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    padding: 14,
    fontSize: 22,
    width: '90%',
  },
});
export default Login;
