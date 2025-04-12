import React from 'react';
import HeaderButton from './HeaderButton';

export default function AddPostHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
}
