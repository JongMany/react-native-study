import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ImageUri} from '@/models';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (imageUri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
  showOptions?: boolean;
}

export default function PreviewImageList({
  imageUris,
  onDelete,
  showOptions = false,
  onChangeOrder,
}: PreviewImageListProps) {
  const baseUri =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030';
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => (
          <Pressable style={styles.imageContainer} key={index}>
            <Image
              resizeMode="cover"
              source={{
                uri: `${baseUri}/${uri}`,
              }}
              style={styles.image}
            />
            {showOptions && (
              <>
                {/* Delete Button */}
                <Pressable
                  style={[styles.imageButton, styles.deleteButton]}
                  onPress={() => {
                    onDelete && onDelete(uri);
                  }}>
                  <Ionicons name="close" size={16} color={colors.WHITE} />
                </Pressable>
                {/* 이동 - 좌 */}
                {index > 0 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveLeftButton]}
                    onPress={() => {
                      onChangeOrder && onChangeOrder(index, index - 1);
                    }}>
                    <Ionicons
                      name="arrow-back-outline"
                      size={16}
                      color={colors.WHITE}
                    />
                  </Pressable>
                )}
                {/* 이동 - 우 */}
                {index < imageUris.length - 1 && (
                  <Pressable
                    style={[styles.imageButton, styles.moveRightButton]}
                    onPress={() => {
                      onChangeOrder && onChangeOrder(index, index + 1);
                    }}>
                    <Ionicons
                      name="arrow-forward-outline"
                      size={16}
                      color={colors.WHITE}
                    />
                  </Pressable>
                )}
              </>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});
