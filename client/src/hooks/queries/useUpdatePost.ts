import {UseMutationCustomOptions} from '@/models';
import {queryClient, updatePost} from '@/services';
import {useMutation} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';
import {markerQueryKey} from './useGetMarkers';

export const useUpdatePost = (mutationOptions: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: postQueryKey.getPosts(),
      });
      queryClient.invalidateQueries({
        queryKey: markerQueryKey.getMarkers(),
      });
      queryClient.setQueryData(postQueryKey.getByPostId(newPost.id), newPost);
    },
    ...mutationOptions,
  });
};
