import {UseMutationOptions} from '@tanstack/react-query';
import {AxiosError} from 'axios';

export type ErrorResponse = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

/**
 * TData: 성공 response 타입
 * TVariables: request dto 타입
 * TContext: context 타입 (onMutate에서 리턴하는 context 객체 타입) > rollback에서 사용
 */
export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
  TContext = unknown,
> = Omit<
  UseMutationOptions<TData, ErrorResponse, TVariables, TContext>,
  'mutationFn'
>;
