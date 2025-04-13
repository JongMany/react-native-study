import {ImageUri, Post} from '@/models';
import {axiosInstance} from './axios-instance';

export type CreatePostRequestDto = Omit<Post, 'id'> & {
  imageUris: ImageUri[];
};
export type CreatePostResponseDto = Post & {images: ImageUri[]};

export const createPost = async (
  body: CreatePostRequestDto,
): Promise<CreatePostResponseDto> => {
  const {data} = await axiosInstance.post('/posts', body);
  return data;
};

export type GetPostRequestDto = number; // Post Id

export type GetPostResponseDto = CreatePostResponseDto & {
  isFavorite: boolean;
};

export const getPost = async (
  id: GetPostRequestDto,
): Promise<GetPostResponseDto> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);
  return data;
};

export type GetPostsResponseDto = CreatePostResponseDto[];
export const getPosts = async (
  page: number = 1,
): Promise<GetPostsResponseDto> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);
  return data;
};
