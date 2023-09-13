import { ForwardedRef, forwardRef, useCallback, useMemo } from 'react';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

import BottomSheetBackDrop, { IBottomSheetBackDrop } from '../backdrop';
import { colors } from '@styles/theme';
import { ICard } from '@commons/card';
import { InputTypes, inputTypes, typeChange } from '@redux/store';
import InputTypeItem, { IInputTypeItemProps } from '@commons/inputTypeItem';

interface IBottomSheetInputTypeList
  extends Pick<IBottomSheetBackDrop, 'onCloseSheet'>,
    Pick<ICard, 'id'> {
  dispatch: Dispatch<AnyAction>;
}

export const inputTypeItems: IInputTypeItemProps[] = [
  {
    icon: (props: any) => (
      <MaterialCommunityIcons
        name="text-short"
        size={28}
        color={colors.gray_dark}
        {...props}
      />
    ),
    label: '단답형',
    inputType: inputTypes.TEXT,
  },
  {
    icon: (props: any) => (
      <MaterialCommunityIcons
        name="text-long"
        size={28}
        color={colors.gray_dark}
        {...props}
      />
    ),
    label: '장문형',
    inputType: inputTypes.TEXTAREA,
  },
  {
    icon: (props: any) => (
      <MaterialCommunityIcons
        name="radiobox-marked"
        size={28}
        color={colors.gray_dark}
        {...props}
      />
    ),
    label: '객관식 질문',
    inputType: inputTypes.RADIO,
  },
  {
    icon: (props: any) => (
      <MaterialCommunityIcons
        name="checkbox-outline"
        size={28}
        color={colors.gray_dark}
        {...props}
      />
    ),
    label: '체크박스',
    inputType: inputTypes.CHECKBOX,
  },
];

const BottomSheetInputTypeList = forwardRef(
  (
    { onCloseSheet, id, dispatch }: IBottomSheetInputTypeList,
    ref: ForwardedRef<BottomSheetModal>,
  ): JSX.Element => {
    const snapPoints = useMemo(() => ['35%', '57%', '80%'], []);

    const backdropComponent = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackDrop {...props} onCloseSheet={onCloseSheet} />
      ),
      [],
    );

    const handleSelectInputType = (inputType: InputTypes) => (): void => {
      dispatch(typeChange({ id, inputType }));
      onCloseSheet();
    };

    const renderItem = ({
      item,
    }: {
      item: IInputTypeItemProps;
    }): JSX.Element => (
      <InputTypeItem handleSelectInputType={handleSelectInputType} {...item} />
    );

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose={true}
        enableDismissOnClose={true}
        snapPoints={snapPoints}
        backdropComponent={backdropComponent}
        handleIndicatorStyle={{ backgroundColor: colors.gray_light }}>
        <BottomSheetFlatList data={inputTypeItems} renderItem={renderItem} />
      </BottomSheetModal>
    );
  },
);

export default BottomSheetInputTypeList;
