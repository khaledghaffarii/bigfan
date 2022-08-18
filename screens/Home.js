import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  ActivityIndicator,
  propTypes,
  useCallback,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
  Dimensions,
  RefreshControl,
  Button,
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
// import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import IconsComment from 'react-native-vector-icons/MaterialCommunityIcons';
import IconsLike from 'react-native-vector-icons/AntDesign';
import IconsHeart from 'react-native-vector-icons/Ionicons';
import IconsSmile from 'react-native-vector-icons/AntDesign';
import baseURL from '../assets/common/baseUrl';
import AuthGlobal from '../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';
import HomeTheme from './HomeTheme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeDrops from './HomeDrops';
import HomeTrending from './HomeTrending';
import RocketsHome from './RocketsHome';
import ExperingHome from './ExperingHome';
import NewHome from './NewHome';

const Home = ({}) => {
  const navigation = useNavigation();
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [post, setPost] = useState([]);
  const [image, setImage] = useState([]);
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  async function fetchData() {
    await axios
      .get(`${baseURL}posts/home`)
      .then(res => {
        if (res.data) {
          const post = res.data;

          setPost(post);
        }

        // console.log(post);
        var user = post.map(function (posts) {
          //console.log( posts['user']);
          setImage(user);
        });
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false), callAPI());
  }, []);

  useEffect(() => {
    if (context.stateUser.user.userId) {
      AsyncStorage.getItem('jwt')
        .then(res => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: {Authorization: `Bearer ${res}`},
            })

            .then(user => setUserProfile(user.data));
        })
        .catch(error => console.log(error.response));
    }

    callAPI();
    return () => {};
  }, [context.stateUser.isAuthenticated]);
  //console.log(post)
  return (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        flex: 1,
        marginHorizontal: 1,
        width: windowWidth,
        height: '100%',
        backgroundColor: '#fff',
      }}>
      {/* header */}
      <View
        style={{
          width: windowWidth,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#1111',
          borderBottomWidth: 1,
          justifyContent: 'center',
          height: hp(9),
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            marginTop: 10,
            marginBottom: 0,
            width: 100,
            height: 40,
          }}
          source={require('../assets/logoHome.png')}
        />
      </View>

      {/* body */}
      {context.stateUser.isAuthenticated ? (
        <View
          style={{
            width: wp('100%'),
            flexDirection: 'row',
            alignContent: 'space-between',
            borderBottomColor: '#1111',
            margin: 10,
          }}>
          {userProfile ? (
            <Image
              source={{uri: userProfile.image}}
              style={{
                resizeMode: 'center',
                width: wp(13),
                height: hp(7),
                borderRadius: 300,
                margin: 6,
              }}
            />
          ) : (
            <Image
              source={require('../assets/profile.png')}
              style={{
                resizeMode: 'center',
                width: wp('40%'),
                height: 40,
                borderRadius: 300,
                margin: 6,
              }}
            />
          )}

          <TextInput
            //style={tw` android:w-72  text-gray-700 border-gray-300 border  rounded-xl py-2 px-4 mt-1 `}
            style={{
              width: wp('75%'),
              color: 'lightgray',
              borderColor: 'lightgray',
              borderRadius: 50,
              borderWidth: 1,
              height: hp(6),
              margin: 8,
            }}
            placeholder={"What's Up,,,?"}
          />
        </View>
      ) : null}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{height: hp(30), marginBottom: hp(10)}}>
          <HomeTheme />
        </View>

        <View>
          <HomeDrops />
        </View>
        <View>
          <HomeTrending />
        </View>
        <View>
          <RocketsHome />
        </View>
        <View>
          <ExperingHome />
        </View>
        <View>
          <NewHome />
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
                onPress={() => {
                  navigation.navigate('User_Details', {
                    User_id: posts.user.id,
                    postUserImage: posts.user.image,
                    postUserFirsName: posts.user.firstName,
                    postUserLastsName: posts.user.lastName,
                    postImage: posts.image,
                    text: posts.text,
                    video: posts.video,
                    country: posts.user.country,
                    phone: posts.user.phone,
                    email: posts.user.email,
                    
                  });
                }}
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={{uri: posts.user.image}}
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
                      postUserImage: posts.user.image,
                      postUserFirsName: posts.user.firstName,
                      postUserLastsName: posts.user.lastName,
                      postImage: posts.image,
                      text: posts.text,
                      video: posts.video,
                      country: posts.user.country,
                      phone: posts.user.phone,
                      email: posts.user.email,
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
        {/* <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={post.sort()}
        keyExtractor={item => item.id}
        style={{marginBottom: 10}}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 14,
              marginBottom: 24,
              margin: 8,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
            }}>
            <View style={{width: '100%', height: 250}}>
              <Image
                source={{uri: item.image}}
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
              style={{
                width: '100%',
                paddingHorizontal: 14,
                marginTop: -24,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={{uri: item.user.image}}
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
              </View>
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
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'InterSemiBold',
                    color: '#001F2D',
                  }}>
                  {item.text}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'InterRegular',
                    color: '#001F2D',
                  }}>
                  {item.user.firstName} {item.user.lastName}
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
        )}
      /> */}
      </ScrollView>
    </View>
  );
};

export default Home;
