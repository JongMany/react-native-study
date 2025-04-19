import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {mapNavigations} from '@/constants';
import PostForm from '@/components/post/PostForm';

interface AddPostScreenProps
  extends StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST> {}

const AddPostScreen = ({route}: AddPostScreenProps) => {
  const location = route.params.location;

  return <PostForm location={location} />;
};

export default AddPostScreen;
