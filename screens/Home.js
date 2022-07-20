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
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
// import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Home = () => {
  // useEffect(() => {
  //   //http://10.0.2.2:3001/user/register
  //   function fetchData() {
  //     axios
  //       .get(`http://127.0.0.1:3000/api/v1/posts`)
  //       .then(res => {
  //         const post = res.data;
  //         console.log(post)
  //         setLibrary(post);
  //         var resultImage = post.map(function (posts) {
  //           return posts['image'];
  //         });
  //         var resultVideo = post.map(function (posts) {
  //           return posts['video'];
  //         });
  //         var resultVisibility = post.map(function (posts) {
  //           return posts['visibility'];
  //         });
  //         setvideo(resultVideo);
  //         setImage(resultImage);
  //         setVisibility(resultVisibility);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  //   async function callAPI() {
  //     try {
  //       await fetchData();
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   callAPI();
  // }, []);
  return (
    <View>
      <Text
        style={{
          alignItems: 'center',
          margin: 100,
          fontWeight: 'bold',
          fontSize: 40,
          width: 200,
        }}>
        hello home
      </Text>
    </View>
  );
};

export default Home;
