import React, {useEffect, useRef, useState} from 'react';
import MapView, {
  LatLng,
  LongPressEvent,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {alerts, colors, mapNavigations} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawereNavigator';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {useGetMarkers, usePermission, useUserLocation} from '@/hooks';
import mapStyle from '@/styles/mapStyle';
import CustomMarker from '@/components/CustomMarker';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const mapRef = useRef<MapView | null>(null);
  const {userLocation, isUserLocationError} = useUserLocation();
  const {data: markers = []} = useGetMarkers();

  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const [selectLocation, setSelectLocation] = useState<LatLng | null>({
    latitude: 53,
    longitude: 0,
  });

  const hanldePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }
    navigation.navigate(mapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  const doublePressRef = useRef(0);

  const onPress = (event: MapPressEvent) => {
    doublePressRef.current = doublePressRef.current + 1;
    setTimeout(() => (doublePressRef.current = 0), 1000);

    if (doublePressRef.current >= 2) {
      setSelectLocation(event.nativeEvent.coordinate);
      doublePressRef.current = 0;
    }
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton={false}
        customMapStyle={mapStyle}
        zoomTapEnabled={false} // ⛔️ 두 번 탭 줌 비활성화
        zoomControlEnabled={false}
        zoomEnabled={true}
        onPress={onPress}
        // onDoublePress={e => console.log('double pressed!', e.nativeEvent)}
        onLongPress={e => console.log('long pressed!', e.nativeEvent)}>
        {markers?.map(({id, color, latitude, longitude}) => {
          return (
            <CustomMarker
              key={`${id}-${latitude}-${longitude}-${color}`}
              color={color}
              coordinate={{
                latitude,
                longitude,
              }}
            />
          );
        })}

        {selectLocation && (
          <Marker
            // key={`${selectLocation.latitude}-${selectLocation.longitude}`}
            coordinate={selectLocation}
            // shouldRasterizeIOS
          />
        )}
      </MapView>

      <Pressable
        style={[styles.drawerButton, {top: inset.top || 20}]}
        onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" color={colors.WHITE} size={25} />
      </Pressable>
      <View style={styles.buttonList} pointerEvents="box-none">
        <Pressable style={styles.mapButton} onPress={hanldePressAddPost}>
          <MaterialIcons name="add" color={colors.WHITE} size={25} />
        </Pressable>
        <Pressable
          style={styles.mapButton}
          onPress={handlePressUserLocation}
          pointerEvents="box-none">
          <MaterialIcons name="my-location" color={colors.WHITE} size={25} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    // top: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.PINK_700,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    elevation: 4, // 안드로이드 shadow
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.PINK_700,
    marginVertical: 5,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.5,
    elevation: 2, // 안드로이드 shadow
  },
});

export default MapHomeScreen;
