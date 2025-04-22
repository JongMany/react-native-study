import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '@/constants';
import Calendar from '@/components/calendar/Calendar';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import {useGetCalendarPosts} from '@/hooks';
import EventList from '@/components/calendar/EventList';

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

  const moveToToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToToday();
  }, []);

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
        moveToToToday={moveToToToday}
      />
      <EventList posts={posts[selectedDate] ?? []} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
