/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>텍스트</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default App;