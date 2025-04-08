import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import InputField from '../../components/InputField';

function LoginScreen() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChangeText = (name: string, text: string) => {
    setForm(prev => ({
      ...prev,
      [name]: text,
    }));
  };

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const handleBlur = (name: string) => {
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder="이메일"
          error={'이메일을 입력하세요'}
          touched={touched.email}
          inputMode="email"
          value={form.email}
          onChangeText={text => handleChangeText('email', text)}
          onBlur={() => handleBlur('email')}
        />
        <InputField
          placeholder="비밀번호"
          error={'비밀번호를 입력하세요'}
          secureTextEntry
          touched={touched.password}
          value={form.password}
          onChangeText={text => handleChangeText('password', text)}
          onBlur={() => handleBlur('password')}
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
  },
});

export default LoginScreen;
