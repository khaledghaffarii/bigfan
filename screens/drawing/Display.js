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
  SafeAreaView,
  Pressable,
  Switch,
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import AuthGlobal from '../../Context/store/AuthGlobal';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
const Display = props => {
  const [userId, setUserId] = useState(false);
  const context = useContext(AuthGlobal);
  // console.log(context.stateUser.user.userId);

  const [resUri, setResUri] = useState(0);
  const ref = useRef();
  const Camera = useRef(null);
  const navigation = useNavigation();

  const uriVideo = props.route.params.uriVideo;
  const uriImage = props.route.params.uriImage;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      setUserId(context.stateUser.user.userId);
    } else {
      setUserId(null);
    }
  }, []);

  const toggleSwitchButton = () => {
    setIsEnabled(previousState => !previousState);
  };
  const addPost = () => {
    const formData = new FormData();

    formData.append('image', uriImage);
    formData.append('video', uriVideo);
    formData.append('visibility', isEnabled);
    formData.append('user', userId);
    const post ={
      image: uriImage,
      video: uriVideo,
      visibility: isEnabled,
      user: userId,
    }
    axios.post(`http://127.0.0.1:3000/api/v1/posts`,post).then(res => {
        if (res.status == 200 || res.status == 201) {
          setTimeout(() => {
            props.navigation.navigate('Library');
          }, 500);
        }
      })
      .catch(error => {
        console.log(error);
      });
     // console.log(post)
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          marginLeft: 270,
          marginTop: 10,
          flexDirection: 'row',
          alignContent: 'space-around',
        }}>
        {isEnabled ? (
          <Text style={{margin: 5, fontWeight: 'bold'}}> Public</Text>
        ) : (
          <Text style={{margin: 5, fontWeight: 'bold'}}> Private</Text>
        )}
        <Switch
          onValueChange={toggleSwitchButton}
          value={isEnabled}
          ios_backgroundColor="red"
          trackColor={{false: 'red', true: 'green'}}
          thumbColor={isEnabled ? 'green' : 'red'}
        />
      </View>
      <Card containerStyle={{padding: 0}}>
        <Image
          resizeMode={'contain'}
          style={{width: 335, height: 150}}
          source={{uri: uriImage}}
        />
      </Card>
      {uriVideo ? (
        <Card containerStyle={{padding: 0}}>
          <VideoPlayer
            resizeMode="contain"
            videoWidth={1600}
            videoHeight={900}
            source={{
              uri: uriVideo,
            }}
            controls={true}
            pictureInPicture={true}
            playWhenInactive={true}
            style={styles.backgroundVideo}
          />
        </Card>
      ) : (
        <Card containerStyle={{padding: 0}}>
          <VideoPlayer
            source={{
              uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            resizeMode="cover"
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
            style={styles.backgroundVideo}
            controls={true}
          />
        </Card>
      )}

      <View
        style={{
          alignItems: 'center',
          marginTop: 70,
        }}>
        <Pressable
          onPress={() => {
            addPost();
          }}
          style={{
            height: 50,
            backgroundColor: 'green',
            width: '100%',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 20,
              margin: 10,
            }}>
            Save To Library
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',

    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'relative',

    width: 250,
    height: 300,
  },
});
