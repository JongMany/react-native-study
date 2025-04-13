import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {ImageUri} from '@/models';

interface PreviewImageListProps {
  imageUris: ImageUri[];
}

export default function PreviewImageList({imageUris}: PreviewImageListProps) {
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
});
