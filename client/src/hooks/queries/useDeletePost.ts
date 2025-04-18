import {UseMutationCustomOptions} from '@/models';
import {deletePost, queryClient} from '@/services';
import {useMutation} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';
import {markerQueryKey} from './useGetMarkers';

export const useDeletePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postQueryKey.getPosts(),
      });
      queryClient.invalidateQueries({
        queryKey: markerQueryKey.getMarkers(),
      });
    },
    ...mutationOptions,
  });
};
