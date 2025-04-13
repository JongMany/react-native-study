import axios from 'axios';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {LatLng} from 'react-native-maps';

export function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      const resultType = 'street_address|route|political';
      const language = 'ko';
      const isAndroid = Platform.OS === 'android';

      const API_KEY_IOS = 'AIzaSyCZ5tdRSJdeQSaadna0xe00DVHEejclj24';
      const API_KEY_ANDROID = 'AIzaSyDwF7ueSWBPCnQxn_YWHqZIGKNQLMUWKZk';
      const API_KEY = isAndroid ? API_KEY_ANDROID : API_KEY_IOS;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=${resultType}&language=${language}&key=${API_KEY}`;
      try {
        const {data} = await axios.get(url);
        const result =
          data.results.length > 0
            ? data.results[0].formatted_address
            : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        setAddress(result);
      } catch (error: any) {
        console.log(error.response);
        setAddress('주소를 찾는데 실패했습니다.');
      }
    })();
  }, [latitude, longitude]);

  return address;
}
