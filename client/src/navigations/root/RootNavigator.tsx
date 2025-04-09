import React from 'react';
import MainDrawereNavigator from '@/navigations/drawer/MainDrawereNavigator';
import AuthStackNavigator from '@/navigations/stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';

export default function RootNavigator() {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainDrawereNavigator /> : <AuthStackNavigator />}</>;
}
