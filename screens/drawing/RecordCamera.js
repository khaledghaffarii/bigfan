// // import {StyleSheet, Text, View, Button} from 'react-native';
// // import React, {useEffect, useRef, useState} from 'react';
// // import VideoRecorder from 'react-native-beautiful-video-recorder';
// // import {
// //   Camera,
// //   CameraPermissionStatus,
// //   useCameraDevices,
// // } from 'react-native-vision-camera';
// // const RecordCamera = () => {

// //   const cameraRef = useRef(null);
// //   const devices = useCameraDevices('wide-angle-camera');
// //   const device = devices.back;
// //   const videoRecord = async () => {
// //     if (cameraRef && cameraRef.current) {
// //       cameraRef.current.open({maxLength: 30}, data => {
// //         console.log('captured data', data); // data.uri is the file path
// //       });
// //     }
// //   };
// //   useEffect(() => {
// //     // if (cameraRef && cameraRef.current) {
// //     //   cameraRef.current.open({maxLength: 30}, data => {
// //     //     console.log('captured data', data); // data.uri is the file path
// //     //   });
// //     // }
// //   }, []);

// //   return (
// //     <View>
// //       <Button onPress={() => videoRecord()} title="video" />
// //       <VideoRecorder
// //         ref={cameraRef}
// //         androidCameraPermissionOptions={{
// //           title: 'Permission to use camera',
// //           message: 'We need your permission to use your camera',
// //           buttonPositive: 'Ok',
// //           buttonNegative: 'Cancel',
// //         }}
// //         androidRecordAudioPermissionOptions={{
// //           title: 'Permission to use audio recording',
// //           message: 'We need your permission to use your audio',
// //           buttonPositive: 'Ok',
// //           buttonNegative: 'Cancel',
// //         }}
// //         onGoogleVisionBarcodesDetected={({barcodes}) => {
// //           console.log(barcodes);
// //         }}
// //       />
// //       {/* <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} /> */}
// //     </View>
// //   );
// // };

// // export default RecordCamera;

// // const styles = StyleSheet.create({});
// import React, {useEffect, useRef, useState} from 'react';
// import {StyleSheet, View, Text, Pressable} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// const RecordCamera = () => {
//   const [uri, setUri] = useState(null);
//   useEffect(() => {
//    // Submit();
//   }, []);

//   const camera = useRef(null);

//   const Submit = async () => {
//     if (camera) {
//       console.log(
//         '🚀 ~ file: RecordCamera.js ~ line 75 ~ Submit ~ camera',
//         camera,
//       );
//       const {uri, codec = 'mp4'} = await camera.current.recordAsync();
//       setUri(uri)
    
//     }
//   };
//   const Stop = () => {
//     camera.current.stopRecording();
//   };

//   const RenderCam = () => {
//     return (
//       <RNCamera
//         ref={camera}
//         style={styles.preview}
//         defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
//         type={RNCamera.Constants.Type.front}
//         flashMode={RNCamera.Constants.FlashMode.on}
//         androidCameraPermissionOptions={{
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}
//         androidRecordAudioPermissionOptions={{
//           title: 'Permission to use audio recording',
//           message: 'We need your permission to use your audio',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}
//         captureAudio={true}
//       />
//     );
//   };
//   console.info(uri);
//   return (
//     <View style={styles.container}>
//       <View style={{flexDirection: 'row'}}>
//         <View style={{width: '150%', height: 320}}>{RenderCam()}</View>
//       </View>

//       {/* <View style={{flexDirection: 'row', padding: 50, marginTop: 100}}>
//         <Pressable
//           onPress={Submit}
//           style={{
//             margin: 10,
//             height: 50,
//             backgroundColor: '#000',
//             width: '30%',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
//             Submit
//           </Text>
//         </Pressable>
//         <Pressable
//           onPress={Stop}
//           style={{
//             margin: 10,
//             height: 50,
//             backgroundColor: '#000',
//             width: '30%',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
//             Stop Rec
//           </Text>
//         </Pressable>
//       </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   preview: {
//     width: '100%',
//     height: 155,
//   },
// });

// export default RecordCamera;
