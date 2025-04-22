import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@/constants';
import DayOfWeeks from './DayOfWeeks';
import {isSameAsCurrentDate, MonthYear} from '@/utils';
import DateBox from './DateBox';
import YearSelector from './YearSelector';
import {useModal} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import CalendarHomeHeaderRight from './CalendarHomeHeaderRight';

interface CalendarProps<T> {
  monthYear: MonthYear;
  onChangeMonth: (increment: number) => void;
  selectedDate: number;
  onPressDate: (date: number) => void;
  schedules: Record<number, T>; // number는 숫자
  moveToToToday: () => void;
}

export default function Calendar<T>({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
  moveToToToday,
}: CalendarProps<T>) {
  const {month, year, lastDate, firstDayOfWeek} = monthYear;
  const yearSelector = useModal();
  const handleChangeYear = (selectedYear: number) => {
    onChangeMonth((selectedYear - year) * 12);
    yearSelector.hide();
  };
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight({onPress: moveToToToday}),
    });
  }, [moveToToToday, navigation]);

  return (
    <>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.monthButtonContainer}
          onPress={() => onChangeMonth(-1)}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>
        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
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
      {/* 날짜 표시 */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDayOfWeek}, (_, idx) => ({
            id: idx,
            date: idx - firstDayOfWeek + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={Boolean(schedules[item.date])}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
        {/* 년도 선택 */}
        <YearSelector
          isVisible={yearSelector.isVisible}
          currentYear={year}
          onChangeYear={handleChangeYear}
          hide={yearSelector.hide}
        />
      </View>
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
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
});
