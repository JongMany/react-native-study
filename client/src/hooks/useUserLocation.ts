import {useEffect, useState} from 'react';
import GeoLocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';
import {useAppState} from './useAppState';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626929192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);
  const {isComeback} = useAppState();

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setUserLocation({
          latitude,
          longitude,
        });
        setIsUserLocationError(false);
      },
      () => {
        // Error
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true,
      },
    );
  }, [isComeback]);

  return {
    userLocation,
    isUserLocationError,
  };
}
