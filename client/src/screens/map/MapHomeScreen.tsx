import React, {useRef, useState} from 'react';
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {alerts, colors, mapNavigations, numbers} from '@/constants';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {
  useGetMarkers,
  useModal,
  useMoveMapView,
  usePermission,
  useUserLocation,
} from '@/hooks';
import mapStyle from '@/styles/mapStyle';
import CustomMarker from '@/components/common/CustomMarker';
import MarkerModal from '@/components/map/MarkerModal';
import Toast from 'react-native-toast-message';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<Navigation>();
  const {userLocation, isUserLocationError} = useUserLocation();
  const {data: markers = []} = useGetMarkers();
  const {mapRef, moveMapView, handleChangeDelta} = useMoveMapView();

  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      Toast.show({
        type: 'error',
        text1: '위치 권한을 허용해주세요.',
        position: 'bottom',
      });
      return;
    }
    moveMapView(userLocation);
  };

  const [selectLocation, setSelectLocation] = useState<LatLng | null>(null);

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

  const {isVisible, show, hide} = useModal();

  const [markerId, setMarkerId] = useState<number | null>(null);
  const handlePressMarker = (id: number, coordinate: LatLng) => {
    moveMapView(coordinate);
    setMarkerId(id);
    show();
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
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
        onRegionChangeComplete={handleChangeDelta}>
        {markers?.map(({id, color, ...coordinate}) => {
          return (
            <CustomMarker
              key={id}
              color={color}
              coordinate={coordinate}
              onPress={() => handlePressMarker(id, coordinate)}
              tracksViewChanges={false}
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

      {/* 마커 모달 */}
      <MarkerModal markerId={markerId} isVisible={isVisible} hide={hide} />
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
