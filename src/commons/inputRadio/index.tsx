import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from '@react-native-material/core';

import * as S from './styles';
import { colors } from '@styles/theme';
import { ICardProps, IItemTypeProps, IStateProps } from '@redux/store';

const InputRadio = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const contents = useSelector((state: IStateProps) => {
    const currentCard = state.cards.find(
      (card) => card.id === id,
    ) as ICardProps;
    return currentCard.contents;
  }) as IItemTypeProps[];

  return (
    <View>
      {contents.map((content: IItemTypeProps) => (
        <S.RowContainer key={content.id} style={{ height: 40 }}>
          <MaterialCommunityIcons
            name="radiobox-blank"
            size={24}
            color={colors.gray}
          />
          {content.isEtc ? (
            <S.RowContainer>
              <S.ItemLabel>기타:</S.ItemLabel>
              <TextInput
                variant="standard"
                style={{ flex: 1 }}
                color={colors.purple}
              />
            </S.RowContainer>
          ) : (
            <S.ItemLabel>{content.text}</S.ItemLabel>
          )}
        </S.RowContainer>
      ))}
    </View>
  );
};

export default InputRadio;
