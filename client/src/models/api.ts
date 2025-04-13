import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
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

/**
 * TQueryFnData: 성공 response 타입
 * TData: select 옵션 타입
 * TQueryKey: 쿼리키 타입
 */
export type UseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, ErrorResponse, TData, TQueryKey>,
  'queryFn' | 'queryKey'
>;

/**
 * TQueryFnData: 성공 response 타입
 * TData: select 옵션 타입
 * TQueryData: initialData, placeholderData 타입
 * TQueryKey: 쿼리키 타입
 * TPageParam: 페이지네이션 파라미터 타입 (number, string, cursor 객체 등)
 */
export type UseInfiniteQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData[],
  TQueryData = TQueryFnData,
  TQueryKey extends readonly unknown[] = QueryKey,
  TPageParam = unknown,
> = Omit<
  UseInfiniteQueryOptions<
    TQueryFnData,
    ErrorResponse,
    TData,
    TQueryData,
    TQueryKey,
    TPageParam
  >,
  | 'queryFn'
  | 'queryKey'
  | 'initialPageParam'
  | 'getNextPageParam'
  | 'getPreviousPageParam'
>;
