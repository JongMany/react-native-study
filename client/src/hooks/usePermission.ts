import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  Permission,
  request,
  RESULTS,
} from 'react-native-permissions';

type PermissionType = 'LOCATION';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
};
const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
};

export function usePermission() {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermissions.LOCATION
        : iosPermissions.LOCATION;

      const checked = await check(permissionOS);
      const showPermissionAlert = () => {
        Alert.alert(
          '위치 권한 허용이 필요합니다.',
          '설정 화면에서 위치 권한을 허용해주세요.',
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }
          await request(permissionOS);
          break;
        case RESULTS.BLOCKED:
        case RESULTS.LIMITED:
          showPermissionAlert();
          break;
        default:
          break;
      }
    })();
  });
}
