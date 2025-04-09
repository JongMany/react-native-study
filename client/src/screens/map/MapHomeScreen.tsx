import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  return <MapView style={styles.container} provider={PROVIDER_GOOGLE} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
