import {
  ScrollViewComponent,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useContext, useEffect, propTypes} from 'react';
import WhiteBoard from './WhiteBoard';
import tw from 'tailwind-react-native-classnames';
//import RecordCamera from './RecordCamera';
import Signature from 'react-native-canvas-signature';
import Location from './Location';
import {ScrollView} from 'react-native-gesture-handler';
import AuthGlobal from '../../Context/store/AuthGlobal';
import {RNCamera} from 'react-native-camera';
const MainDrow = ({navigation}) => {
  const [uriVideo, setUriVideo] = useState(['']);

  const context = useContext(AuthGlobal);
  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const Camera = useRef(null);
  const [permissons, setPermissons] = useState(false);
  const [stop, setStop] = useState(false);
  const [recording, setRecording] = useState(false);
  useEffect(() => {
    if (recording && Camera.current) {
      FetchRecord();
    }
    setTimeout(() => {
      setRecording(true);
    }, 10);
  }, [Camera.current]);

  async function FetchRecord() {
    try {
      const uri = await Camera.current.recordAsync();
      setUriVideo(uri);
    } catch (error) {
      console.log(error);
    }
  }
  const Stop = async () => {
    setRecording(false);
    await Camera.current.stopRecording();
    navigation.navigate('display', {
      uriVideo: uriVideo,
      uriImage: signature,
    });
    ref.current?.clearSignature?.();
    // ref.current.removeEventListener()
  };
  const RenderCam = () => {
    return (
      <RNCamera
        ref={Camera}
        style={styles.preview}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
      />
    );
  };
  //console.log(uriVideo.uri)

  return (
    <View style={tw` bg-white h-full w-full`}>
      <View style={tw`mt-0   items-center `}>
        <Signature
          onClick={() => FetchRecord()}
          ref={ref}
          lineWidth={3}
          lineColor="black"
          canvasStyle={{
            marginBottom: 0,
            borderWidth: 2,
            borderColor: 'grey',
            height: 300,
            width: 410,
          }}
          onChange={signature => setSignature(signature)}
          autoClear={true}
          imageType={'image/svg+xml'}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        {/* {Camera.current ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          RenderCam()
        )} */}
        {RenderCam()}
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 70,
        }}>
        <Pressable
          onPress={() => Stop()}
          style={{
            height: 50,
            backgroundColor: 'red',

            borderRadius: 100,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 20,
              margin: 10,
            }}>
            RC
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
{
  /* <ScrollView>
  <RecordCamera /> 
   <Location />
</ScrollView> */
}

export default MainDrow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  preview: {
    marginTop: 42,
    width: 250,
    height: 250,
  },
});
