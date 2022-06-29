import React, {useEffect, useContext, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import Error from '../../Context/store/Error';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import * as ImagePicker from 'react-native-image-picker';
import mime from 'mime';
const Register = props => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPassword] = useState('');
  const [confPasswordHash, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState(0);
  const [country, setCountry] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(['']);
  var {width} = Dimensions.get('window');
  setTimeout(() => {
    setError('');
  }, 9000);
  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const res = await fetch(`${baseURL}users`);
    //     // console.log(res);
    //     const user = await res.json();
    //     setUser(user);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // // async function callAPI() {
    // //   try {
    // //     await fetchData();
    // //   } catch (e) {
    // //     console.log(e);
    // //   }
    // // }
    // fetchData();
    // setImage(JSON.stringify('../../assets/profile.png'));
  }, []);
  //console.log('imageuser :' + image);
  function renderFileData() {
    if (image) {
      return <Image source={{uri: image}} style={styles.image} />;
    } else {
      return (
        <Image
          source={require('../../assets/profile.png')}
          style={styles.image}
        />
      );
    }
  }
  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response1 = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log('responseSource', JSON.stringify(source));

        if (response.assets[0].uri) {
          setImage(response.assets[0].uri);
        }
      }
    });
  };
  const launchImageLibrary = async () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: '',
      },
    };
    await ImagePicker.launchImageLibrary(options, response => {
      console.log('Response1 = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log('responseSource', JSON.stringify(source));

        if (response.assets[0].uri) {
          setImage(response.assets[0].uri);
        }
      }
    });
  };
  const Register = () => {
    const newImageUri = 'file:///' + image.split('file:/').join('');
    console.log('🚀 ~ file: Register.js ~ line 131 ~ Register ~ image', image);
    try {
      if (
        email === '' ||
        passwordHash === '' ||
        confPasswordHash === '' ||
        firstName === '' ||
        lastName === '' ||
        image === '' ||
        phone === '' ||
        country === ''
      ) {
        setError('Please fill in your credentials');
      } else {
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          passwordHash: passwordHash,
          confPasswordHash: confPasswordHash,
          phone: phone,
          country: country,
          image: {
            uri: JSON.stringify(newImageUri),
            type: mime.getType(newImageUri),
            name: newImageUri.split('/').pop(),
          },
        };

        fetch(`${baseURL}users/register`, {
          method: 'POST',
          cache: 'no-cache',
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          body: JSON.stringify(user),
        })
          .then(res => {
            if (res.status == 200) {
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: 'Registration Succeeded',
                text2: 'Please Login into your account',
              });
              setTimeout(() => {
                props.navigation.navigate('Login');
              }, 500);
            }
            res.json().then(user => {
              if (res.status !== 200) {
                setErrorStatus(res.statusText);
              }
              //console.log(response);
              //console.log('Success:', user);
            });
          })
          .catch(error => {
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: 'Something went wrong',
              text2: 'Please try again',
            });
            setTimeout(() => {
              props.navigation.navigate('Register');
            }, 5000);

            // console.log(error.statusText);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(errorStatus)
  return (
    <View style={tw`w-full h-full bg-white`}>
      <KeyboardAwareScrollView style={{width: width}}>
        <View style={tw`items-center m-12`}>
          <View style={styles.imageContainer}>
            {renderFileData()}
            <TouchableOpacity
              onPress={() => {
                launchCamera();
              }}
              style={styles.imagePicker}>
              <Icon style={{color: 'white'}} name="camera" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={tw`   w-80  text-gray-700 border-blue-500 border rounded-xl py-2 px-4  mb-8 mt-8   `}
            placeholder={'FirstName'}
            // onChangeText={(text) => setUsername(text)}
            autoCapitalize={'none'}
            name={'firstName'}
            id={'firstName'}
            onChangeText={text => setFirstName(text.toLowerCase())}
          />
          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border rounded-xl py-2 px-4  mb-8 mt-8   `}
            placeholder={'LastName'}
            // onChangeText={(text) => setLastName(text)}
            name={'lastName'}
            id={'lastName'}
            secureTextEntry={false}
            onChangeText={text => setLastName(text)}
          />
          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border rounded-xl py-2 px-4  mb-8 mt-8   `}
            placeholder={'Email'}
            // onChangeText={(text) => setEmail(text)}
            name={'email'}
            id={'email'}
            secureTextEntry={false}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border rounded-xl py-2 px-4  mb-8 mt-8   `}
            placeholder={'Phone'}
            // onChangeText={(text) => setPhone(text)}
            name={'phone'}
            id={'phone'}
            keyboardType={'numeric'}
            secureTextEntry={false}
            onChangeText={text => setPhone(text)}
          />
          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border  rounded-xl py-2 px-4  mb-8 mt-8   `}
            placeholder={'Country'}
            // onChangeText={(text) => setCountry(text)}
            name={'country'}
            id={'country'}
            secureTextEntry={false}
            onChangeText={text => setCountry(text)}
          />

          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border  rounded-xl py-2 px-4  mb-8 mt-8   `}
            placeholder={'Password'}
            // onChangeText={(text) => setPassword(text)}
            name={'password'}
            id={'password'}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />

          <TextInput
            style={tw`  w-80  text-gray-700 border-blue-500 border  rounded-xl py-2 px-4   mt-8   `}
            placeholder={'ConfirmPassword'}
            // onChangeText={(text) => setConfirmPassword(text)}
            name={'confirmPassword'}
            id={'confirmPassword'}
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
          />
        </View>
        {error ? <Error message={error} /> : null}
        <View style={tw`  h-full  rounded-full m-12  my-5 mb-12`}>
          <TouchableOpacity
            onPress={() => {
              Register();
            }}
            style={tw`bg-blue-500     py-2 px-4 rounded-lg items-center`}>
            <Text style={tw`text-white font-bold my-1 `}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
export default Register;
