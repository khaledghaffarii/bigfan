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
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
const Display = props => {
  console.log(
    '🚀 ~ file: Display.js ~ line 5 ~ Display ~ video',
    JSON.stringify(props.route.params.uriVideo),
  );
  const uriVideo = props.route.params.uriVideo;
  const uriImage = props.route.params.uriImage;
  const [resUri, setResUri] = useState(0);
  const ref = useRef();
  const Camera = useRef(null);
  const navigation = useNavigation();
  useEffect(() => {
    async function fetchData() {
      try {
        for (let i = 0; i < uriVideo.length; i++) {
          const uri = uriVideo[i];
          // console.log(
          //   '🚀 ~ file: Display.js ~ line 27 ~ fetchData ~ uris',
          //   uri,
          // );
          setResUri(uri);
        }
      } catch (error) {}
    }
    // async function callAPI() {
    //   try {
    //     await fetchData();
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    fetchData();
    // setImage(JSON.stringify('../../assets/profile.png'));
  }, []);
  const RenderVideo = () => {
    return (
      <View>
        <VideoPlayer
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          resizeMode="cover"
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
          style={styles.backgroundVideo}
        />
      </View>
    );
  };

  // console.log(uriVideo.uri.substr('file://'.length));
  // console.log(uriVideo);
  return (
    <View style={styles.container}>
      <Card containerStyle={{padding: 0}}>
        <Image
          resizeMode={'contain'}
          style={{width: 335, height: 150}}
          source={{uri: uriImage}}
        />
      </Card>
      {uriVideo.uri ? (
        <Card containerStyle={{padding: 0}}>
          <VideoPlayer
            resizeMode="contain"
            videoWidth={1600}
            videoHeight={900}
            source={{
              uri: uriVideo.uri.substr('file://'.length),
            }}
            controls={true}
            pictureInPicture={true}
            playWhenInactive={true}
            style={styles.backgroundVideo}
          />
        </Card>
      ) : (
        // <View style={styles.container}>
        //   <ActivityIndicator size="large" color="#00ff00" />
        // </View>
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
            navigation.navigate('Library', {
              uriVideo: uriVideo,
              uriImage: uriImage,
            });
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
