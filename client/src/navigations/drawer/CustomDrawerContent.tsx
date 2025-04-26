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
import {colors, mainNavigations, settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

  let imageSrc = require('@/assets/user-default.png');
  if (imageUri !== null) {
    imageSrc = {uri: imageUri};
  } else if (kakaoImageUri !== null) {
    imageSrc = {uri: kakaoImageUri};
  }

  const handlePressSetting = () => {
    console.log('setting');
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
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
      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name="settings" color={colors.GRAY_700} size={18} />
          <Text style={styles.bottomMenuText}>설정</Text>
        </Pressable>
      </View>
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
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_200,
  },
  bottomMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bottomMenuText: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.GRAY_700,
  },
});
