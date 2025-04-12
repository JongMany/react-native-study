import {ImageUri, Post} from '@/models';
import {axiosInstance} from './axios-instance';

export type CreatePostRequestDto = Omit<Post, 'id'> & {
  imageUri: ImageUri[];
};
export type CreatePostResponseDto = Post & {imageUri: ImageUri[]};

export const createPost = async (
  body: CreatePostRequestDto,
): Promise<CreatePostResponseDto> => {
  const {data} = await axiosInstance.post('/posts', body);
  return data;
};
