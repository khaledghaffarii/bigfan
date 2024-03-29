import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseUrl';
import {ToastAndroid} from 'react-native';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  fetch(`${baseURL}users/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem('jwt', token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch(error => {
      ToastAndroid.showWithGravity(
        error.toString().substr('SyntaxError: JSON Parse error: Unexpected identifier'.length),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );

      // dispatch(setCurrentUser(error))
      console.log((error.toString()));
      logoutUser(dispatch);
    });
};

export const getUserProfile = userId => {
  fetch(`${baseURL}users/${userId}`, {
    method: 'GET',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
  console
    .log('🚀 ~ file: Auth.actions.js ~ line 50 ~ getUserProfile ~ res', res)
    .then(data => console.log(data));
};

export const logoutUser = dispatch => {
  AsyncStorage.removeItem('jwt');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
