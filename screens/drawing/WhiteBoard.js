import React, {useState, useRef, useContext, useEffect} from 'react';
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
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
//import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import AuthGlobal from '../../Context/store/AuthGlobal';

import Geolocation from '@react-native-community/geolocation';
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
  const handleConfirm = () => {
    // console.log('end');
    // const conf = ref.current.readSignature();
    // console.log(conf);
    return setConfirm(true);
  };
  const clear = () => {
    ref.current?.clearSignature?.()
     setConfirm(false);
  };
  const handleOK = signature => {
    console.log(signature);
    onOK(signature);
  };
  const getPosition = async () => {
    await Geolocation.getCurrentPosition(
      pos => {
        const initialPosition = JSON.stringify(pos);
        console.log(
          '🚀 ~ file: WhiteBoard.js ~ line 24 ~ getPosition ~ initialPosition',
          initialPosition,
        );

        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => setError(e.message),
    );
  };
  return (
    <View style={tw`bg-white h-full`}>
      <View>
        <View style={tw`mt-12 w-full  items-center`}>
          <Signature
            ref={ref}
            lineWidth={1}
            lineColor="black"
            canvasStyle={{
              width:400, 
              height:300,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: 'grey',
            }}
            onChange={signature => setSignature(signature)}
            autoClear={true}
            imageType={'image/svg+xml'}
          />
          <Button
            title="Clear"
            onPress={(() =>clear() )}
          />
          <Button title="Confirm" onPress={handleConfirm} />
          {confirm ? (
            <Image
              resizeMode={'contain'}
              style={{width: 335, height: 114}}
              source={{uri: signature}}
            />
          ) : null}
        </View>
        {/* <View>
          <Button title="Get Current Position" onPress={getPosition} />
          {error ? (
            <Text>Error retrieving current position</Text>
          ) : (
            <>
              <Text>Latitude: {position.latitude}</Text>
              <Text>Longitude: {position.longitude}</Text>
            </>
          )}
        </View> */}
      </View>
    </View>
  );
};

export default WhiteBoard;
