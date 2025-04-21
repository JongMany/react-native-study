import {getCalendarPosts} from '@/services';
import {useQuery} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';
import {UseQueryCustomOptions} from '@/models';

export const useGetCalendarPosts = (
  {year, month}: {year: number; month: number},
  queryOptions?: UseQueryCustomOptions,
) => {
  return useQuery({
    queryKey: postQueryKey.getCalendarPosts(year, month),
    queryFn: () => getCalendarPosts({year, month}),
    ...queryOptions,
  });
};
