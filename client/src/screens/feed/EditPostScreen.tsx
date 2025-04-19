import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {feedNavigations} from '@/constants';
import PostForm from '@/components/post/PostForm';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';

interface EditPostScreenProps
  extends StackScreenProps<
    FeedStackParamList,
    typeof feedNavigations.EDIT_POST
  > {}

const EditPostScreen = ({route}: EditPostScreenProps) => {
  const location = route.params.location;

  return <PostForm location={location} isEdit={true} />;
};

export default EditPostScreen;
