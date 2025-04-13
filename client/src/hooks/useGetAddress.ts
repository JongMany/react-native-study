import {errorMessages} from '@/constants';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {LatLng} from 'react-native-maps';
import Config from 'react-native-config';

export function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [address, setAddress] = useState('');

  useEffect(() => {
    (async () => {
      const resultType = 'street_address|route|political';
      const language = 'ko';
      const isAndroid = Platform.OS === 'android';

      const API_KEY = isAndroid
        ? Config.GOOGLE_MAPS_AOS_API_KEY
        : Config.GOOGLE_MAPS_IOS_API_KEY;
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
        setAddress(errorMessages.CANNOT_GET_ADDRESS);
      }
    })();
  }, [latitude, longitude]);

  return address;
}
