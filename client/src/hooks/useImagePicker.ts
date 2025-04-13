import {getformDataImage} from '@/utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useUploadImages} from './queries';
import {useState} from 'react';
import {ImageUri} from '@/models';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}
export function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const uploadImages = useUploadImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getformDataImage(images);
        uploadImages.mutate(formData, {
          onSuccess: response => {
            addImageUris(response);
          },
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 사용자가 이미지를 선택하지 않고 취소한 경우가 아닌 경우 => 스냅바 표시
        }
      });
  };
  return {
    imageUris,
    handleChange,
  };
}
