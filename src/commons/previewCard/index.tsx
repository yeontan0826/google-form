import { useSelector } from 'react-redux';

import * as S from './styles';
import { ICardProps, IStateProps, InputTypes, inputTypes } from '@redux/store';
import PreviewCardTitle from '@commons/previewCardTitle';
import InputTextField from '@commons/inputTextField';
import InputRadio from '@commons/inputRadio';
import InputCheckbox from '@commons/inputCheckbox';

const PreviewCard = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const inputType: InputTypes = useSelector((state: IStateProps) => {
    const currentCard: ICardProps = state.cards.find(
      (card: ICardProps) => card.id === id,
    ) as ICardProps;
    return currentCard.inputType;
  }) as InputTypes;

  const isTitle: boolean = inputType === inputTypes.TITLE;

  return (
    <S.Container isTitle={isTitle}>
      {isTitle ? <S.TitleHighlight /> : null}
      <PreviewCardTitle id={id} />
      {inputType === inputTypes.TEXT ? <InputTextField id={id} /> : null}
      {inputType === inputTypes.TEXTAREA ? <InputTextField id={id} /> : null}
      {inputType === inputTypes.RADIO ? <InputRadio id={id} /> : null}
      {inputType === inputTypes.CHECKBOX ? <InputCheckbox id={id} /> : null}
    </S.Container>
  );
};

export default PreviewCard;
