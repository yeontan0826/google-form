import { useRef } from 'react';
import { Switch, TouchableHighlight, View } from 'react-native';
import { IconButton } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';

import * as S from './styles';
import { colors } from '@styles/theme';
import { getRandomId } from '@utils/getRandomId';
import BottomSheetMore from '@/src/components/bottomSheet/more';

import { ICardProps, IStateProps } from '@redux/reducer/types';
import {
  copyCard,
  removeCard,
  toggleIsRequired,
} from '@redux/reducer/cardReducer';

const CardFooter = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const isRequired: boolean = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.isRequired;
  });

  const handleChangeRequired = (): void => {
    dispatch(toggleIsRequired({ id }));
  };

  const handleCloseSheet = (): void => {
    bottomSheetRef.current?.close();
  };

  const handleOpenSheet = (): void => {
    bottomSheetRef.current?.present();
  };

  const handleCopyCard = (): void => {
    dispatch(copyCard({ cardId: id, copiedCardId: getRandomId() }));
  };

  const handleRemoveCard = (): void => {
    dispatch(removeCard({ cardId: id }));
  };

  return (
    <>
      <S.Container>
        <IconButton
          pressEffect="ripple"
          onPress={handleOpenSheet}
          icon={() => (
            <MaterialCommunityIcons
              name="dots-vertical"
              size={26}
              color={colors.gray}
            />
          )}
        />
        <Switch
          value={isRequired}
          trackColor={{ true: colors.purple, false: colors.gray_light }}
          thumbColor={colors.white}
          onValueChange={handleChangeRequired}
        />
        <S.RequiredLabel>필수</S.RequiredLabel>
      </S.Container>
      <BottomSheetMore ref={bottomSheetRef} onCloseSheet={handleCloseSheet}>
        <View>
          <TouchableHighlight
            underlayColor={colors.black}
            onPress={handleCopyCard}>
            <S.MoreItemContainer>
              <S.MoreItemIconWrapper>
                <MaterialCommunityIcons
                  name="content-copy"
                  size={22}
                  color={colors.gray_dark}
                />
              </S.MoreItemIconWrapper>
              <S.MoreItemLabel>복사하기</S.MoreItemLabel>
            </S.MoreItemContainer>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={colors.black}
            onPress={handleRemoveCard}>
            <S.MoreItemContainer>
              <S.MoreItemIconWrapper>
                <MaterialCommunityIcons
                  name="delete-forever"
                  size={28}
                  color={colors.red}
                />
              </S.MoreItemIconWrapper>
              <S.MoreItemLabel style={{ color: colors.red }}>
                삭제하기
              </S.MoreItemLabel>
            </S.MoreItemContainer>
          </TouchableHighlight>
        </View>
      </BottomSheetMore>
    </>
  );
};

export default CardFooter;
