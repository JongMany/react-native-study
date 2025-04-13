import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
// import AuthStackNavigator from './src/navigations/AuthStackNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigator from './src/navigations/root/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './src/services';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
