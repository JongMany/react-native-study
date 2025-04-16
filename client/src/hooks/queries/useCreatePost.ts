import {UseMutationCustomOptions} from '@/models';
import {
  createPost,
  CreatePostRequestDto,
  CreatePostResponseDto,
  queryClient,
} from '@/services';
import {useMutation} from '@tanstack/react-query';
import {markerQueryKey} from './useGetMarkers';
import {postQueryKey} from './useGetPost';

export const useCreatePost = (
  mutationOptions?: UseMutationCustomOptions<
    CreatePostResponseDto,
    CreatePostRequestDto
  >,
) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: markerQueryKey.getMarkers(),
      });
      queryClient.invalidateQueries({
        queryKey: postQueryKey.getPosts(),
      });

      // setQueryData
      // queryClient.setQueryData<GetMarkersResponseDto>(
      //   markerQueryKey.getMarkers(),
      //   prevMarkers => {
      //     const newMarker = {
      //       id: response.id,
      //       color: response.color,
      //       score: response.score,
      //       latitude: response.latitude,
      //       longitude: response.longitude,
      //     };

      //     return prevMarkers ? [...prevMarkers, newMarker] : [newMarker];
      //   },
      // );
    },
    ...mutationOptions,
  });
};
