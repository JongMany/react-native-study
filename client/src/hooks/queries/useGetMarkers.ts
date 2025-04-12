import {UseQueryCustomOptions} from '@/models';
import {getMarkers, GetMarkersResponseDto} from '@/services';
import {useQuery} from '@tanstack/react-query';

export const markerQueryKey = {
  all: ['marker'] as const,
  getMarkers: () => [...markerQueryKey.all, 'getMarkers'] as const,
} as const;

export const useGetMarkers = (
  queryOptions?: UseQueryCustomOptions<GetMarkersResponseDto>,
) => {
  return useQuery({
    queryKey: markerQueryKey.getMarkers(),
    queryFn: getMarkers,
    ...queryOptions,
  });
};
