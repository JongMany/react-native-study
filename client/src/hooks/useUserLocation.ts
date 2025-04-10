import {useEffect, useState} from 'react';
import GeoLocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 37.5516032365118,
    longitude: 126.98989626929192,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

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
  }, []);

  return {
    userLocation,
    isUserLocationError,
  };
}
