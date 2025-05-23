import axios from 'axios';
import {useEffect, useState} from 'react';
import Config from 'react-native-config';
import {LatLng} from 'react-native-maps';
import {useDebounce} from './useDebounce';

type Meta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
};

export type RegionInfo = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type RegionResponse = {
  meta: Meta;
  documents: RegionInfo[];
};

export function useSearchLocation(keyword: string, location: LatLng) {
  const [regionInfo, setRegionInfo] = useState<RegionInfo[]>([]);
  const [pageParam, setPageParam] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchNextPage = () => {
    setPageParam(prev => prev + 1);
  };

  const fetchPrevPage = () => {
    setPageParam(prev => prev - 1);
  };

  const debouncedSearchText = useDebounce(keyword, 300);

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get<RegionResponse>(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${debouncedSearchText}&y=${location.latitude}&x=${location.longitude}&page=${pageParam}`,
          {
            headers: {
              Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
            },
          },
        );
        setHasNextPage(!data.meta.is_end);
        setRegionInfo(data.documents);
      } catch (error) {
        setRegionInfo([]);
      }
    })();

    keyword === '' && setPageParam(1);

    debouncedSearchText === '' && setPageParam(1);
  }, [debouncedSearchText, location, pageParam]);

  return {regionInfo, pageParam, fetchNextPage, fetchPrevPage, hasNextPage};
}
