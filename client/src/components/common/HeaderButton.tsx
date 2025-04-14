import {Pressable, PressableProps, StyleSheet, Text} from 'react-native';
import React from 'react';
import {colors} from '@/constants';

interface HeaderButtonProps extends PressableProps {
  labelText?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
}
export default function HeaderButton({
  icon,
  labelText,
  hasError = false,
  ...pressableProps
}: HeaderButtonProps) {
  return (
    <Pressable disabled={hasError} style={styles.container} {...pressableProps}>
      {!labelText && icon}
      {!icon && labelText && (
        <Text style={[styles.text, hasError && styles.textError]}>
          {labelText}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.PINK_700,
  },
  textError: {
    color: colors.GRAY_200,
  },
});
