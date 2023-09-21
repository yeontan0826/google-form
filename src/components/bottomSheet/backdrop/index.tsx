import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { colors } from '@styles/theme';

export interface IBottomSheetBackDrop extends BottomSheetBackdropProps {
  onCloseSheet: () => void;
}

const opacity = 0.5;

const BottomSheetBackDrop = ({
  animatedIndex,
  style,
  onCloseSheet,
}: IBottomSheetBackDrop) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [opacity, opacity],
      [opacity, opacity],
      Extrapolate.CLAMP,
    ),
  }));

  const containerStyle: (
    | StyleProp<ViewStyle>
    | {
        opacity: number;
      }
  )[] = useMemo(
    () => [
      style,
      {
        backgroundColor: colors.black,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  const _onTouchEnd = (): void => {
    onCloseSheet();
  };

  return <Animated.View style={containerStyle} onTouchEnd={_onTouchEnd} />;
};

export default BottomSheetBackDrop;
