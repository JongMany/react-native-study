import {MutationFunction, useMutation, useQuery} from '@tanstack/react-query';
import {
  AppleIdentityRequestDto,
  AppleIdentityResponseDto,
  appleLogin,
  getAccesssToken,
  getProfile,
  kakaoLogin,
  KakaoLoginRequestDto,
  KakaoLoginResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  logout,
  postLogin,
  postSignup,
  ProfileResponseDto,
  queryClient,
  SignupRequestDto,
} from '@/services';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/models';
import {
  removeAxiosHeader,
  removeEncryptStorage,
  setAxiosHeader,
  setEncryptStorage,
} from '@/utils';
import {useEffect} from 'react';
import {numbers, storageKey} from '@/constants';

export const authQueryKey = {
  all: ['auth'] as const,
  getAccessToken: () => [...authQueryKey.all, 'getAccessToken'] as const,
  getProfile: () => [...authQueryKey.all, 'getProfile'] as const,
} as const;

export const useSignup = (
  mutationOptions?: UseMutationCustomOptions<void, SignupRequestDto>,
) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

export const useLogin = <T>(
  loginAPI: MutationFunction<LoginResponseDto, T>,
  mutationOptions?: UseMutationCustomOptions<LoginResponseDto, T>,
) => {
  return useMutation({
    mutationFn: loginAPI,
    ...mutationOptions,
    onSuccess(data) {
      const {accessToken, refreshToken} = data;
      setEncryptStorage(storageKey.AUTH.REFRESH_TOKEN, refreshToken);
      setAxiosHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled() {
      queryClient.refetchQueries({
        queryKey: authQueryKey.getAccessToken(),
      });
      queryClient.invalidateQueries({
        queryKey: authQueryKey.getProfile(),
      });
    },
  });
};

export const useEmailLogin = (
  mutationOptions?: UseMutationCustomOptions<LoginResponseDto, LoginRequestDto>,
) => {
  return useLogin(postLogin, mutationOptions);
};

export const useKakaoLogin = (
  mutationOptions?: UseMutationCustomOptions<
    KakaoLoginResponseDto,
    KakaoLoginRequestDto
  >,
) => {
  return useLogin(kakaoLogin, mutationOptions);
};

export const useAppleLogin = (
  mutationOptions?: UseMutationCustomOptions<
    AppleIdentityResponseDto,
    AppleIdentityRequestDto
  >,
) => {
  return useLogin(appleLogin, mutationOptions);
};

export const useRefreshAccessToken = () => {
  const {isSuccess, isError, data} = useQuery({
    queryKey: authQueryKey.getAccessToken(),
    queryFn: getAccesssToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME, // 27분 (accessToken은 30분)
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setAxiosHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKey.AUTH.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      removeAxiosHeader('Authorization');
      removeEncryptStorage(storageKey.AUTH.REFRESH_TOKEN);
    }
  }, [isError]);

  return {
    isSuccess,
    isError,
  };
};

export const useGetProfile = (
  queryOptions?: UseQueryCustomOptions<ProfileResponseDto, ProfileResponseDto>,
) => {
  return useQuery({
    queryKey: authQueryKey.getProfile(),
    queryFn: getProfile,
    ...queryOptions,
  });
};

export const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeAxiosHeader('Authorization');
      removeEncryptStorage(storageKey.AUTH.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: authQueryKey.all,
      });
    },
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const refreshAccessToken = useRefreshAccessToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshAccessToken.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;

  return {
    isLogin,
    signupMutation,
    loginMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    getProfileQuery,
    logoutMutation,
  };
};

export default useAuth;
