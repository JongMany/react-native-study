import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useGetInfinitePosts} from '@/hooks';
import FeedItem from './FeedItem';

export default function FeedList() {
  const {data: posts} = useGetInfinitePosts();
  return (
    <View>
      <FlatList
        data={posts?.pages.flat()}
        renderItem={({item}) => <FeedItem post={item} />}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
