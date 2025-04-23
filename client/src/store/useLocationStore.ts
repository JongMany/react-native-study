import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationStoreState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
  selectLocation: LatLng | null;
  setSelectLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationStoreState>(set => ({
  moveLocation: null,
  setMoveLocation: (location: LatLng) =>
    set(prevState => ({...prevState, moveLocation: location})),
  selectLocation: null,
  setSelectLocation: (location: LatLng | null) =>
    set(prevState => ({...prevState, selectLocation: location})),
}));
export default useLocationStore;
