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
  Separator,
  ScrollView,
} from 'react-native';
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  propTypes,
  useCallback,
} from 'react';
import WhiteBoard from './WhiteBoard';
import tw from 'tailwind-react-native-classnames';
//import RecordCamera from './RecordCamera';
import Signature from 'react-native-canvas-signature';
import Location from './Location';
//import {ScrollView} from 'react-native-gesture-handler';
import AuthGlobal from '../../Context/store/AuthGlobal';
import {RNCamera} from 'react-native-camera';
import {json} from 'stream/consumers';
import SignaturePad from 'react-native-signature-pad-v2';
import {useFocusEffect} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
  const [loading, setLoading] = useState(true);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    if (test) {
      forceUpdate();
      setStart(true);
      navigation.navigate('Display', {
        uriVideo: uriVideo,
        uriImage: signature,
      });
    }

    return () => {
      setTest(false);
    };
  }, [uriVideo, signature]);

  async function FetchRecord() {
    setStart(false);
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
  const SignaturePadError = error => {
    console.error(error);
  };

  const SignaturePadChange = ({base64DataUrl}) => {
    console.log('Got new signature: ' + base64DataUrl);
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

  return (
    <View
      style={{flexDirection: 'column' ,flex:1}}>
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: '#fff',
        }}>
        <View>
          {!start ? (
            <View
              style={{
                height: hp('40%'),
                width: wp('100%'),
                marginBottom: 0,
                borderWidth: 2,
                borderColor: 'black',
                flexDirection: 'column',
                backgroundColor: 'gray',
                opacity: 0.1,
              }}>
              <SignaturePad
                ref={ref}
                onError={SignaturePadError}
                onChange={signature => setSignature(signature.base64DataUrl)}
                style={{borderColor: 'black'}}
              />
            </View>
          ) : null}

          <View
            style={{
              alignItems: 'center',
            }}>
            {start ? (
              <View
                style={{
                  width: 200,
                  height: 50,
                  borderRadius: 30,
                  marginTop: 300,
                }}>
                <Button onPress={FetchRecord} title="start" />
              </View>
            ) : null}
          </View>
          <ScrollView>
            <View
              style={{
                alignItems: 'center',
                width: windowWidth,
                height: windowHeight,
                marginTop: 30,
                opacity: start ? 0 : 1,
              }}>
              {RenderCam()}
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 30,
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
          </ScrollView>
        </View>
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
    margin: 15,
    width: 250,
    height: 250,
  },
});
