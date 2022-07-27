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
  Button,
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
  const [test, setTest] = useState(false);
  const uriVideo = props.route.params.uriVideo;
  const uriImage = props.route.params.uriImage;
  const [isEnabled, setIsEnabled] = useState(false);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
  
    if (test) {
    
      props.navigation.navigate('WhiteBoard');
    }
    if (context.stateUser.isAuthenticated) {
      setUserId(context.stateUser.user.userId);
    } else {
      setUserId(null);
    }
  }, [test]);

  const toggleSwitchButton = () => {
    setIsEnabled(previousState => !previousState);
  };
  const addPost = () => {
    const post = {
      image: uriImage,
      video: uriVideo,
      visibility: isEnabled,
      user: userId,
    };
    axios
      .post(`http://51.38.98.98:3000/api/v1/posts`, post)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          setTimeout(() => {
            props.navigation.navigate('LibraryNavigator');
          }, 500);
        }
      })
      .catch(error => {
        console.log(error);
      });

    setTest(true);
    
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
          resizeMode={'cover'}
          style={{
            width: 400,
            height: 150,
            alignItems: 'center',
            marginLeft: 190,
          }}
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
            autoplay={false}
            paused={true}
          />
        </Card>
      ) : (
        <Card containerStyle={{padding: 0}}>
          <View>
            <Text>No Video</Text>
          </View>
        </Card>
      )}

      <View
        style={{
          marginTop: 70,
          width: 200,
          height: 50,
        }}>
        <Button
          onPress={() => {
            addPost();
          }}
          title="Send"
        />
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
