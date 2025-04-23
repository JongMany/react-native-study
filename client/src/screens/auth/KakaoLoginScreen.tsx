import {Dimensions, Platform, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
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
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
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
