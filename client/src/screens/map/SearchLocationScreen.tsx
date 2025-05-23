import Pagination from '@/components/common/Pagination';
import SearchInput from '@/components/common/SearchInput';
import SearchRegionResult from '@/components/map/SearchRegionResult';
import {useSearchLocation, useUserLocation} from '@/hooks';
import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

interface SearchLocationScreenProps {}

function SearchLocationScreen({}: SearchLocationScreenProps) {
  const [keyword, setKeyword] = useState('');
  const {userLocation} = useUserLocation();

  const {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage} =
    useSearchLocation(keyword, userLocation);

  const handleChangeKeyword = (text: string) => {
    setKeyword(text);
  };

  return (
    <View style={styles.container}>
      <SearchInput
        autoFocus
        value={keyword}
        onChangeText={handleChangeKeyword}
        onSubmit={() => Keyboard.dismiss()}
        placeholder="검색할 장소를 입력하세요."
      />
      <SearchRegionResult regionInfo={regionInfo} />
      <Pagination
        pageParam={pageParam}
        fetchPrevPage={fetchPrevPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        totalLength={regionInfo.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SearchLocationScreen;
