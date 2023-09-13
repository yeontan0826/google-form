import { TextInput } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';

import { propsStyles } from './styles';
import {
  ICardProps,
  IStateProps,
  InputTypes,
  inputTypes,
  setText,
} from '@redux/store';
import { Text } from 'react-native';
import { colors } from '@styles/theme';

const TextFieldSection = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const dispatch = useDispatch();

  const inputType: InputTypes = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.inputType;
  }) as InputTypes;

  const contents: string = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.contents;
  }) as string;

  const isFocused: boolean = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.isFocused;
  }) as boolean;

  const isTitle: boolean = inputType === inputTypes.TITLE;

  const handleDescriptionChange = (text: string): void => {
    dispatch(setText({ cardId: id, text }));
  };

  const handlePlaceholder = (): string => {
    if (isTitle) return '설문지 설명';
    if (inputType === inputTypes.TEXT) return '단답형 테스트';
    return '장문형 테스트';
  };

  const { input, inputContainer, fontStyle } = propsStyles(isTitle, inputType);

  return !(isTitle && !isFocused) ? (
    <TextInput
      variant="standard"
      inputStyle={[input, fontStyle]}
      inputContainerStyle={inputContainer}
      value={contents}
      placeholder={handlePlaceholder()}
      color={colors.purple}
      onChangeText={handleDescriptionChange}
      editable={isTitle}
      multiline={isTitle || inputType === inputTypes.TEXTAREA}
    />
  ) : (
    <Text style={[fontStyle, { marginTop: 20 }]}>
      {isTitle && contents.length === 0 ? '설문지 설명' : contents}
    </Text>
  );
};

export default TextFieldSection;
