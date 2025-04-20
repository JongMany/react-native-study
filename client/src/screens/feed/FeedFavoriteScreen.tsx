import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '@/constants';

interface FeedFavoriteScreenProps {}

export default function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FeedFavoriteScreen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
