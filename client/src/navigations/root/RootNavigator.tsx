import React from 'react';
import MainDrawereNavigator from '../drawer/MainDrawereNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

export default function RootNavigator() {
  const isLoggedIn = false;

  return <>{isLoggedIn ? <MainDrawereNavigator /> : <AuthStackNavigator />}</>;
}
