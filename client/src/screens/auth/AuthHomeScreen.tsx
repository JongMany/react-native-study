import CustomButton from '@/components/common/CustomButton';
import {authNavigations, colors} from '@/constants';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList, 'AuthHome'>;
function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/matzip.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="카카오 로그인하기"
          variant="filled"
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={<Ionicons name="chatbubble-sharp" color="#181500" size={16} />}
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
        />
        <CustomButton
          label="이메일 로그인하기"
          variant="filled"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <Pressable onPress={() => navigation.navigate(authNavigations.SIGNUP)}>
          <Text style={styles.emailText}>이메일로 가입하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    rowGap: 10,
    alignItems: 'center',
  },
  kakaoButtonContainer: {
    backgroundColor: '#fee503',
  },
  kakaoButtonText: {
    color: '#161600',
  },
  emailText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
    padding: 10,
    color: colors.BLACK,
  },
  appleButton: {
    width: Dimensions.get('screen').width - 60,
    height: 45,
    paddingVertical: 25,
  },
});
export default AuthHomeScreen;
