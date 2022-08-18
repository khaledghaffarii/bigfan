import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default function HomeDrops() {
  const data = [
    {
      id: 1,
      image: require('../assets/thems/cyborg.png'),
      title: 'CLONE X - X TAKASH..',
    },
    {id: 2, image: require('../assets/thems/bitcoyn.jpeg'), title: 'CRYPTO ...'},
    {id: 3, image: require('../assets/thems/c7.png'), title: 'NFT-FOOTBALL'},
    {
      id: 4,
      image: require('../assets/thems/robo.png'),
      title: 'TO BE FREE...',
    },
    {
      id: 5,
      image: require('../assets/thems/grafity.jpg'),
      title: 'GRAFITY:...',
    },
    {id: 6, image: require('../assets/thems/mebbit.jpg'), title: 'Meebits'},
    {id: 7, image: require('../assets/thems/bear.png'), title: 'Rakkudos'},
    {id: 8, image: require('../assets/thems/toy.png'), title: 'Rakkudos'},
    {id: 9, image: require('../assets/thems/test.png'), title: 'Rakkudos'},
  ];
  return (
    <View>
        <View style={{margin:15}}>
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
               Notable Drops
              </Text>
        </View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
        style={{marginBottom: 10}}
        renderItem={({item}) => (
          <View style={{}}>
            <View
              style={{
                flexDirection: 'column',
                margin: 10,
                alignContent: 'center',
              }}>
              <Image
                source={item.image}
                style={{
                  resizeMode: 'center',
                  width: wp(45),
                  height: hp(25),
                  marginLeft: 14,
                  borderRadius: 10,
                  borderColor: 'lightgray',
                  borderWidth: 1,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'InterRegular',
                  color: '#001F2D',
                  textAlign: 'left',
                  width: wp(43),
                  margin: 15,
                  fontWeight: '*600',
                }}>
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
