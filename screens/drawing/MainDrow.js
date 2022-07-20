import {
  ScrollViewComponent,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Modal,
  TouchableOpacity,
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
import {json} from 'stream/consumers';
const MainDrow = ({navigation}) => {
  const window = Dimensions.get('window');
  const [uriVideo, setUriVideo] = useState(null);
  const screen = Dimensions.get('screen');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const context = useContext(AuthGlobal);
  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const Camera = useRef(null);
  const [permissons, setPermissons] = useState(false);
  const [stop, setStop] = useState(false);
  const [recording, setRecording] = useState(true);
  const [start, setStart] = useState(true);
  const [test, setTest] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (test) {
      navigation.navigate('Display', {
        uriVideo: uriVideo,
        uriImage: signature,
      });
    }
    if (recording && Camera.current) {
      FetchRecord();
    }
    setTimeout(() => {
      setRecording(false);
    }, 9000);
  }, [uriVideo, signature, Camera.current]);

  async function FetchRecord() {
    try {
      const uri = await Camera.current.recordAsync();
      console.log(uri['uri'].substr('file://'.length));
      setUriVideo(uri['uri'].substr('file://'.length));
    } catch (error) {
      console.log(error);
    }
  }
  const Stop = async () => {
    await Camera.current.stopRecording();
    setTest(true);
    // if(test){
    //   ref.current?.clearSignature?.();
    //   setTest(false);
    // }
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
  //console.log(uriVideo);

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: 200,
            borderRadius: 30,
            marginTop:350
          }}
          onPress={() => setModalOpen(true)}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 20,
              margin: 10,
            }}>
            start
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalOpen} animationType="slide">
        <View>
          <View style={tw`mt-0 items-center `}>
            <Signature
              ref={ref}
              lineWidth={3}
              lineColor="black"
              canvasStyle={{
                marginBottom: 0,
                borderWidth: 2,
                borderColor: 'grey',
                height: 350,
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

                borderRadius: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 20,
                  margin: 10,
                }}>
                Finish
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
