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
  TextInput,
  ScrollView,
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import AuthGlobal from '../../Context/store/AuthGlobal';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
// import {ScrollView} from 'react-native-gesture-handler';
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
  const [text, setText] = useState('hello');
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
      text: text,
    };
    axios
      .post(`${baseURL}posts`, post)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          setTimeout(() => {
            props.navigation.navigate('User');
          }, 500);
        }
      })
      .catch(error => {
        console.log(error);
      });
    setTimeout(() => {
      setTest(true);
    }, 100);

    //console.log(text);
  };
  //console.log(userId)
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
      <ScrollView style={{margin: 1, width: '100%'}}>
        <View
          style={{
            width: '100%',
          }}>
          <TextInput
            numberOfLines={5}
            placeholder="what do you mean"
            onChangeText={text => setText(text)}
            // value={this.state.text}
            style={{borderWidth: 1, borderColor: 'gray', margin: 10}}
          />
        </View>
        <Card containerStyle={{padding: 0, width: '93%'}}>
          <Image
            resizeMode={'center'}
            style={{
              width: '70%',
              height: 150,
              alignItems: 'center',
              marginLeft: 100,
            }}
            source={{uri: uriImage}}
          />
        </Card>
        {uriVideo ? (
          <Card containerStyle={{padding: 0}}>
            <VideoPlayer
              resizeMode="contain"
              source={{
                uri: uriVideo,
              }}
             // controls={true}
              pictureInPicture={true}
              playWhenInactive={true}
              style={styles.backgroundVideo}
              autoplay={false}
              paused={false}
              repeat={true}
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
            marginLeft: 100,
            marginTop: 20,
            width: '50%',
          }}>
          <Button
            onPress={() => {
              addPost();
            }}
            title="Send"
          />
        </View>
      </ScrollView>
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
    width: '100%',
    height: 300,
  },
});
