import {colors} from '@/constants';
import {createContext, PropsWithChildren, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type OptionConetxtValue = {
  onClickOutSide: (event: GestureResponderEvent) => void;
};
const OptionContext = createContext<OptionConetxtValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  isVisible: boolean;
  animationType?: ModalProps['animationType'];
  hideOption: () => void;
}
function OptionMain({
  isVisible,
  animationType = 'slide',
  hideOption,
  children,
  ...modalProps
}: PropsWithChildren<OptionMainProps>) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType}
      onRequestClose={hideOption}
      {...modalProps}>
      <OptionContext.Provider
        value={{
          onClickOutSide,
        }}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

function Background({children}: PropsWithChildren) {
  const optionContext = useContext(OptionContext);
  return (
    <SafeAreaView
      style={styles.optionBackground}
      onTouchEnd={optionContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
  isDanger?: boolean;
}

function Button({
  children,
  isDanger = false,
  ...pressableProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      {...pressableProps}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.border} />;
}

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0 / 0.5)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.GRAY_100,
    overflow: 'hidden',
  },
  optionButtonPressed: {
    backgroundColor: colors.GRAY_200,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionText: {
    fontSize: 17,
    color: colors.BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors.RED_500,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.BLACK,
  },
  border: {
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
});

const CompoundOption = Object.assign(OptionMain, {
  Background,
  Container,
  Button,
  Title,
  Divider,
});

export default CompoundOption;
