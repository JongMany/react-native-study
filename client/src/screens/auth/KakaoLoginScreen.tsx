import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import Config from 'react-native-config';
import axios from 'axios';
import useAuth from '@/hooks/queries/useAuth';
import {colors} from '@/constants';

// 카카오에서 설정한 Redirect Uri
const baseUri =
  Platform.OS === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030';
const REDIRECT_URI = `${baseUri}/auth/oauth/kakao`;

export default function KakaoLoginScreen() {
  const {kakaoLoginMutation} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);

  const handleOnMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, '');

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        params: {
          grant_type: 'authorization_code',
          client_id: Config.KAKAO_REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
        },
      });
      kakaoLoginMutation.mutate(response.data.access_token);
    } catch (error) {
      console.error('error', error);
    }
  };

  // 로그인 후, 메시지 화면이 보이는 것을 막기 위한 함수
  const handleNavigationState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size="small" color={colors.BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaoLoadingContainer: {
    backgroundColor: colors.WHITE,
    height: Dimensions.get('window').height,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
