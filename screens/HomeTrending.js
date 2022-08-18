import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
export default function HomeTrending() {
  const data = [
    {
      id: 1,
      bacgroungImage: require('../assets/trending_back/moto.png'),
      profileImage: require('../assets/trending_prof/mv3.png'),
      title: 'The MV3 Universe ',
      tags: 'MV3HQ',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
    {
      id: 2,
      bacgroungImage: require('../assets/trending_back/grails.png'),
      profileImage: require('../assets/trending_prof/grails.png'),
      title: 'Grails II Mint Pass ',
      tags: '  PROOF_XYZ',
    },
    {
      id: 3,
      bacgroungImage: require('../assets/trending_back/variha.png'),
      profileImage: require('../assets/trending_prof/vahria.png'),
      title: 'Vahria by Darien Brito ',
      tags: 'ArtBlocks_Admin ',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
    {
      id: 4,
      bacgroungImage: require('../assets/trending_back/dickbuts.jpg'),
      profileImage: require('../assets/trending_prof/dickbus.jpg'),
      title: 'CryptoDickbutts OG',
      tags: '0x6c',
    },
    {
      id: 44,
      bacgroungImage: require('../assets/trending_back/wgmis.gif'),
      profileImage: require('../assets/trending_prof/wgmis.jpg'),
      title: 'wgmis ',
      tags: 'BACF3E',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
    {
      id: 5,
      bacgroungImage: require('../assets/trending_back/wonky.png'),
      profileImage: require('../assets/trending_prof/wonki.gif'),
      title: 'Wonky Stonks',
      tags: 'LedgArt_io',
    },
    {
      id: 6,
      bacgroungImage: require('../assets/trending_back/vags.png'),
      profileImage: require('../assets/trending_prof/vags.gif'),
      title: 'CryptoTitVags ',
      tags: 'cryptotitvags',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
    {
      id: 7,
      bacgroungImage: require('../assets/trending_back/void.jpg'),
      profileImage: require('../assets/trending_prof/void.gif'),
      title: 'VOID - Visitors of Imma Degen ',
      tags: 'IMMAVERSEContract ',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
  ];
  return (
    <View>
      <View style={{margin: 15}}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'InterRegular',
            color: '#001F2D',
            textAlign: 'left',
            width: wp(60),
            margin: 15,
            fontWeight: '700',
          }}>
          Trending collection
        </Text>
      </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        style={{marginBottom: 10}}
        renderItem={({item}) => (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 14,
              marginBottom: 24,
              margin: 8,
              shadowColor: 'black',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
              elevation: 14,
            }}>
            <ImageBackground
              source={item.bacgroungImage}
              style={{
                flexDirection: 'column',
                margin: 10,
                width: wp(65),
                height: hp(12),
                alignContent: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  width: wp(65),
                  height: hp(23),
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={item.profileImage}
                  style={{
                    width: wp(15.5),
                    height: hp(7.9),

                    borderRadius: 310,

                    alignItems: 'center',
                  }}
                />
              </View>
            </ImageBackground>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                height: hp(15),
                width: wp(70),
                lineHeight: 40,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'InterRegular',
                  color: '#001F2D',
                  textAlign: 'left',
                  width: wp(70),
                  margin: 12,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                {item.title}
                <Text style={{}}>{item.icon} </Text>
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'InterRegular',
                  color: '#1E90ff',
                  textAlign: 'left',
                  width: wp(70),
                  margin: 15,
                  marginTop: 0,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {item.tags}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
