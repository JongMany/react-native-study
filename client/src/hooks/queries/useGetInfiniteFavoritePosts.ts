import {UseInfiniteQueryCustomOptions} from '@/models';
import {getFavoritePosts, GetFavoritePostsResponseDto} from '@/services';
import {InfiniteData, QueryKey, useInfiniteQuery} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';

export const useGetInfiniteFavoritePosts = (
  queryOptions?: UseInfiniteQueryCustomOptions<
    GetFavoritePostsResponseDto,
    InfiniteData<GetFavoritePostsResponseDto, number>, // GetPostsResponseDto[] => select 쓰는 경우
    GetFavoritePostsResponseDto,
    QueryKey,
    number
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getFavoritePosts(pageParam),
    queryKey: [postQueryKey.getFavoritePosts()],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
};
