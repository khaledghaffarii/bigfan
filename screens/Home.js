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
const Home = ({navigation}) => {
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
      style={{
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
          width: '100%',
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            marginTop: 45,
            marginBottom: 20,
            width: 100,
            height: 40,
          }}
          source={require('../assets/logoHome.png')}
        />
        {/* <TextInput
          style={tw`   w-60  text-gray-700 border-gray-300 border  rounded-xl py-2 px-4 mt-10 mb-8  `}
          placeholder={'Search'}
        />
        */}
        <View style={tw` mt-10 mr-2   rounded-xl w-12 items-center h-12`}>
          <Icons name="search1" size={30} style={tw` mt-2 `} />
        </View>
      </View>
      {/* body */}
      {context.stateUser.isAuthenticated ? (
        <View
          style={{
            width: windowWidth,
            flexDirection: 'row',
            alignContent: 'space-between',
            borderBottomColor: '#1111',
            marginLeft: 10,
          }}>
          {userProfile ? (
            <Image
              source={{uri: userProfile.image}}
              style={{
                resizeMode: 'center',
                width: 40,
                height: 40,
                borderRadius: 300,
                margin: 5,
              }}
            />
          ) : (
            <Image
              source={require('../assets/profile.png')}
              style={{
                resizeMode: 'center',
                width: 40,
                height: 40,
                borderRadius: 300,
                margin: 5,
              }}
            />
          )}

          <TextInput
            style={tw` w-80 text-gray-700 border-gray-300 border  rounded-xl py-2 px-4 mt-1 `}
            placeholder={"What's Up,,,?"}
          />
        </View>
      ) : null}

      {/* <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={post.sort()}
        keyExtractor={item => item.id}
        style={{marginBottom: 10}}
        renderItem={({item}) => (
          <View style={{backgroundColor: 'white', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'space-between',
                width: 300,
                height: 60,
                marginTop: 35,
              }}>
              <Image
                style={{
                  resizeMode: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 300,
                  marginLeft: -20,
                }}
                source={{uri: item.user.image}}
              />
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  {item.user.firstName} {item.user.lastName}
                </Text>
              </View>
            </View>
            <View style={{marginTop: -20}}>
              <Text
                style={{
                  fontWeight: 'smal',
                  fontSize: 10,
                  color: 'gray',
                  alignItems: 'center',
                  marginLeft: -90,
                }}>
                {item.datePosted}
              </Text>
            </View>
            <View style={{marginTop: 5, textAligne: 'left', width: '50%'}}>
              <Text
                style={{
                  fontWeight: 'smal',
                  fontSize: 17,
                  color: 'black',
                  alignItems: 'center',
                  marginLeft: -90,
                }}>
                {item.text}
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Card containerStyle={{width: 450}}>
                <Image
                  style={{
                    resizeMode: 'center',
                    marginLeft: 50,
                    width: 350,
                    height: 200,
                  }}
                  source={{
                    uri: item.image,
                  }}
                />
              </Card>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '80%',
                margin: 5,
              }}>
              <View style={{flexDirection: 'column'}}>
                <IconsLike
                  name="like2"
                  size={25}
                  style={tw` mt-2 text-blue-400`}
                />
                <View style={{flexDirection: 'row'}}>
                  <IconsLike
                    name="like1"
                    size={10}
                    style={tw` mt-2 text-blue-400`}
                  />
                  <IconsHeart
                    name="heart-circle-sharp"
                    size={10}
                    style={tw` mt-2 text-red-400`}
                  />
                  <IconsSmile
                    name="smile-circle"
                    size={10}
                    style={tw` mt-2 text-yellow-400 mr-1`}
                  />
                  <Text style={{marginTop: 8, fontSize: 8}}>
                    Fakhri,Mahmoud and 156 others
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <IconsComment
                  name="comment-outline"
                  size={25}
                  style={tw` mt-2 text-blue-400 `}
                />
                <Text style={{marginTop: 5, fontSize: 8}}>5 Comments</Text>
              </View>
            </View>
          </View>
        )}
      /> */}
      <FlatList
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
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,

                  borderColor:"lightgray",
                  borderWidth:1
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
                    borderColor:'lightgray',
                    borderWidth:1
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
      />
    </View>
  );
};

export default Home;
