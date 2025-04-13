import {UseMutationCustomOptions} from '@/models';
import {
  UploadImageRequestDto,
  UploadImageResponseDto,
  uploadImages,
} from '@/services';
import {useMutation} from '@tanstack/react-query';

export const useUploadImages = (
  mutationOptions?: UseMutationCustomOptions<
    UploadImageResponseDto,
    UploadImageRequestDto
  >,
) => {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
};
