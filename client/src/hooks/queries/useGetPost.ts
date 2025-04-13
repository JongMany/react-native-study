import {UseQueryCustomOptions} from '@/models';
import {getPost, GetPostResponseDto} from '@/services';
import {useQuery} from '@tanstack/react-query';

export const postQueryKey = {
  all: ['post'] as const,
  getPost: () => [...postQueryKey.all, 'getPost'] as const,
  getByPostId: (id: number) => [...postQueryKey.getPost(), id] as const,
} as const;

export const useGetPost = (
  id: number | null = null,
  queryOptions?: UseQueryCustomOptions<GetPostResponseDto>,
) => {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: postQueryKey.getByPostId(Number(id)),
    enabled: Boolean(id),
    ...queryOptions,
  });
};
