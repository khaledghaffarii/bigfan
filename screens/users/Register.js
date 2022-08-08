import React, {useEffect, useContext, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Picker,
  useColorScheme,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  ToastAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'tailwind-react-native-classnames';
import Error from '../../Context/store/Error';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import {launchCamera} from 'react-native-image-picker';
import mime from 'mime';
import * as ImagePicker from 'react-native-image-picker';
import IconsPhoto from 'react-native-vector-icons/MaterialIcons';
import Iconsgallery from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Register = props => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPassword] = useState('');
  const [confPasswordHash, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [typeImage, setTypeImage] = useState('');
  const [nameImage, setNameImage] = useState('');
  const [phone, setPhone] = useState(0);
  const [country, setCountry] = useState('');
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const [errorStatus, setErrorStatus] = useState(['']);
  var {width} = Dimensions.get('window');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedValue, setSelectedValue] = useState('java');
  const [errorData, setErrorData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
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
  // console.log('imageuser :' + image);
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
  const options = {
    title: 'select image',
    type: 'library',
    options: {
      skipBackup: true,
      path: 'image/jpg',
      maxWidth: 200,
      maxHeight: 200,
      //cropping: true,
    },
    includeBase64: true,
  };
  const openGallery = async () => {
    setModalVisible(!modalVisible)
    const image = await launchCamera(options);
    console.log(image);
    if (image.didCancel) {
      console.log('User cancelled image picker');
    } else if (image.error) {
      console.log('ImagePicker Error: ', image.error);
    } else if (image.customButton) {
      console.log('User tapped custom button: ', image.customButton);
      alert(image.customButton);
    } else {
      const source = {uri: 'base64,' + image.data};
      console.log('imageSource', JSON.stringify(source));

      if (image.assets[0].uri) {
        //console.log("🚀 ~ file: Register.js ~ line 112 ~ openGallery ~ image.assets[0]", image.assets[0])

        setImage(image.assets[0].uri);
      }
    }
  };

  // const launchCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'image/jpg',
  //       width: 300,
  //       height: 400,
  //       cropping: true,

  //     },
  //     includeBase64: true,
  //   };
  //   ImagePicker.launchCamera(options, response => {
  //     console.log('Response1 = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = response.assets[0].uri;
  //       console.log('responseSource', JSON.stringify(source));

  //       if (response.assets[0].uri) {
  //         setImage(response.assets[0].uri);
  //       }
  //     }
  //   });
  // };
  const launchImageLibrary = async () => {
    setModalVisible(!modalVisible)
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
        console.log(
          '🚀 ~ file: Register.js ~ line 123 ~ launchImageLibrary ~ response.assets[0].uri',
          response.assets[0].uri.base64,
        );
        console.log('responseSource', JSON.stringify(source.comource));

        if (response.assets[0].uri) {
          setImage(response.assets[0].uri);
        }
      }
    });
  };
  const Register = async () => {
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
        // const newImageUri = image.substr('file://'.length);
        // const formData = new FormData();

        // formData.append('image', {
        //   uri: newImageUri,
        // });
        // formData.append('firstName', firstName);
        // formData.append('lastName', lastName);
        // formData.append('email', email);
        // formData.append('passwordHash', passwordHash);
        // formData.append('confPasswordHash', confPasswordHash);
        // formData.append('phone', phone);
        // formData.append('country', country);
        const user = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          passwordHash: passwordHash,
          confPasswordHash: confPasswordHash,
          phone: phone,
          country: country,
          image: image,
        };
        //console.log(JSON.stringify(user));

        axios
          .post(`${baseURL}users/register`, user, {
            headers: {'Content-Type': 'application/json'},
          })
          .then(res => {
            if (res.status == 200) {
              ToastAndroid.showWithGravity(
                'email sent verify yor email Address and please confirm',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
              );
              setTimeout(() => {
                props.navigation.navigate('Login');
              }, 500);
            }
          })
          .catch(error => {
            ToastAndroid.showWithGravity(
              JSON.stringify(errorData),
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            );
            console.log(error.response.data);
            setErrorData(error.response.data);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(errorStatus)
  // await fetch(`${baseURL}users/register`, {
  //   method: 'post',
  //   headers: {'Content-Type': 'miltipart/from-data'},
  //   body: user,
  // })
  //   .then(res => {
  //     // console.log(
  //     //   '🚀 ~ file: Register.js ~ line 212 ~ Register ~ res',
  //     //   res,
  //     // );
  //     if (res.status == 200) {
  //       Toast.show({
  //         topOffset: 60,
  //         type: 'success',
  //         text1: 'Registration Succeeded',
  //         text2: 'Please Login into your account',
  //       });
  //       setTimeout(() => {
  //         props.navigation.navigate('Login');
  //       }, 500);
  //     }
  //     5;
  //   })
  //   .catch(error => {
  //     Toast.show({
  //       topOffset: 60,
  //       type: 'error',
  //       text1: 'Something went wrong',
  //       text2: 'Please try again',
  //     });
  //     console.log(error);
  //   });
  return (
    <View style={tw`w-full h-full bg-white`}>
      <KeyboardAwareScrollView style={{width: width}}>
        <View style={tw`items-center m-12`}>
          <View style={styles.imageContainer}>
            {renderFileData()}

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={styles.imagePicker}>
              <Icon style={{color: 'white'}} name="camera" />
            </TouchableOpacity>
          </View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{...styles.modalToggle, ...styles.modalClose}}>
                    <MaterialIcons name="close" size={24} />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      width: 200,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        width: 200,
                      }}>
                      <TouchableOpacity onPress={() => openGallery(true)}>
                        <Text
                          style={tw`text-blue-500 w-full font-bold text-center mt-8 text-lg`}>
                          Take Photo
                        </Text>
                      </TouchableOpacity>
                      <IconsPhoto
                        name="add-a-photo"
                        size={18}
                        style={tw` mt-10 text-blue-900 ml-5`}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity onPress={() => launchImageLibrary()}>
                        <Text
                          style={tw`text-blue-500 w-full font-bold text-center mt-8 text-lg`}>
                          Choose from Library
                        </Text>
                      </TouchableOpacity>
                      {/* <Iconsgallery
                        name="photo"
                        size={18}
                        style={tw` mt-10 text-red-500 ml-5`}
                      /> */}
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
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
        {errorData ? <Error message={errorData} /> : null}

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
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalToggle: {
    alignItems: 'flex-end',
    marginTop: -25,
    width: 200,
    marginRight: -60,
  },
  modalClose: {
    marginBottom: 0,
  },
});
export default Register;
