import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {mapNavigations} from '@/constants';

interface AddPostScreenProps
  extends StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST> {}

const AddPostScreen = ({route}: AddPostScreenProps) => {
  const location = route.params.location;

  return (
    <View>
      <Text>{location.latitude}</Text>
      <Text>{location.longitude}</Text>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({});
