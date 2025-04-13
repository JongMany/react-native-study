import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {feedNavigations} from '@/constants';
import FeedHomeHeaderLeft from '@/components/FeedHomeHeaderLeft';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../drawer/MainDrawereNavigator';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  // [feedNavigations.FEED_DETAIL]: {id: number};
  // [feedNavigations.EDIT_POST]: {location: LatLng};
};
const Stack = createStackNavigator<FeedStackParamList>();

type FeedStackNavigatorProps = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function FeedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({navigation}) => ({
          headerTitle: '피드',
          headerLeft: () =>
            FeedHomeHeaderLeft(navigation as FeedStackNavigatorProps),
        })}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
