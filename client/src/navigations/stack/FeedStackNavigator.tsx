import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React from 'react';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import {colors, feedNavigations} from '@/constants';
import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '../drawer/MainDrawerNavigator';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import {LatLng} from 'react-native-maps';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import ImageZoomScreen from '@/screens/feed/ImageZoomScreen';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: {id: number};
  [feedNavigations.EDIT_POST]: {location: LatLng};
  [feedNavigations.IMAGE_ZOOM]: {index: number};
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
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerTitle: '',
          headerShown: false,
          cardStyle: {
            backgroundColor: colors.GRAY_100,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImageZoomScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default FeedStackNavigator;
