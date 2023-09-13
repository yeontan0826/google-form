import { TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, TextInput } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as S from './styles';
import { colors } from '@styles/theme';
import { getRandomId } from '@utils/getRandomId';
import {
  ICardProps,
  IItemTypeProps,
  IStateProps,
  InputTypes,
  addEtcItem,
  addSelectItem,
  inputTypes,
  removeSelectItem,
  setText,
} from '@redux/store';

const ItemTypeSection = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const dispatch = useDispatch();

  const inputType: InputTypes = useSelector(
    (state: IStateProps) =>
      state.cards.find((card: ICardProps) => card.id === id)?.inputType,
  ) as InputTypes;

  const isFocused: boolean = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.isFocused;
  });

  const contents: IItemTypeProps[] = useSelector(
    (state: IStateProps) =>
      state.cards.find((card: ICardProps) => card.id === id)?.contents,
  ) as IItemTypeProps[];

  const haveEtc = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    const contents: IItemTypeProps[] = currentCard.contents as IItemTypeProps[];

    return contents.some((content: IItemTypeProps) => content.isEtc);
  });

  const handleChangeContentText = (text: string, contentId: string): void => {
    dispatch(setText({ cardId: id, contentId, text }));
  };

  const handleAddItem = (text: string) => (): void => {
    dispatch(addSelectItem({ id, contentId: getRandomId(), text }));
  };

  const handleRemoveSelectItem = (contentId: string) => (): void => {
    dispatch(removeSelectItem({ cardId: id, contentId }));
  };

  const handleAddEtcItem = (): void => {
    dispatch(addEtcItem({ id, contentId: getRandomId() }));
  };

  const { inputStyle, inputContainer, fontStyle } = S.propsStyles();
  return (
    <View style={{ marginTop: isFocused ? 0 : 24 }}>
      {contents.map((content: IItemTypeProps, index: number) => (
        <S.ItemContainer
          key={content.id}
          isEtc={content.isEtc}
          isFocused={isFocused}>
          {inputType === inputTypes.RADIO ? (
            <MaterialCommunityIcons
              name="radiobox-blank"
              size={24}
              color={colors.gray}
            />
          ) : null}
          {inputType === inputTypes.CHECKBOX ? (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={24}
              color={colors.gray}
            />
          ) : null}
          {isFocused ? (
            <TextInput
              variant="standard"
              inputContainerStyle={inputContainer}
              inputStyle={[
                fontStyle,
                { color: content.isEtc ? colors.gray : colors.black },
              ]}
              style={inputStyle}
              color={colors.purple}
              value={content.isEtc ? '기타...' : content.text}
              onChangeText={(text: string) =>
                handleChangeContentText(text, content.id)
              }
              editable={!content.isEtc}
            />
          ) : (
            <S.ItemAddLabel>
              {content.isEtc ? '기타...' : content.text}
            </S.ItemAddLabel>
          )}
          {isFocused && contents.length > 1 ? (
            <IconButton
              onPress={handleRemoveSelectItem(content.id)}
              pressEffect="ripple"
              icon={() => (
                <MaterialCommunityIcons
                  name="close"
                  size={26}
                  color={colors.gray_dark}
                />
              )}
            />
          ) : null}
        </S.ItemContainer>
      ))}
      {isFocused ? (
        <S.ItemAddContainer>
          {inputType === inputTypes.RADIO ? (
            <MaterialCommunityIcons
              name="radiobox-blank"
              size={24}
              color={colors.gray}
            />
          ) : null}
          {inputType === inputTypes.CHECKBOX ? (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              size={24}
              color={colors.gray}
            />
          ) : null}
          <S.Container style={{ marginLeft: 14 }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleAddItem(
                `옵션 ${
                  contents.filter((content: IItemTypeProps) => !content.isEtc)
                    .length + 1
                }`,
              )}>
              <S.ItemAddLabel style={{ color: colors.gray }}>
                옵션 추가
              </S.ItemAddLabel>
            </TouchableOpacity>
            {!haveEtc ? (
              <>
                <S.ItemAddLabel style={{ marginHorizontal: 6 }}>
                  또는
                </S.ItemAddLabel>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={handleAddEtcItem}>
                  <S.ItemAddLabel style={{ color: colors.blue }}>
                    '기타' 추가
                  </S.ItemAddLabel>
                </TouchableOpacity>
              </>
            ) : null}
          </S.Container>
        </S.ItemAddContainer>
      ) : null}
    </View>
  );
};

export default ItemTypeSection;
