import {getformDataImage} from '@/utils';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useUploadImages} from './queries';
import {useState} from 'react';
import {ImageUri} from '@/models';
import {Alert} from 'react-native';
import {alerts} from '@/constants';
import Toast from 'react-native-toast-message';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}
export function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const uploadImages = useUploadImages();
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert(
        alerts.EXCEED_MAX_IMAGE_COUNT.TITLE,
        alerts.EXCEED_MAX_IMAGE_COUNT.DESCRIPTION,
      );
      return;
    }
    setImageUris(prev => [...prev, ...uris.map(uri => ({uri}))]);
  };

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(imageUri => imageUri.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const addImage = () => {
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
          Toast.show({
            type: 'error',
            text1: '갤러리를 열 수 없어요.',
            text2: '권한을 허용했는지 확인해주세요.',
            position: 'bottom',
          });
          // 사용자가 이미지를 선택하지 않고 취소한 경우가 아닌 경우 => 스냅바 표시
        }
      });
  };
  return {
    imageUris,
    add: addImage,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
}
