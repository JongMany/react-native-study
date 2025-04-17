import {LatLng} from 'react-native-maps';
import {create} from 'zustand';

interface LocationStoreState {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationStoreState>(set => ({
  moveLocation: null,
  setMoveLocation: (location: LatLng) =>
    set(prevState => ({...prevState, moveLocation: location})),
}));
export default useLocationStore;
