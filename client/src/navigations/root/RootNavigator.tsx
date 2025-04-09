import React from 'react';
import MainDrawereNavigator from '../drawer/MainDrawereNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '../../hooks/queries/useAuth';

export default function RootNavigator() {
  const {isLogin} = useAuth();

  return <>{isLogin ? <MainDrawereNavigator /> : <AuthStackNavigator />}</>;
}
