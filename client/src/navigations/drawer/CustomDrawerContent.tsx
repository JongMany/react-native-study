import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const {logoutMutation} = useAuth();

  let imageSrc = require('@/assets/user-default.png');
  if (imageUri !== null) {
    imageSrc = {uri: imageUri};
  } else if (kakaoImageUri !== null) {
    imageSrc = {uri: kakaoImageUri};
  }
  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 커스텀 콘텐트 */}
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.userImageContainer}>
            <Image source={imageSrc} style={styles.userImage} />
          </View>
          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>

        {/* Navigator 자식요소 */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* LogoutButton */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text>로그아웃</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  nameText: {
    color: colors.BLACK,
  },
  logoutButton: {
    alignItems: 'flex-end',
    padding: 14,
  },
});
