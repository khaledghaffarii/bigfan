import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
export default function RocketsHome() {
  const data = [
    {
      id: 1,

      profileImage: require('../assets/trending_prof/mv3.png'),
      title: 'The MV3 Universe ',
      tags: '1007.99 %',
    },
    {
      id: 2,

      profileImage: require('../assets/trending_prof/grails.png'),
      title: 'Grails II Mint Pass ',
      tags: '  441.90 % ',
    },
    {
      id: 3,

      profileImage: require('../assets/trending_prof/vahria.png'),
      title: 'Vahria by Darien Brito ',
      tags: '566.259 % ',
    },
    {
      id: 4,

      profileImage: require('../assets/trending_prof/dickbus.jpg'),
      title: 'CryptoDickbutts OG',
      tags: '885.269 %',
    },
    {
      id: 44,

      profileImage: require('../assets/trending_prof/wgmis.jpg'),
      title: 'wgmis ',
      tags: '455.122 %',
    },
    {
      id: 5,

      profileImage: require('../assets/trending_prof/wonki.gif'),
      title: 'Wonky Stonks',
      tags: '666.959 %',
    },
    {
      id: 6,

      profileImage: require('../assets/trending_prof/vags.gif'),
      title: 'CryptoTitVags ',
      tags: '888.451 %',
    },
    {
      id: 7,

      profileImage: require('../assets/trending_prof/void.gif'),
      title: 'VOID - Visitors of Imma Degen ',
      tags: '555.262 % ',
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
          Recent Rockets
        </Text>
      </View>
      <ScrollView horizontal={true}>
        <FlatList
          contentContainerStyle={{alignSelf: 'flex-start'}}
          numColumns={data.length / 2}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          style={{marginBottom: 10}}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: 15,
                  width: wp(70),
                  height: hp(10),
                }}>
                <Image
                  source={item.profileImage}
                  style={{
                    width: wp(11.5),
                    height: hp(6),
                    
                    borderRadius: 310,
                    alignItems: 'center',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: hp(10),
                    width: wp(60),
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'InterRegular',
                      color: '#001F2D',
                      textAlign: 'left',
                      width: wp(65),
                      margin: 12,
                      fontWeight: '700',
                      textAlign: 'left',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'InterRegular',
                      color: 'green',
                      textAlign: 'left',
                      width: wp(65),
                      margin: 15,
                      marginTop: 0,
                      fontWeight: '600',
                      textAlign: 'left',
                    }}>
                    {item.tags}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
