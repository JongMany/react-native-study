import {UseMutationCustomOptions} from '@/models';
import {
  createPost,
  CreatePostRequestDto,
  CreatePostResponseDto,
  queryClient,
} from '@/services';
import {useMutation} from '@tanstack/react-query';
import {markerQueryKey} from './useGetMarkers';

export const useCreatePost = (
  mutationOptions?: UseMutationCustomOptions<
    CreatePostResponseDto,
    CreatePostRequestDto
  >,
) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: markerQueryKey.getMarkers(),
        // refetchType: 'all',
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
