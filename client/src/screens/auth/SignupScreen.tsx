import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputField from '../../components/InputField';
import {useForm} from '../../hooks';
import {SignupInformation, validateSignUp} from '../../utils';
import CustomButton from '../../components/CustomButton';

export default function SignupScreen() {
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
    console.log(form);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={errors.email}
          touched={touched.email}
          inputMode="email"
          {...getTextInputProps('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={errors.password}
          secureTextEntry
          touched={touched.password}
          {...getTextInputProps('password')}
        />
        <InputField
          placeholder="비밀번호 확인"
          error={errors.passwordConfirm}
          touched={touched.passwordConfirm}
          secureTextEntry
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
