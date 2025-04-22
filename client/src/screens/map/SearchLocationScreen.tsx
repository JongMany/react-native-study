import React from 'react';
import {StyleSheet, View} from 'react-native';

interface SearchLocationScreenProps {}

function SearchLocationScreen({}: SearchLocationScreenProps) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
