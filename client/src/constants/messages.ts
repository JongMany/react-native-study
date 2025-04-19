type AlertMessage = {
  TITLE: string;
  DESCRIPTION: string;
};

type Alerts = {
  [key: string]: AlertMessage;
};

export const alerts: Alerts = {
  LOCATION_PERMISSION: {
    TITLE: '위치 권한 허용이 필요합니다.',
    DESCRIPTION: '설정 화면에서 위치 권한을 허용해주세요.',
  },
  PHOTO_PERMISSION: {
    TITLE: '사진 접근 권한이 필요합니다.',
    DESCRIPTION: '설정 화면에서 사진 권한을 허용해주세요.',
  },
  NOT_SELECTED_LOCATION: {
    TITLE: '추가할 위치를 선택해주세요.',
    DESCRIPTION: '지도를 길게 누르면 위치가 선택됩니다.',
  },
  EXCEED_MAX_IMAGE_COUNT: {
    TITLE: '이미지 개수 초과',
    DESCRIPTION: '추가 가능한 이미지는 최대 5개입니다.',
  },
  DELETE_POST: {
    TITLE: '삭제하시겠습니까?',
    DESCRIPTION: '피드와 지도에서 모두 삭제됩니다.',
  },
} as const;

export const errorMessages = {
  CANNOT_GET_ADDRESS: '주소를 찾는데 실패했습니다.',
};
