import { TextInput } from '@react-native-material/core';
import { useSelector } from 'react-redux';

import * as S from './styles';
import { colors } from '@styles/theme';

import { ICardProps, IStateProps, inputTypes } from '@redux/reducer/types';

const InputTextField = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const inputType = useSelector((state: IStateProps) => {
    const currentCard = state.cards.find(
      (card) => card.id === id,
    ) as ICardProps;
    return currentCard.inputType;
  }) as string;

  const { input, inputContainer, fontStyle } = S.styles();

  return (
    <TextInput
      variant="standard"
      inputStyle={[input, fontStyle]}
      inputContainerStyle={inputContainer}
      placeholder={'내 답변'}
      color={colors.purple}
      multiline={inputType === inputTypes.TEXTAREA}
    />
  );
};

export default InputTextField;
