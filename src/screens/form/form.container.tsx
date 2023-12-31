import { useDispatch, useSelector } from 'react-redux';
import { DragEndParams } from 'react-native-draggable-flatlist';

import FormUI from './form.presenter';
import { getRandomId } from '@utils/getRandomId';

import { ICardProps, IStateProps } from '@redux/reducer/types';
import { addCard, moveCard } from '@redux/reducer/cardReducer';

const Form = (): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector((state: IStateProps) => state.cards);

  const onDragEnd = ({ from, to }: DragEndParams<ICardProps>) => {
    dispatch(moveCard({ fromIndex: String(from), toIndex: String(to) }));
  };

  // 카드 추가
  const addNewCard = (): void => {
    dispatch(addCard({ cardId: getRandomId() }));
  };

  return <FormUI cards={cards} onDragEnd={onDragEnd} addNewCard={addNewCard} />;
};

export default Form;
