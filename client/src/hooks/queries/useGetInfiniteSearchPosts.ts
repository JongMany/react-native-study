import {GetSearchPostResponseDto, getSearchPosts} from '@/services';
// import {queryKeys} from '@/constants';
import {ErrorResponse} from '@/models';

import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';

function useGetInfiniteSearchPosts(
  query: string,
  queryOptions?: UseInfiniteQueryOptions<
    GetSearchPostResponseDto[],
    ErrorResponse,
    InfiniteData<GetSearchPostResponseDto[], number>,
    GetSearchPostResponseDto[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getSearchPosts({page: pageParam, query}),
    queryKey: postQueryKey.getSearchPosts(query),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfiniteSearchPosts;
