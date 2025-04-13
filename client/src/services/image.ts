import {axiosInstance} from './axios-instance';

export type UploadImageRequestDto = FormData;
export type UploadImageResponseDto = string[]; // Array - id of uploaded images

export const uploadImages = async (
  body: UploadImageRequestDto,
): Promise<UploadImageResponseDto> => {
  const {data} = await axiosInstance.post('/images', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
