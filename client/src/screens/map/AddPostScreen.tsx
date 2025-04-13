import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {colors, mapNavigations} from '@/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import InputField from '@/components/InputField';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/CustomButton';
import {useCreatePost, useForm, useGetAddress} from '@/hooks';
import {TextInput} from 'react-native-gesture-handler';
import {validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import {MarkerColor} from '@/models';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';

interface AddPostScreenProps
  extends StackScreenProps<MapStackParamList, typeof mapNavigations.ADD_POST> {}

const AddPostScreen = ({route, navigation}: AddPostScreenProps) => {
  const location = route.params.location;
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
      date: new Date(),
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
  }, [addPost, address, location, score, markerColor, createPost, navigation]);

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
          <CustomButton variant="outlined" size="large" label="날짜 선택" />
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
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
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
