import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  ActivityIndicator,
  propTypes,useCallback
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
  const navigation = useNavigation();
  const [video, setvideo] = useState([]);
  const [image, setImage] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [library, setLibrary] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  
  
  useEffect(() => {
    //http://10.0.2.2:3001/user/register
  
    function fetchData() {
      axios
        .get(`http://51.38.98.98:3000/api/v1/posts`)
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
    return ()=>{
      forceUpdate()
    }
  }, []);
  //console.log('🚀 ~ file: LibraryUser.js ~ line 69 ~ library', library);

  return (
    <View style={tw`h-full bg-white`}>
      <View style={{}}>
        <FlatList
          data={library}
          numColumns={2}
          keyExtractor={item => item.id}
          style={tw`pl-4`}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('LibraryDetails', {
                  video: item.video,
                  image: item.image,
                })
              }
              style={tw`p-2 pl-6 pb-8 pt-4 bg-white m-2 w-40`}>
              <View
                style={{flexDirection: 'row', alignContent: 'space-between'}}>
                <View
                  style={{
                    padding: 0,
                    borderBottomWidth: 1,
                    borderColor: 'gray',
                  }}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      alignItems: 'center',
                      width: 100,
                      height: 80,
                      top: 0,
                      left: 30,
                      right: 0,
                      buttom: 0,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
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
    width: 200,
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
    width: 300,
    height: 300,
  },
});
