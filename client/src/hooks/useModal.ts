import {useState} from 'react';

type UseModalProps = {
  initialVisible: boolean;
};

export function useModal(
  props: UseModalProps = {
    initialVisible: false,
  },
) {
  const [isVisible, setIsVisible] = useState(props.initialVisible);

  const show = () => {
    setIsVisible(true);
  };
  const hide = () => {
    setIsVisible(false);
  };
  return {
    isVisible,
    show,
    hide,
  };
}
