import {getPosts, GetPostsResponseDto} from '@/services';
import {InfiniteData, QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';
import {UseInfiniteQueryCustomOptions} from '@/models';

export const useGetInfinitePosts = (
  queryOptions?: UseInfiniteQueryCustomOptions<
    GetPostsResponseDto,
    InfiniteData<GetPostsResponseDto, number>, // GetPostsResponseDto[] => select 쓰는 경우
    GetPostsResponseDto,
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: postQueryKey.getPosts(),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    // select: data => {
    //   return data.pages;
    // },
    ...queryOptions,
  });
};
