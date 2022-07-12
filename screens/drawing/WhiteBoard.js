import React, {useState, useRef, useContext, useEffect, propTypes} from 'react';
///import React, { Component } from 'react';
import Signature from 'react-native-canvas-signature';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
//import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import AuthGlobal from '../../Context/store/AuthGlobal';

import {WebView} from 'react-native-webview';
import RecordCamera from './RecordCamera';
import Location from './Location';
import {ScrollView} from 'react-native-gesture-handler';
const WhiteBoard = ({navigation}) => {
  const context = useContext(AuthGlobal);
  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const [error, setError] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const cameraRef = useRef(null);
  const handleConfirm = () => {
    return setConfirm(true);
  };
  const clear = () => {
    ref.current?.clearSignature?.();
    setConfirm(false);
  };
  const handleOK = signature => {
    console.log(signature);
    onOK(signature);
  };

  return (
    <ScrollView style={tw`bg-white `}>
      <View>
        <View style={tw`mt-12 w-full  items-center`}>
          <Signature
            ref={ref}
            lineWidth={1}
            lineColor="black"
            canvasStyle={{
              marginBottom: 10,
              borderWidth: 1,
              borderColor: 'grey',
            }}
            onChange={signature => setSignature(signature)}
            autoClear={true}
            imageType={'image/svg+xml'}
          />
          <View style={{flexDirection:'row',margin:20,alignItems:'center',padding:20}}>
            <Button title="Clear" onPress={() => clear()} />
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
          {confirm ? (
            <Image
              resizeMode={'contain'}
              style={{width: 335, height: 114}}
              source={{uri: signature}}
            />
          ) : null}
        </View>
      </View>
      <RecordCamera />
      {/* <Location/> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',

    height: 500,
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
export default WhiteBoard;
