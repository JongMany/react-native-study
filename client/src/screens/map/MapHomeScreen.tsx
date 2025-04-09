import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/queries/useAuth';

interface MapHomeScreenProps {}

function MapHomeScreen({}: MapHomeScreenProps) {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>Map Screen</Text>
      <CustomButton
        label="로그아웃"
        onPress={() => {
          logoutMutation.mutate(null);
        }}
      />
    </View>
  );
}

export default MapHomeScreen;
