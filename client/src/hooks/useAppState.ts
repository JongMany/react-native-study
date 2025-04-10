import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

/**
 * 백그라운드를 갔다가 다시 돌아오는 경우를 체크
 * 위치 권한 등을 받고 돌아올 때, 상태를 업데이트해주기 위해 필요
 */
export function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  // background > foreground로 돌아온 상태
  const [isComeback, setIsComeback] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComeback(true);
      }

      if (appState.current.match(/active/) && nextAppState === 'background') {
        setIsComeback(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    isComeback,
    appStateVisible,
  };
}
