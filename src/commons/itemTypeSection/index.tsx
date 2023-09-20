import { TouchableOpacity, View } from 'react-native';
import { IconButton, TextInput } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './styles';
import { colors } from '@styles/theme';
import { getRandomId } from '@utils/getRandomId';

import {
  ICardProps,
  IItemTypeProps,
  IStateProps,
  InputTypes,
  inputTypes,
} from '@redux/reducer/types';
import {
  addEtcItem,
  addSelectItem,
  moveContent,
  removeSelectItem,
  setText,
} from '@redux/reducer/cardReducer';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

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

  const handleChangeContentText = (text: string, contentId: string) => {
    dispatch(setText({ cardId: id, contentId, text }));
  };

  const handleAddItem = (text: string) => () => {
    dispatch(addSelectItem({ id, contentId: getRandomId(), text }));
  };

  const handleRemoveSelectItem = (contentId: string) => () => {
    dispatch(removeSelectItem({ cardId: id, contentId }));
  };

  const handleAddEtcItem = () => {
    dispatch(addEtcItem({ id, contentId: getRandomId() }));
  };

  const onDragEnd = ({ from, to }: DragEndParams<IItemTypeProps>) => {
    dispatch(
      moveContent({ cardId: id, fromIndex: String(from), toIndex: String(to) }),
    );
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<IItemTypeProps>): JSX.Element => {
    return (
      <S.ItemContainer
        key={item.id}
        isEtc={item.isEtc}
        isActive={isActive}
        isFocused={isFocused && contents.length > 1}>
        <S.ContentHandle
          isFocused={isFocused && contents.length > 1 && !item.isEtc}
          onLongPress={drag}
          disabled={isActive}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color={colors.gray}
            size={24}
          />
        </S.ContentHandle>
        {/* 객관식 질문 */}
        {inputType === inputTypes.RADIO ? (
          <MaterialCommunityIcons
            name="radiobox-blank"
            size={24}
            color={colors.gray}
          />
        ) : null}
        {/* 체크박스 */}
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
              { color: item.isEtc ? colors.gray : colors.black },
            ]}
            style={{ flex: 1 }}
            color={colors.purple}
            value={item.isEtc ? '기타...' : item.text}
            onChangeText={(text: string) =>
              handleChangeContentText(text, item.id)
            }
            editable={!item.isEtc}
          />
        ) : (
          <S.ItemLabel isEtc={item.isEtc}>
            {item.isEtc ? '기타...' : item.text}
          </S.ItemLabel>
        )}
        {/* 옵션 항목이 2개 이상일 때, 삭제 아이콘 표시 */}
        {isFocused && contents.length > 1 ? (
          <IconButton
            onPress={handleRemoveSelectItem(item.id)}
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
    );
  };

  const { inputContainer, fontStyle } = S.propsStyles;
  return (
    <View style={{ marginTop: isFocused ? 0 : 24 }}>
      {Array.isArray(contents) && (
        <DraggableFlatList
          data={contents}
          keyExtractor={({ id }: IItemTypeProps) => id}
          onDragEnd={onDragEnd}
          renderItem={renderItem}
        />
      )}
      {/* isFocus일 때, 옵션 추가 표시 */}
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
            {/* '기타' 항목이 존재하지 않으면 추가 라벨 표시 */}
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
