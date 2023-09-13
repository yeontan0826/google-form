import { useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { Button, IconButton, TextInput } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import * as S from './styles';
import { colors } from '@styles/theme';
import { ICard } from '@commons/card';
import { ICardProps, IStateProps, InputTypes, setTitle } from '@redux/store';
import { IInputTypeItemProps } from '@commons/inputTypeItem';
import BottomSheetInputTypeList, {
  inputTypeItems,
} from '@commons/bottomSheet/inputTypeList';

const CardHeader = ({
  id,
  isTitle,
}: Pick<ICard, 'id' | 'isTitle'>): JSX.Element => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const isFocused: boolean = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.isFocused;
  }, shallowEqual);

  const inputType: InputTypes = useSelector(
    (state: IStateProps) =>
      state.cards.find((card: ICardProps) => card.id === id)?.inputType,
  ) as InputTypes;

  const isRequired: boolean = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.isRequired;
  });

  const { cardTitle } = useSelector(
    (state: IStateProps) =>
      state.cards.find((card: ICardProps) => card.id === id) as ICardProps,
    shallowEqual,
  );

  const handleCardTitleChange = (text: string): void => {
    dispatch(setTitle({ cardId: id, title: text }));
  };

  const handleOpenSheet = (): void => {
    bottomSheetRef.current?.present();
  };

  const handleCloseSheet = (): void => {
    bottomSheetRef.current?.close();
  };

  const inputTypeItem: IInputTypeItemProps = useMemo(() => {
    return inputTypeItems.find(
      (item: IInputTypeItemProps) => item.inputType === inputType,
    ) as IInputTypeItemProps;
  }, [inputType]);
  const { input, inputContainer, fontStyle } = S.propsStyles(
    isTitle,
    isFocused,
  );
  const { selector, selectorContent, selectorTitle, selectorTrailing } =
    S.styles;
  return (
    <>
      <View>
        {isFocused ? (
          <TextInput
            variant="standard"
            inputStyle={[input, fontStyle]}
            inputContainerStyle={inputContainer}
            placeholder={isTitle ? '설문지 제목' : '질문'}
            onChangeText={handleCardTitleChange}
            color={colors.purple}
            defaultValue={isTitle ? '제목 없는 설문지' : ''}
            value={cardTitle}
            multiline={!isTitle}
          />
        ) : (
          <S.CardTitleContainer>
            <Text style={fontStyle}>
              {!isTitle && cardTitle.length === 0 ? '질문' : cardTitle}
            </Text>
            {isRequired ? <S.RequiredMark>*</S.RequiredMark> : null}
          </S.CardTitleContainer>
        )}
        {!isTitle && isFocused && (
          <S.SelectorContainer>
            <IconButton
              pressEffect="ripple"
              icon={
                <MaterialCommunityIcons
                  name="image-outline"
                  size={24}
                  color={colors.gray_dark}
                />
              }
            />
            <Button
              variant="outlined"
              pressEffect="ripple"
              style={selector}
              contentContainerStyle={selectorContent}
              titleStyle={selectorTitle}
              color={colors.gray_dark}
              onPress={handleOpenSheet}
              title={inputTypeItem.label}
              leading={({ color }: { color: string }) =>
                inputTypeItem.icon({ size: 24, color })
              }
              trailing={({ color }: { color: string }) => (
                <MaterialCommunityIcons
                  name="menu-down"
                  size={24}
                  color={color}
                />
              )}
              trailingContainerStyle={selectorTrailing}
            />
          </S.SelectorContainer>
        )}
      </View>
      <BottomSheetInputTypeList
        ref={bottomSheetRef}
        onCloseSheet={handleCloseSheet}
        dispatch={dispatch}
        id={id}
      />
    </>
  );
};

export default CardHeader;
