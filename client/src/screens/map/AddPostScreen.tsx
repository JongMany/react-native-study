import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {colors, mapNavigations} from '@/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/CustomButton';
import {
  useCreatePost,
  useForm,
  useGetAddress,
  useImagePicker,
  useModal,
  usePermission,
} from '@/hooks';
import {TextInput} from 'react-native-gesture-handler';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import {MarkerColor} from '@/models';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';
import DatePickerOption from '@/components/DatePickerOption';
import ImageInput from '@/components/ImageInput';
import PreviewImageList from '@/components/PreviewImageList';

interface AddPostScreenProps
  extends StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST> {}

const AddPostScreen = ({route, navigation}: AddPostScreenProps) => {
  const location = route.params.location;
  usePermission('PHOTO');

  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useCreatePost();
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const [score, setScore] = useState(5);
  const handleChangeScore = (newScore: number) => {
    setScore(newScore);
  };

  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };
  const {
    isVisible,
    show: showDatePickerModal,
    hide: hideDatePickerModal,
  } = useModal();

  const handleConfirmDate = () => {
    setIsPicked(true);
    hideDatePickerModal();
  };
  const imagePicker = useImagePicker({
    initialImages: [],
  });

  const address = useGetAddress(location);

  const addPost = useForm({
    initialValue: {
      title: '',
      description: '',
    },
    validate: validateAddPost,
  });

  const handleSubmit = useCallback(() => {
    const createPostRequestDto = {
      date,
      title: addPost.form.title,
      description: addPost.form.description,
      color: markerColor,
      score: score,
      address,
      imageUris: [],
      ...location,
    };
    createPost.mutate(createPostRequestDto, {
      onSuccess: () => {
        navigation.goBack();
      },
      onError: error => {
        // Error 처리
        console.log(error.response);
      },
    });
  }, [
    date,
    addPost,
    address,
    location,
    score,
    markerColor,
    createPost,
    navigation,
  ]);

  useEffect(() => {
    // Header에 추가
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);
  console.log(imagePicker.imageUris);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            variant="outlined"
            size="large"
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
            onPress={showDatePickerModal}
          />
          <InputField
            {...addPost.getTextInputProps('title')}
            error={addPost.errors.title}
            touched={addPost.touched.title}
            placeholder="제목을 입력하세요."
            returnKeyType="next"
            onSubmitEditing={() => {
              descriptionRef.current?.focus();
            }}
          />
          <InputField
            {...addPost.getTextInputProps('description')}
            error={addPost.errors.description}
            touched={addPost.touched.description}
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            returnKeyType="next"
            multiline
          />
          <MarkerSelector
            markerColor={markerColor}
            score={score}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            <ImageInput onChange={imagePicker.add} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </View>
          <DatePickerOption
            date={date}
            isVisible={isVisible}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
  },
});
