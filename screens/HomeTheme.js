import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import Slick from 'react-native-slick';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const HomeTheme = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <View>
         <View style={{margin: 15}}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Roboto',
            color: '#001F2D',
            textAlign: 'left',
            width: wp(60),
            margin: 15,
            fontWeight: '700',
          }}>
       Thems
        </Text>
      </View>
      <ScrollView horizontal={true} style={styles.wrapper}>
        <ImageBackground
          style={styles.tinyLogo}
          source={require('../assets/thems/music.jpeg')}>
          <View style={styles.slide1}>
            <Text style={styles.text}>Music</Text>
          </View>
        </ImageBackground>
        <ImageBackground
          style={styles.tinyLogo}
          source={require('../assets/thems/sport.jpg')}>
          <View style={styles.slide2}>
            <Text style={styles.text}>Sport</Text>
          </View>
        </ImageBackground>
        <ImageBackground
          style={styles.tinyLogo}
          source={require('../assets/thems/art.jpg')}>
          <View style={styles.slide3}>
            <Text style={styles.text}>Art</Text>
          </View>
        </ImageBackground>
        <ImageBackground
          style={styles.tinyLogo}
          source={require('../assets/thems/Tomc1-2.jpg')}>
          <View style={styles.slide3}>
            <Text style={styles.text}>Technology</Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default HomeTheme;

const styles = StyleSheet.create({
  wrapper: {margin: 10},
  slide1: {
    justifyContent: 'flex-end',
    width: wp(45),
    height: hp(23),
  },
  slide2: {
    justifyContent: 'flex-end',
    width: wp(45),
    height: hp(23),
  },
  slide3: {
    justifyContent: 'flex-end',

    width: wp(45),
    height: hp(23),
  },
  tinyLogo: {
    resizeMode: 'center',
    width: wp(45),
    height: hp(25),
    marginLeft: 14,
  },
  text: {
    color: 'white',
    fontSize: 25,

    fontWeight: 'bold',
    justifyContent: 'center',
    backgroundColor: 'rgba(23, 6, 6, 0.25)',
  },
});
