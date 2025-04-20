import {UseMutationCustomOptions} from '@/models';
import {queryClient, updateFavoritePost} from '@/services';
import {useMutation} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';

export const useUpdateFavoritePost = (
  mutationOptions?: UseMutationCustomOptions,
) => {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updatedId => {
      queryClient.invalidateQueries({
        queryKey: postQueryKey.getByPostId(updatedId),
      });
    },
    ...mutationOptions,
  });
};
