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
  FlatList,
  SafeAreaView,
  Pressable,
  ScrollView,
  Modal,
  Dimensions,
  Button,
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const LibraryDetails = props => {
  const image = props.route.params.image;
  const video = props.route.params.video;
  const text = props.route.params.text;
  const date = props.route.params.date;
  const visibility = props.route.params.visibility;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: windowWidth,
        height: windowHeight,
      }}>
      <View></View>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
     

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 14,
            margin: wp(7.5),
         
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
          <Image
            style={{
              resizeMode: 'contain',
              width: '90%',
              height: '60%',
              alignItems: 'center',
              borderColor: 'lightgray',
              borderWidth: 1,
            }}
            source={{
              uri: image,
            }}
          />
             {text ? (
          <View style={{width: windowWidth, marginLeft: 100, marginTop: 20}}>
            <Text style={{textAlign: 'left', fontWeight: '700', fontSize: 20}}>
              {text}
            </Text>
          </View>
        ) : null}
          <View>
            <TouchableOpacity
              style={{
                borderRadius: 24,
                backgroundColor: '#001F2D',
                marginTop:10,
                minWidth: 120,
                padding: 12,
              }}
              onPress={() => setModalOpen(true)}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'InterMedium',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                proof
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={modalOpen} animationType="slide">
          <TouchableOpacity
            onPress={() => setModalOpen(false)}
            style={{...styles.modalToggle, ...styles.modalClose}}>
            <MaterialIcons name="close" size={24} />
            <Text>close</Text>
          </TouchableOpacity>
          <Card containerStyle={{padding: 0}}>
            <VideoPlayer
              resizeMode="contain"
              source={{
                uri: video,
              }}
              controls={true}
              pictureInPicture={true}
              playWhenInactive={true}
              style={styles.backgroundVideo}
              paused={false}
              repeat={true}
            />
          </Card>
        </Modal>
      </View>
    </View>
  );
};

export default LibraryDetails;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: 370,
    height: 300,
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
