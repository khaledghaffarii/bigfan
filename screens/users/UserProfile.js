import React, {useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
//import { Container } from "native-base"
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import {logoutUser} from '../../Context/actions/Auth.actions';
import {useEffect} from 'react/cjs/react.development';

const UserProfile = ({navigation, props}) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        navigation.navigate('Login');
      }

      AsyncStorage.getItem('jwt')
        .then(res => {
          axios
            .get(
              `http://51.38.98.98:3000/api/v1/users/62b5a2213a71859aad39b271`,
              {
                headers: {Authorization: `Bearer ${res}`},
              },
            )

            .then(user => setUserProfile(user.data));
        })
        .catch(error => console.log(error));
      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated]),
  );
  console.log(context.stateUser.user.userId);
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/profile.png')}
        style={styles.image}
      /></View>
      <ScrollView contentContainerStyle={styles.subContainer}>
        {/* <Image
          resizeMode={'contain'}
          style={{width: 335, height: 150}}
          source={{uri: userProfile.image}}
        /> */}
        <Text style={{fontSize: 30}}>
          {userProfile
            ? userProfile.firstName + ' ' + userProfile.lastName
            : ''}
        </Text>
        <View style={{marginTop: 20}}>
          <Text style={{margin: 10}}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
          <Text style={{margin: 10}}>
            Phone: {userProfile ? userProfile.phone : ''}
          </Text>
        </View>
        <View style={{marginTop: 80}}>
          <Button
            title={'Sign Out'}
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  }, imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 10,margin:10,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
});

export default UserProfile;
