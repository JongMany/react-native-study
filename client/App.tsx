import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// import AuthStackNavigator from './src/navigations/AuthStackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './src/navigations/root/RootNavigator';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <RootNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
