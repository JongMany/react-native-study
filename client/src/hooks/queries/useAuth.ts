import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccesssToken,
  getProfile,
  LoginRequestDto,
  LoginResponseDto,
  logout,
  postLogin,
  postSignup,
  ProfileResponseDto,
  queryClient,
  SignupRequestDto,
} from '../../services';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '../../models';
import {
  removeAxiosHeader,
  removeEncryptStorage,
  setAxiosHeader,
  setEncryptStorage,
} from '../../utils';
import {useEffect} from 'react';

export const useSignup = (
  mutationOptions?: UseMutationCustomOptions<void, SignupRequestDto>,
) => {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
};

export const useLogin = (
  mutationOptions?: UseMutationCustomOptions<LoginResponseDto, LoginRequestDto>,
) => {
  return useMutation({
    mutationFn: postLogin,
    ...mutationOptions,
    onSuccess(data) {
      const {accessToken, refreshToken} = data;
      setEncryptStorage('refreshToken', refreshToken);
      setAxiosHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled() {
      queryClient.refetchQueries({
        queryKey: ['auth', 'getAccessToken'],
      });
      queryClient.invalidateQueries({
        queryKey: ['auth', 'getProfile'],
      });
    },
  });
};

export const useRefreshAccessToken = () => {
  const {isSuccess, isError, data} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccesssToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // 27분 (accessToken은 30분)
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setAxiosHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage('refreshToken', data.refreshToken);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      removeAxiosHeader('Authorization');
      removeEncryptStorage('refreshToken');
    }
  }, [isError]);

  return {
    isSuccess,
    isError,
  };
};

export const useGetProfile = (
  queryOptions?: UseQueryCustomOptions<ProfileResponseDto, unknown>,
) => {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
};

export const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeAxiosHeader('Authorization');
      removeEncryptStorage('refreshToken');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['auth'],
      });
    },
    ...mutationOptions,
  });
};

const useAuth = () => {
  const signupMutation = useSignup();
  const loginMutation = useLogin();
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
    getProfileQuery,
    logoutMutation,
  };
};

export default useAuth;
