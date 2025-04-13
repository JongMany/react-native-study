import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {useGetInfinitePosts} from '@/hooks';
import FeedItem from './FeedItem';

export default function FeedList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinitePosts();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View>
      <FlatList
        data={posts?.pages.flat()}
        renderItem={({item}) => <FeedItem post={item} />}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
});
