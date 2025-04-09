import { storageKey } from '../constants';
import {Category, Profile} from '../models';
import {getEncryptStorage} from '../utils';
import {axiosInstance} from './axios-instance';

export type SignupRequestDto = {
  email: string;
  password: string;
};

export const postSignup = async ({
  email,
  password,
}: SignupRequestDto): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

  return data;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};
export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
};

export const postLogin = async ({
  email,
  password,
}: LoginRequestDto): Promise<LoginResponseDto> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

export type ProfileResponseDto = Profile & Category;
export const getProfile = async (): Promise<ProfileResponseDto> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

export type RefreshTokenResponseDto = {
  accessToken: string;
  refreshToken: string;
};

export const getAccesssToken = async (): Promise<RefreshTokenResponseDto> => {
  const refreshToken = await getEncryptStorage(storageKey.AUTH.REFRESH_TOKEN);
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return data;
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};
