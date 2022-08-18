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

export default function NewHome() {
  const data = [
    {
      id: 1,
      image: require('../assets/new/aws.jpg'),
      title: 'CLONE X - X...  ',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
    {
      id: 8,
      image: require('../assets/new/bitcoin.png'),
      title: 'Rakkudos',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },

    {
      id: 3,
      image: require('../assets/new/boo.jpg'),
      title: 'NFT-FOOTBALL ',
    },
    {
      id: 4,
      image: require('../assets/new/dbz.jpg'),
      title: 'TO BE FREE... ',
    },
    {
      id: 5,
      image: require('../assets/new/lacost.gif'),
      title: 'GRAFITY:... ',
    },
    {id: 6, image: require('../assets/new/lego.jpg'), title: 'Meebits'},
    {
      id: 7,
      image: require('../assets/new/mangas.jpg'),
      title: 'Rakkudos',
      icon: <Icon name="checkcircle" color={'#1E90ff'} size={10} />,
    },
    {
      id: 2,
      image: require('../assets/new/c17.png'),
      title: 'CRYPTO ... ',
    },
    {
      id: 9,
      image: require('../assets/new/lotus.png'),
      title: 'Rakkudos',
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
          New Top Sellers
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
                  width: wp(40),
                  margin: 15,
                  fontWeight: '800',
                }}>
                {item.title} <Text style={{}}>{item.icon} </Text>
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
