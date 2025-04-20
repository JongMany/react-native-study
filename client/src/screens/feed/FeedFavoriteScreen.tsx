import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '@/constants';
import FeedFavoriteList from '@/components/feed/FeedFavoriteList';

export default function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoriteList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
