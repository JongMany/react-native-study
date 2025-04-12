import {Marker} from '@/models';
import {axiosInstance} from './axios-instance';

export type GetMarkersResponseDto = Marker[];

export const getMarkers = async (): Promise<GetMarkersResponseDto> => {
  const {data} = await axiosInstance.get('/markers/my');

  return data;
};
