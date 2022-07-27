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
  Dimensions,
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LibraryDetails = props => {
  const image = props.route.params.image;
  const video = props.route.params.video;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: windowWidth,
        height: windowHeight,
      }}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Card style={{borderWidth: 1}}>
          <Image
            style={{
              resizeMode: 'contain',
              width: windowWidth,
              height: 200,
              alignItems: 'center',
              marginLeft: 150,
            }}
            source={{
              uri: image,
            }}
          />
        </Card>
        <Card containerStyle={{padding: 12}}>
          <VideoPlayer
            resizeMode="contain"
            source={{
              uri: video,
            }}
            controls={true}
            pictureInPicture={true}
            playWhenInactive={true}
            style={styles.backgroundVideo}
            paused={true}
            repeat={true}
          />
        </Card>
      </View>
    </View>
  );
};

export default LibraryDetails;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: 500,
    height: 300,
  },
});
