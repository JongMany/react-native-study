import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {useForm} from '../../hooks';
import {LoginInformation, validateLogin} from '../../utils';

function LoginScreen() {
  const {form, errors, touched, getTextInputProps} = useForm<LoginInformation>({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

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
        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          onPress={handleSubmit}
        />
      </View>
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

export default LoginScreen;
