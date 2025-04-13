import {Image} from 'react-native-image-crop-picker';

export const getformDataImage = (images: Image[]) => {
  const formData = new FormData();

  images.forEach(image => {
    const {path, mime} = image;

    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append('images', file);
  });
  return formData;
};
