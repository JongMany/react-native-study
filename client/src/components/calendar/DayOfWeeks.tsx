import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '@/constants';

export default function DayOfWeeks() {
  return (
    <View style={styles.container}>
      {['일', '월', '화', '수', '목', '금', '토'].map(day => {
        return (
          <View key={day} style={styles.item}>
            <Text
              style={[
                styles.text,
                day === '토' && styles.saturdayText,
                day === '일' && styles.sundayText,
              ]}>
              {day}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    width: deviceWidth / 7,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.BLACK,
  },
  saturdayText: {
    color: colors.BLUE_500,
  },
  sundayText: {
    color: colors.RED_500,
  },
});
