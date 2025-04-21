import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@/constants';
import Calendar from '@/components/calendar/Calendar';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {useGetCalendarPosts} from '@/hooks';

export default function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts({
    year: monthYear.year,
    month: monthYear.month,
  });

  if (isPending || isError) {
    return <></>;
  }

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
        schedules={posts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
