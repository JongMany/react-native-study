export type LoginInformation = {
  email: string;
  password: string;
};

const validateEmail = (email: string) => {
  const errors = {
    email: '',
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }
  return errors;
};

const validatePassword = (password: string) => {
  const errors = {
    password: '',
  };
  if (!(password.length >= 8 && password.length < 20)) {
    errors.password = '비밀번호는 8~20자 사이로 입력해주세요';
  }
  return errors;
};

export const validateLogin = (values: LoginInformation) => {
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);
  return {
    ...emailError,
    ...passwordError,
  };
};
export type SignupInformation = LoginInformation & {
  passwordConfirm: string;
};
export const validateSignUp = (values: SignupInformation) => {
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);
  const errors = {
    ...emailError,
    ...passwordError,
    passwordConfirm: '',
  };

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }
  return errors;
};

export type AddPost = {
  title: string;
};
export const validateAddPost = (values: AddPost) => {
  const errors = {
    title: '',
    description: '',
  };
  if (!values.title.trim()) {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }
  return errors;
};
