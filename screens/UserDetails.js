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
import baseURL from '../assets/common/baseUrl';

//import AuthGlobal from '../../Context/store/AuthGlobal';
import {logoutUser} from '../Context/actions/Auth.actions';
import {useEffect} from 'react/cjs/react.development';
import IconsLogout from 'react-native-vector-icons/MaterialIcons';
//import LibraryUser from './LibraryUser';
import {FlatList} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RocketsHome from './RocketsHome';
export default function UserDetails(props) {
  const User_id = props.route.params.User_id;
  const postUserFirsName = props.route.params.postUserFirsName;
  const postUserLastsName = props.route.params.postUserLastsName;

  const country = props.route.params.country;

  const profileImage = props.route.params.postUserImage;

  console.log("🚀 ~ file: UserDetails.js ~ line 35 ~ UserDetails ~ User_id", User_id)
  const [post, setPost] = useState([]);
 useEffect(() => {
    async function fetchData() {
        await axios
          .get(`${baseURL}posts/${User_id}`)
          .then(res => {
            if (res.data) {
              const post = res.data;
              console.log("🚀 ~ file: UserDetails.js ~ line 44 ~ fetchData ~ post", post)
    
              setPost(post);
            }
    
           
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
      callAPI() 
 }, [])
 console.log(post)
  return (
    <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
         <View style={styles.headerContainer}>
        <View style={styles.headerColumn}>
          {profileImage ? (
            <View style={styles.imageContainer}>
              <Image source={{uri: profileImage}} style={styles.image} />
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.image}
              />
            </View>
          )}
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: wp(65)}}>
            <Text style={styles.userNameText}>
              {postUserFirsName + ' ' + postUserLastsName}
            </Text>
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
              <Text style={styles.userCityText}>{country ? country : ''}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.separator} />
        </View>
       
      </View>
      <View>
          <RocketsHome />
        </View>
      {Object.values(post).map((posts, i) => (
          <View
            key={i}
            style={{
              backgroundColor: 'white',
              borderRadius: 14,
              margin: wp(7.5),

              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
              width: wp(85),
              alignItems: 'center',
            }}>
            <View style={{width: '100%', height: 250}}>
              <Image
                source={{uri: posts.image}}
                resizeMode={'cover'}
                style={{
                  resizeMode: 'center',
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,

                  borderColor: 'lightgray',
                  borderWidth: 1,
                }}
              />
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 24,
                  backgroundColor: 'white',
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                  right: 10,
                  top: 10,
                }}>
                <Image
                  source={require('../assets/heart.png')}
                  resizeMethod="scale"
                  style={{width: 25, height: 25}}
                />
              </TouchableOpacity>
            </View>
            <View
              key={i}
              style={{
                width: '100%',
                paddingHorizontal: 14,
                marginTop: -24,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
              
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={{uri:profileImage}}
                  resizeMode="contain"
                  style={{
                    width: 60,
                    height: 60,
                    marginLeft: 14,
                    borderRadius: 300,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 1,
                  maxWidth: '50%',
                  shadowColor: 'black',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'InterRegular',
                    color: '#001F2D',
                  }}>
                  Ending in
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'InterBold',
                    color: '#001F2D',
                  }}>
                  12 days
                </Text>
              </View>
            </View>
            <View style={{width: '100%', padding: 14}}>
              <View style={{}} key={i}>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'InterSemiBold',
                    color: '#001F2D',
                  }}>
                  {posts.text}
                </Text>

                <Text
                  onPress={() => {
                    navigation.navigate('User_Details', {
                      User_id: posts.user.id,
                    });
                  }}
                  style={{
                    fontSize: 14,
                    fontFamily: 'InterRegular',
                    color: '#001F2D',
                    fontWeight: 'bold',
                  }}>
                  {posts.user.firstName} {posts.user.lastName}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'InterRegular',
                    color: 'gray',
                  }}>
                  {posts.datePosted.slice(0, 10)} -{' '}
                  {posts.datePosted.slice(11, 19)}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 14,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../assets/eth.png')}
                    resizeMode="contain"
                    style={{width: 20, height: 20, marginRight: 2}}
                  />

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'InterMedium',
                      color: '#001F2D',
                    }}>
                    20.25
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 24,
                    backgroundColor: '#001F2D',

                    minWidth: 120,
                    padding: 12,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'InterMedium',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Place a bid
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

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
    flexDirection: 'row',margin:8
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
    width: 200,
    marginRight: -150,
  },
  modalClose: {
    marginBottom: 0,
  },
});
