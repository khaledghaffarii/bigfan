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

const LibraryUser = props => {
  const [uriVideo, setUriVideo] = useState(null);
  const [uriImage, setUriImage] = useState(null);

  useEffect(() => {
    if (props.route.params.uriVideo && props.route.params.uriImage) {
      setUriVideo(props.route.params.uriVideo);
      setUriImage(props.route.params.uriImage);
    }
  }, []);

  return (
    <View style={styles.container}>
      {props.route.params.uriVideo!=null && props.route.params.uriImage!=null ? (
        <Card containerStyle={{padding: 15}}>
          <Image
            resizeMode={'center'}
            style={{width: 100, height: 100}}
            source={{uri: uriImage}}
          />
        </Card>
      ) : (
        <View style={styles.container}>
          <Text>Empty lib </Text>
        </View>
      )}
    </View>
  );
};

export default LibraryUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column',

    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'relative',

    width: 250,
    height: 300,
  },
});
