import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import InputField from '@/components/common/InputField';
import {useForm} from '@/hooks';
import {SignupInformation, validateSignUp} from '@/utils';
import CustomButton from '@/components/common/CustomButton';
import useAuth from '@/hooks/queries/useAuth';
import Toast from 'react-native-toast-message';
import {errorMessages} from '@/constants';

export default function SignupScreen() {
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);
  const {signupMutation, loginMutation} = useAuth();

  const {errors, form, getTextInputProps, touched} = useForm<SignupInformation>(
    {
      initialValue: {
        email: '',
        password: '',
        passwordConfirm: '',
      },
      validate: validateSignUp,
    },
  );
  const handleSubmit = () => {
    const requestDto = {
      email: form.email,
      password: form.password,
    };
    console.log(requestDto);
    signupMutation.mutate(requestDto, {
      onSuccess: () => {
        loginMutation.mutate(requestDto, {
          onError: error => {
            Toast.show({
              type: 'error',
              text1:
                error.response?.data.message || errorMessages.UNEXPECT_ERROR,
              position: 'bottom',
              visibilityTime: 2000,
            });
          },
        });
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECT_ERROR,
          position: 'bottom',
          visibilityTime: 2000,
        });
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={errors.email}
          touched={touched.email}
          inputMode="email"
          returnKeyType="next"
          // blurOnSubmit={false}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          {...getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          textContentType="oneTimeCode" // 아이폰 강력 비밀번호 관련
          error={errors.password}
          secureTextEntry
          touched={touched.password}
          returnKeyType="next"
          // blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          {...getTextInputProps('password')}
        />
        <InputField
          ref={passwordConfirmRef}
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
          touched={touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit} // 클릭시 저장
          // blurOnSubmit={false}
          {...getTextInputProps('passwordConfirm')}
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});
