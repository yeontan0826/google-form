import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import { colors } from '@styles/theme';
import BottomSheetBackDrop, { IBottomSheetBackDrop } from '../backdrop';

interface IBottomSheetMore extends Pick<IBottomSheetBackDrop, 'onCloseSheet'> {
  children: ReactNode;
}

const BottomSheetMore = forwardRef(
  (
    { children, onCloseSheet }: IBottomSheetMore,
    ref: ForwardedRef<BottomSheetModal>,
  ): JSX.Element => {
    const snapPoints: string[] = useMemo(() => ['20%'], []);

    const backdropComponent = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackDrop {...props} onCloseSheet={onCloseSheet} />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        snapPoints={snapPoints}
        backdropComponent={backdropComponent}
        handleIndicatorStyle={{ backgroundColor: colors.white }}>
        {children}
      </BottomSheetModal>
    );
  },
);

export default BottomSheetMore;
