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
} from 'react-native';
import {Card} from 'react-native-elements';
import VideoPlayer from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import tw from 'tailwind-react-native-classnames';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LibraryUser = props => {
  const [video, setvideo] = useState([]);
  const [image, setImage] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [library, setLibrary] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    //http://10.0.2.2:3001/user/register
    function fetchData() {
      axios
        .get(`http://127.0.0.1:3000/api/v1/posts`)
        .then(res => {
          const post = res.data;
          // console.log(post)
          setLibrary(post);
          var resultImage = post.map(function (posts) {
            return posts['image'];
          });
          var resultVideo = post.map(function (posts) {
            return posts['video'];
          });
          var resultVisibility = post.map(function (posts) {
            return posts['visibility'];
          });
          setvideo(resultVideo);
          setImage(resultImage);
          setVisibility(resultVisibility);
        })
        .catch(error => {
          console.log(error);
        });
    }
    async function callAPI() {
      try {
        await fetchData();
      } catch (e) {
        console.log(e);
      }
    }
    callAPI();
  }, [library]);
  //console.log('🚀 ~ file: LibraryUser.js ~ line 69 ~ library', library);

  return (
    <View style={tw`h-full bg-white`}>
      <View style={{marginLeft: -12, marginBottom: 90}}>
        <FlatList
          data={library}
          numColumns={2}
          keyExtractor={item => item.id}
          style={tw`pl-4`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={tw`p-2 pl-6 pb-8 pt-4 bg-white m-2 w-40`}>
              <View
                style={{flexDirection: 'row', alignContent: 'space-between'}}>
                <Card containerStyle={{padding: 0}}>
                  <Image
                    style={{
                      resizeMode: 'contain',

                      width: 96,
                      height: 96,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </Card>
                {item.visibility ? (
                  <View style={{width: 15, marginTop: 12}}>
                    <Text
                      style={{
                        fontSize: 10,
                        borderRadius: 100,
                        fontWeight: 'bold',
                        backgroundColor: 'green',
                      }}>
                      .
                    </Text>
                  </View>
                ) : (
                  <View style={{width: 15, marginTop: 12}}>
                    <Text
                      style={{
                        fontSize: 10,
                        borderRadius: 100,
                        fontWeight: 'bold',
                        backgroundColor: 'red',
                      }}>
                      .
                    </Text>
                  </View>
                )}
              </View>
              <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => setModalOpen(false)}
                    style={{...styles.modalToggle, ...styles.modalClose}}>
                    <MaterialIcons name="close" size={24} />
                    <Text>close</Text>
                  </TouchableOpacity>
                  <Card containerStyle={{padding: 0,alignItems:'center'}}>
                    <Image
                      style={{
                        resizeMode: 'contain',
                        alignContent: 'center',
                        width: 150,
                        height: 150,animationType:"pulse"
                      }}
                      source={{
                        uri: item.image,
                      }}
                    />
                  </Card>
                  <Card containerStyle={{padding: 0,alignItems:'center'}}>
                    <VideoPlayer
                     controls={true}
                      resizeMode="contain"
                      source={{
                        uri: item.video,
                      }}
                      pictureInPicture={true}
                      playWhenInactive={true}
                      style={{
                        position: 'relative',
                        width: 250,
                        height: 300,
                      }}
                    />
                  </Card>
                </View>
              </Modal>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default LibraryUser;
const styles = StyleSheet.create({
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
    width: 200
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
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
