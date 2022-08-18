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
  Modal,
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import ToggleSwitch from 'toggle-switch-react-native';
import AuthGlobal from '../../Context/store/AuthGlobal';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconsScreen from 'react-native-vector-icons/MaterialCommunityIcons';
// import {ScrollView} from 'react-native-gesture-handler';
const Display = props => {
  const [userId, setUserId] = useState(false);
  const context = useContext(AuthGlobal);
  // console.log(context.stateUser.user.userId);
  const [modalOpen, setModalOpen] = useState(false);
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
  console.log(userId);
  return (
    <View style={styles.container}>
      <ScrollView style={{margin: 1, width: '100%'}}>
        {/* <Card containerStyle={{padding: 0, width: '93%'}}>
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
            <View style={{width: '100%'}}>
              <VideoPlayer
                resizeMode={'center'}
                source={{
                  uri: uriVideo,
                }}
                controls={true}
                pictureInPicture={true}
                playWhenInactive={true}
                style={styles.backgroundVideo}
                autoplay={false}
                paused={false}
                repeat={true}
              />
            </View>
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
        </View> */}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 14,
            margin: wp(7.5),
            marginTop: wp(30),
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
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: wp(100),
              position: 'relative',
              right: -230,
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
          <View style={{width: '100%', height: 250}}>
            <Image
              source={{uri: uriImage}}
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
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 14,
              marginTop: -24,
              flexDirection: 'row',
            
            }}>
            <TouchableOpacity
            
              style={{
                flexDirection: 'row',
              }}>
              <VideoPlayer
                source={{
                  uri: uriVideo,
                }}
                autoplay={false}
                paused={false}
                repeat={true}
                resizeMode="cover"
                style={{
                  width: 80,
                  height: 80,
                  marginLeft: 14,
                  borderRadius: 200,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}
              />
            </TouchableOpacity>
            <IconsScreen    onPress={() => setModalOpen(true)} style={{position:'absolute',left:90,top:59 }} color='black' name="fullscreen" size={25} />
          </View>

          <Modal
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalOpen(!modalOpen);
            }}
            visible={modalOpen}
            animationType="fade"
            style={{
              borderWidth: 2,
              borderColor: 'red',
            }}>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              style={{...styles.modalToggle, ...styles.modalClose}}>
              <MaterialIcons name="close" size={24} />
              <Text>close</Text>
            </TouchableOpacity>

            <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
              <VideoPlayer
                resizeMode="cover"
                source={{
                  uri: uriVideo,
                }}
                controls={true}
                pictureInPicture={true}
                playWhenInactive={true}
                style={styles.backgroundVideo}
                paused={false}
                repeat={true}
              />
            </View>
          </Modal>

          <View style={{width: '100%', padding: 14}}>
            <TextInput
              numberOfLines={3}
              placeholder="what do you mean"
              onChangeText={text => setText(text)}
              // value={this.state.text}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'lightgray',
                margin: 10,
              }}
            />
            <View
              style={{
                marginTop: 14,
                width: wp(80),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  addPost();
                }}
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
                    fontWeight: 'bold',
                  }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    width: 300,
    height: 300,
    alignItems: 'center',
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: 200,
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
});
