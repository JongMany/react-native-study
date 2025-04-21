import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@/constants';
import DayOfWeeks from './DayOfWeeks';
import {MonthYear} from '@/utils';

interface CalendarProps {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
}

export default function Calendar({monthYear, onChangeMonth}: CalendarProps) {
  const {month, year} = monthYear;
  return (
    <>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable style={styles.monthYearContainer}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(+1)}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>
      {/* 요일 표시 */}
      <DayOfWeeks />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthButtonContainer: {
    padding: 10,
  },
  monthYearContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
});
