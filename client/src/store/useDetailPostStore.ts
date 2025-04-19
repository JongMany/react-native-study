import {GetPostResponseDto} from '@/services';
import {create} from 'zustand';

interface DetailPostState {
  detailPost: GetPostResponseDto | null;
  setDetailPost: (detailPost: GetPostResponseDto) => void;
}

const useDetailPostStore = create<DetailPostState>(set => ({
  detailPost: null,
  setDetailPost: (detailPost: GetPostResponseDto) => {
    set({detailPost});
  },
}));

export default useDetailPostStore;
