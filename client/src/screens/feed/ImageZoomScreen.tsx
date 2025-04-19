import ImageCarousel from '@/components/common/ImageCarousel';
import useDetailPostStore from '@/store/useDetailPostStore';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

interface ImageZoomScreenProps
  extends StackScreenProps<
    FeedStackParamList,
    typeof feedNavigations.IMAGE_ZOOM
  > {}

const ImageZoomScreen = ({route}: ImageZoomScreenProps) => {
  const {index} = route.params;
  const {detailPost} = useDetailPostStore();
  return <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />;
};

export default ImageZoomScreen;
