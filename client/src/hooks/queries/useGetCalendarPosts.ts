import {getCalendarPosts, GetCalendarPostsResponseDto} from '@/services';
import {useQuery} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';
import {UseQueryCustomOptions} from '@/models';

export const useGetCalendarPosts = (
  {year, month}: {year: number; month: number},
  queryOptions?: UseQueryCustomOptions<GetCalendarPostsResponseDto>,
) => {
  return useQuery({
    queryKey: postQueryKey.getCalendarPostsByYearMonth(year, month),
    queryFn: async () => await getCalendarPosts({year, month}),
    ...queryOptions,
  });
};
