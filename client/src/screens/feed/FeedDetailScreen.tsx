import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';
import {useGetPost} from '@/hooks';

interface FeedDetailScreenProps
  extends StackScreenProps<
    FeedStackParamList,
    typeof feedNavigations.FEED_DETAIL
  > {}

export default function FeedDetailScreen({route}: FeedDetailScreenProps) {
  const {id} = route.params;
  const {data: post, isPending, isError} = useGetPost(id);

  return <ScrollView></ScrollView>;
}

const styles = StyleSheet.create({});
