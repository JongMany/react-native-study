import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {colors} from '@/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '@/components/common/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/common/CustomButton';
import {
  useCreatePost,
  useForm,
  useGetAddress,
  useImagePicker,
  useModal,
  usePermission,
  useUpdatePost,
} from '@/hooks';
import {TextInput} from 'react-native-gesture-handler';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import {MarkerColor} from '@/models';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import DatePickerOption from '@/components/post/DatePickerOption';
import ImageInput from '@/components/post/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailPostStore from '@/store/useDetailPostStore';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

export default function PostForm({location, isEdit = false}: PostFormProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const {detailPost} = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  usePermission('PHOTO');
  const descriptionRef = useRef<TextInput | null>(null);

  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const [score, setScore] = useState(isEditMode ? detailPost.score : 5);
  const handleChangeScore = (newScore: number) => {
    setScore(newScore);
  };

  const [date, setDate] = useState(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
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
    initialImages: isEditMode ? detailPost.images : [],
  });

  const address = useGetAddress(location);

  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });

  const handleSubmit = useCallback(() => {
    const mutatePostRequestDto = {
      date,
      title: addPost.form.title,
      description: addPost.form.description,
      color: markerColor,
      score: score,
      address,
      imageUris: imagePicker.imageUris,
      ...location,
    };
    if (isEditMode) {
      updatePost.mutate(
        {id: detailPost.id, body: mutatePostRequestDto},
        {
          onSuccess: () => {
            navigation.goBack();
          },
        },
      );
    } else {
      createPost.mutate(mutatePostRequestDto, {
        onSuccess: () => {
          navigation.goBack();
        },
        onError: error => {
          // Error 처리
          console.log(error.response);
        },
      });
    }
  }, [
    date,
    detailPost,
    updatePost,
    addPost,
    address,
    location,
    score,
    markerColor,
    createPost,
    navigation,
    imagePicker.imageUris,
    isEditMode,
  ]);

  useEffect(() => {
    // Header에 추가
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

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
            label={
              isPicked || isEditMode
                ? getDateWithSeparator(date, '. ')
                : '날짜 선택'
            }
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
              showOptions
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
}

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
