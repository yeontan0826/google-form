import { ReactNode } from 'react';
import { TouchableHighlight } from 'react-native';

import { Container, IconWrapper, Label } from './styles';
import { colors } from '@styles/theme';

import { InputTypes } from '@redux/reducer/types';

export interface IInputTypeItemProps {
  icon: (props?: any) => JSX.Element | ReactNode;
  label: string;
  inputType: InputTypes;
}

interface IInputTypeItem extends IInputTypeItemProps {
  handleSelectInputType: (inputType: InputTypes) => () => void;
}

const InputTypeItem = ({
  handleSelectInputType,
  ...item
}: IInputTypeItem): JSX.Element => {
  const { icon, label, inputType } = item;
  return (
    <TouchableHighlight
      onPress={handleSelectInputType(inputType)}
      underlayColor={colors.gray_extra_light}>
      <Container>
        <IconWrapper>{icon()}</IconWrapper>
        <Label>{label}</Label>
      </Container>
    </TouchableHighlight>
  );
};

export default InputTypeItem;
