import {UseMutationCustomOptions} from '@/models';
import {
  createPost,
  CreatePostRequestDto,
  CreatePostResponseDto,
} from '@/services';
import {useMutation} from '@tanstack/react-query';

export const useCreatePost = (
  mutationOptions?: UseMutationCustomOptions<
    CreatePostResponseDto,
    CreatePostRequestDto
  >,
) => {
  return useMutation({
    mutationFn: createPost,
    ...mutationOptions,
  });
};
