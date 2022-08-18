import React, {useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
//import { Container } from "native-base"
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import tw from 'tailwind-react-native-classnames';
import {Card, Icon} from 'react-native-elements';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import {logoutUser} from '../../Context/actions/Auth.actions';
import {useEffect} from 'react/cjs/react.development';
import IconsLogout from 'react-native-vector-icons/MaterialIcons';
import LibraryUser from './LibraryUser';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UserProfile = ({navigation, props}) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate('Login');
      }

      AsyncStorage.getItem('jwt')
        .then(res => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: {Authorization: `Bearer ${res}`},
            })

            .then(user => setUserProfile(user.data));
        })
        .catch(error => console.log(error.response));
      function fetchData() {
        axios
          .get(`${baseURL}posts/${context.stateUser.user.userId}`)
          .then(res => {
            const post = res.data;
            setLibrary(post);
          })
          .catch(error => {
            console.log(error);
          });
      }
      async function callAPI() {
        try {
          await fetchData();
        } catch (e) {
          console.log(e);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      callAPI();
      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated]),
  );
  if (userProfile) {
    console.log(userProfile.image);
  }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.headerContainer}>
        <View style={styles.headerColumn}>
          {userProfile ? (
            <View style={styles.imageContainer}>
              <Image source={{uri: userProfile.image}} style={styles.image} />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/profile.png')}
                style={styles.image}
              />
            </View>
          )}
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: wp(65)}}>
            <Text style={styles.userNameText}>
              {userProfile
                ? userProfile.firstName + ' ' + userProfile.lastName
                : ''}
            </Text>
            <IconsLogout
              name="logout"
              size={30}
              style={{}}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>

          <View style={styles.userAddressRow}>
            <View>
              <Icon
                name="place"
                underlayColor="transparent"
                iconStyle={styles.placeIcon}
                // onPress={this.onPressPlace}
              />
            </View>
            <View style={styles.userCityRow}>
              <Text style={styles.userCityText}>
                {userProfile ? userProfile.country : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.separator} />
        </View>
        {/* <View style={styles.containerTel}>
          <View style={styles.iconRow}>
            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={styles.telIcon}
            />
          </View>
          <View style={styles.telRow}>
            <View style={styles.telNumberColumn}>
              <Text style={styles.telNumberText}>
                {userProfile ? userProfile.phone : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerEmail}>
          <View style={styles.iconRow}>
            <Icon
              name="email"
              underlayColor="transparent"
              iconStyle={styles.emailIcon}
              //onPress={() => onPressEmail()}
            />
          </View>
          <View style={styles.emailRow}>
            <View style={styles.emailColumn}>
              <Text style={styles.emailText}>
                {userProfile ? userProfile.email : ''}
              </Text>
            </View>
          </View>
        </View> */}
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          <ActivityIndicator size="100%" color="#1E90FF" />
        </View>
      ) : (
        <FlatList
          scrollEnabled={true}
          data={library}
          numColumns={2}
          keyExtractor={item => item.id}
          style={tw`pl-4 pt-1 bg-white`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LibraryDetails', {
                  video: item.video,
                  image: item.image,
                  text: item.text,
                  date: item.datePosted,
                  visibility: item.visibility,
                })
              }
              style={tw`p-2 pl-6 pb-8 pt-4 bg-white m-2 w-40`}>
              <View
                style={{flexDirection: 'row', alignContent: 'space-between'}}>
                <View
                  style={{
                    padding: 0,
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    borderColor: 'lightgray',
                  }}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: 80,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
                {/* {item.visibility ? (
                <View style={{width: 15, marginTop: 12}}>
                  <Text
                    style={{
                      fontSize: 10,
                      borderRadius: 100,
                      fontWeight: 'bold',
                      backgroundColor: 'green',
                    }}>
                    .
                  </Text>
                </View>
              ) : (
                <View style={{width: 15, marginTop: 12}}>
                  <Text
                    style={{
                      fontSize: 10,
                      borderRadius: 100,
                      fontWeight: 'bold',
                      backgroundColor: 'red',
                    }}>
                    .
                  </Text>
                </View>
              )} */}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
              <Text style={{color: 'black', fontSize: 18, marginTop: 15}}>
                Are you sure you want to logout ?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: wp(60),
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={tw`text-blue-500 w-full font-bold text-center mt-8 text-lg`}>
                    No
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => [
                    AsyncStorage.removeItem('jwt'),
                    logoutUser(context.dispatch),
                  ]}>
                  <Text
                    style={tw`text-blue-500 w-full font-bold text-center mt-8 text-lg`}>
                    yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerEmail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: -40,
    marginLeft: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: '#FF7555',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    borderColor: '#D3D3D3',
    borderWidth: 0.3,
    flex: 8,
    flexDirection: 'row',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {backgroundColor: 'white'},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: '#1E90FF',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
    width: wp(65),
  },
  containerTel: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    margin: 10,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
    margin: 10,
  },

  telIcon: {
    color: 'green',
    fontSize: 30,
    margin: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F7F2F1',
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
    width: wp(39),
    marginRight: -150,
  },
  modalClose: {
    marginBottom: 0,
  },
});

export default UserProfile;
