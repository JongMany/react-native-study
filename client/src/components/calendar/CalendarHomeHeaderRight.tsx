import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from '../common/HeaderButton';

interface CalendarHomeHeaderRightProps {
  onPress: () => void;
}

function CalendarHomeHeaderRight({onPress}: CalendarHomeHeaderRightProps) {
  return <HeaderButton labelText="오늘" onPress={onPress} />;
}

const styles = StyleSheet.create({});

export default CalendarHomeHeaderRight;
