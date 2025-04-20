import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '@/constants';
import Calendar from '@/components/calendar/Calendar';

export default function CalendarHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Calendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
