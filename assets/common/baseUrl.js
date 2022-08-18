import {Platform} from 'react-native';

let baseURL;
// ? (baseURL = 'http://192.168.1.38:3000/api/v1/')
// : (baseURL = 'http://51.38.98.98:3000/api/v1/');
{
  Platform.OS == 'android'
    ? (baseURL = 'http://192.168.1.38:3000/api/v1/')
    : (baseURL = 'http://51.38.98.98:3000/api/v1/');
}

export default baseURL;
