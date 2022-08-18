import React, {useState, useRef, useContext, useEffect, propTypes} from 'react';
///import React, { Component } from 'react';
import Signature from 'react-native-canvas-signature';
import {View, Button, Image} from 'react-native';
import tw from 'tailwind-react-native-classnames';

import AuthGlobal from '../../Context/store/AuthGlobal';

const WhiteBoard = () => {
  const context = useContext(AuthGlobal);
  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const width = 400;
  const height = 250;
  const [confirm, setConfirm] = useState(false);
  const style = `.m-signature-pad--footer body html { width:${width}px, height:${height}px }`;
  const handleConfirm = () => {
    return setConfirm(true);
  };
  const clear = () => {
    ref.current?.clearSignature?.();
    setConfirm(false);
  };

  return (
    <View style={tw`mt-0 w-full  items-center `}>
      <View style={tw`mt-0 items-center `}>
        <Signature
          ref={ref}
          lineWidth={3}
          lineColor="black"
          canvasStyle={{
            marginBottom: 0,
            borderWidth: 2,
            borderColor: 'grey',
            height: 300,
            width:410
          }}
          webStyle={style}
          onChange={signature => setSignature(signature)}
          autoClear={true}
          imageType={'image/svg+xml'}
        />
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'space-between',
        }}>
        <Button title="Clear" onPress={() => clear()} />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
      {confirm ? (
        <Image
          resizeMode={'contain'}
          style={{width: 335, height: 114}}
          source={{uri: signature}}
        />
      ) : null} */}
    </View>
  );
};

export default WhiteBoard;
