import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import FormUI from './form.presenter';
import { getRandomId } from '@utils/getRandomId';
import { IStateProps } from '@redux/reducer/types';
import { addCard } from '@redux/reducer/cardReducer';

const Form = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}): JSX.Element => {
  const dispatch = useDispatch();
  const cards = useSelector((state: IStateProps) => state.cards);

  // 카드 추가
  const addNewCard = (): void => {
    dispatch(addCard({ cardId: getRandomId() }));
  };

  const handleGoPreview = (): void => {
    navigation.push('preview');
  };

  return (
    <FormUI
      cards={cards}
      addNewCard={addNewCard}
      handleGoPreview={handleGoPreview}
    />
  );
};

export default Form;
