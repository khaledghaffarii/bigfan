import {Platform} from 'react-native';

let baseURL;

{
  Platform.OS == 'android'
    ? (baseURL = 'http://192.168.1.38:3000/api/v1/')
    : (baseURL = 'http://192.168.1.14:3000/api/v1/');
}

export default baseURL;
