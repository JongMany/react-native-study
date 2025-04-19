import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {ImageUri} from '@/models';
import {colors} from '@/constants';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

export default function ImageCarousel({
  images,
  pressedIndex = 0,
}: ImageCarouselProps) {
  const baseUri =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030';
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<FeedStackParamList>>();
  const [initialIndex, setInitialIndex] = useState(pressedIndex);
  const [page, setPage] = useState(pressedIndex);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(event.nativeEvent.contentOffset.x / deviceWidth);
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: inset.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Octicons name="arrow-left" size={30} color={colors.WHITE} />
      </Pressable>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: `${baseUri}/${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        onScroll={handleScroll}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View style={[styles.pageContainer, {bottom: inset.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[styles.pageDot, index === page && styles.currentPageDot]}
          />
        ))}
      </View>
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colors.PINK_700,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: deviceWidth,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.GRAY_200,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_700,
  },
});
