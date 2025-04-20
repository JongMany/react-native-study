import {FlatList, StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import {useGetInfiniteFavoritePosts} from '@/hooks';
import FeedItem from './FeedItem';

export default function FeedFavoriteList() {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteFavoritePosts();

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
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
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}}
        indicatorStyle="black"
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyText}>즐겨찾기한 장소가 없습니다.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
  emptyText: {
    textAlign: 'center',
  },
});
