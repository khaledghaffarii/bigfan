import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  ActivityIndicator,
  propTypes,
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
const Home = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [post, setPost] = useState([]);
  const [image, setImage] = useState([]);
  useEffect(() => {
    //http://10.0.2.2:3001/user/register

    fetchData();

    return () => {
      post;
    };
  }, []);
  async function fetchData() {
    await axios
      .get(`http://51.38.98.98:3000/api/v1/posts`)
      .then(res => {
        if (res.data) {
          const post = res.data;
       
          setPost(post);
        }

        // console.log(post);
        var resultImage = post.map(function (posts) {
          // console.log( posts['image']);
          setImage(resultImage);
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
 
  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#fff',
      }}>
      {/* header */}
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          borderBottomColor: '#1111',
          borderBottomWidth: 1,
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            marginTop: 45,
            width: 100,
            height: 40,
          }}
          source={require('../assets/logoHome.png')}
        />
        <TextInput
          style={tw`   w-60  text-gray-700 border-gray-300 border  rounded-xl py-2 px-4 mt-10 mb-8  `}
          placeholder={'Search'}
        />
        <View
          style={tw` mt-10 ml-2  border border-gray-300 rounded-xl w-12 items-center h-12`}>
          <Icons name="search1" size={30} style={tw` mt-2 `} />
        </View>
      </View>
      {/* body */}
   
        <View style={tw` items-center `}>
          <FlatList
            data={post}
            keyExtractor={item => item.id}
            style={tw`w-full mb-36 `}
            renderItem={({item}) => (
              <View style={tw`items-center   bg-white `}>
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
                    source={require('../assets/profile.png')}
                  />
                  <View style={{marginTop: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 10,
                      }}>
                      Ghaffari Med Khaled
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
                <View style={{marginBottom: 10}}>
                  <Card containerStyle={{width: 350}}>
                    <Image
                      style={{
                        resizeMode: 'center',
                        marginLeft: 50,
                        width: 200,
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
                    margin: 16,
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <IconsLike
                      name="like2"
                      size={30}
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
                      size={30}
                      style={tw` mt-2 text-blue-400 `}
                    />
                    <Text style={{marginTop: 5, fontSize: 8}}>5 Comments</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
    </View>
  );
};

export default Home;
