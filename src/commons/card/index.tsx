import { memo } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as S from './styles';
import { ICardProps, IStateProps, focus, inputTypes } from '@redux/store';
import { colors } from '@styles/theme';
import CardHeader from '@commons/cardHeader';
import TextFieldSection from '@commons/textFieldSection';
import CardFooter from '@commons/cardFooter';
import ItemTypeSection from '@commons/itemTypeSection';

export interface ICard extends ICardProps {
  isTitle: boolean;
}

const Card = ({ isTitle, id }: ICard): JSX.Element => {
  const dispatch = useDispatch();

  const isFocused: boolean = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.isFocused;
  }, shallowEqual);

  const { inputType } = useSelector(
    (state: IStateProps) =>
      state.cards.find((card: ICardProps) => card.id === id) as ICardProps,
    shallowEqual,
  );

  const setIsFocused = (): void => {
    if (!isFocused) {
      dispatch(focus({ id }));
    }
  };

  return (
    <S.Container onPress={setIsFocused} isFocused={isFocused}>
      {isTitle ? (
        <S.TitleHighlight />
      ) : (
        <S.CardHandle isFocused={isFocused}>
          <MaterialCommunityIcons
            name="drag-horizontal-variant"
            size={24}
            color={colors.gray_light}
          />
        </S.CardHandle>
      )}
      {isFocused && <S.ClickHighlight />}
      <CardHeader isTitle={isTitle} id={id} />
      {inputType === inputTypes.TEXT ||
      inputType === inputTypes.TEXTAREA ||
      inputType === inputTypes.TITLE ? (
        <TextFieldSection id={id} />
      ) : (
        <ItemTypeSection id={id} />
      )}
      {isFocused && !isTitle && <CardFooter id={id} />}
    </S.Container>
  );
};

export default memo(Card);
