import {
  Dimensions,
  Image,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useGetPost} from '@/hooks';
import {
  colors,
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import CustomMarker from '../common/CustomMarker';
import Octicons from 'react-native-vector-icons/Octicons';
import {getDateWithSeparator} from '@/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {MainDrawerParamList} from '@/navigations/drawer/MainDrawerNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {FeedTabParamList} from '@/navigations/tab/FeedTabNavigator';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

export default function MarkerModal({
  markerId,
  isVisible,
  hide,
}: MarkerModalProps) {
  const navigation = useNavigation<Navigation>();
  const {data: post, isPending, isError} = useGetPost(markerId);

  if (!post || isPending || isError) {
    return null;
  }

  const baseUri =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030';

  const handlePressModal = () => {
    // main navigation -> feed navigation
    navigation.navigate(mainNavigations.Feed, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: {
          id: post.id,
        },
        initial: false,
      },
    });
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={styles.optionBackground} onTouchEnd={hide}>
        <Pressable style={styles.cardContainer} onPress={handlePressModal}>
          <View style={styles.cardInner}>
            <View style={styles.cardAlign}>
              {post && post.images.length > 0 && (
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${baseUri}/${post.images[0].uri}`,
                    }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {post && post.images.length === 0 && (
                <View
                  style={[styles.imageContainer, styles.emptyImageContainer]}>
                  <CustomMarker color={post.color} score={post.score} />
                </View>
              )}
              <View style={styles.infoContainer}>
                <View style={styles.addressContainer}>
                  <Octicons name="location" size={16} color={colors.GRAY_500} />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.addressText}>
                    {post.address ?? ''}
                  </Text>
                </View>
                <Text style={styles.titleText}>{post.title ?? ''}</Text>
                <Text style={styles.dateText}>
                  {getDateWithSeparator(post?.date, '.') ?? ''}
                </Text>
              </View>
            </View>
            {/* 피드 이동 */}
            <View>
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color={colors.BLACK}
              />
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    shadowColor: colors.BLACK,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.2,
    elevation: 1,
    borderColor: colors.GRAY_500,
    borderWidth: 1.5,
  },
  cardInner: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  emptyImageContainer: {
    borderColor: colors.GRAY_200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 2,
    marginLeft: 15,
    gap: 5,
  },
  addressContainer: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 10,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.PINK_700,
  },
});
