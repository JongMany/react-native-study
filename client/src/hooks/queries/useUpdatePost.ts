import {UseMutationCustomOptions} from '@/models';
import {queryClient, updatePost} from '@/services';
import {useMutation} from '@tanstack/react-query';
import {postQueryKey} from './useGetPost';
import {markerQueryKey} from './useGetMarkers';

export const useUpdatePost = (mutationOptions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: postQueryKey.getPosts(),
      });
      queryClient.invalidateQueries({
        queryKey: markerQueryKey.getMarkers(),
      });
      const postDate = new Date(newPost.date);
      queryClient.invalidateQueries({
        queryKey: postQueryKey.getCalendarPostsByYearMonth(
          postDate.getFullYear(),
          postDate.getMonth() + 1,
        ),
      });
      queryClient.setQueryData(postQueryKey.getByPostId(newPost.id), newPost);
    },
    ...mutationOptions,
  });
};
