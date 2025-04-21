import {colors} from '@/constants';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';

interface DateBoxProps {
  date: number;
  selectedDate: number;
  onPressDate: (date: number) => void;
  isToday?: boolean;
}

function DateBox({
  date,
  selectedDate,
  onPressDate,
  isToday = false,
}: DateBoxProps) {
  return (
    <Pressable style={styles.container} onPress={() => onPressDate(date)}>
      {date > 0 && (
        <View
          style={[
            styles.dateContainer,
            selectedDate === date && styles.selectedContainer,
            selectedDate === date && isToday && styles.selectedTodayContainer,
          ]}>
          <Text
            style={[
              styles.dateText &&
                selectedDate === date &&
                styles.selectedDateText,
              isToday && styles.todayDateText,
              selectedDate === date && isToday && styles.selectedTodayText,
            ]}>
            {date}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 7,
    height: deviceWidth / 7,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_200,
    alignItems: 'center',
  },
  dateContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  selectedContainer: {
    backgroundColor: colors.BLACK,
  },
  selectedTodayContainer: {
    backgroundColor: colors.PINK_700,
  },
  dateText: {
    fontSize: 17,
    color: colors.BLACK,
  },
  selectedDateText: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  todayDateText: {
    color: colors.PINK_700,
    fontWeight: '700',
  },
  selectedTodayText: {
    color: colors.WHITE,
  },
});

export default DateBox;
