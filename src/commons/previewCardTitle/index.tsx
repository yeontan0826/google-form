import { Alert, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as S from './styles';
import { colors } from '@styles/theme';
import { ICardProps, IStateProps, InputTypes, inputTypes } from '@redux/store';

const PreviewCardTitle = ({ id }: Pick<ICardProps, 'id'>): JSX.Element => {
  const inputType: InputTypes = useSelector((state: IStateProps) => {
    const currentCard = state.cards.find(
      (card) => card.id === id,
    ) as ICardProps;
    return currentCard.inputType;
  }) as string;

  const cardTitle: string = useSelector((state: IStateProps) => {
    const currentCard = state.cards.find(
      (card) => card.id === id,
    ) as ICardProps;
    return currentCard.cardTitle;
  }) as string;

  const isRequired: boolean = useSelector((state: IStateProps) => {
    const currentCard = state.cards.find(
      (card) => card.id === id,
    ) as ICardProps;
    return currentCard.isRequired;
  }) as boolean;

  const haveRequired: boolean = useSelector((state: IStateProps) =>
    state.cards.some((card) => card.isRequired),
  ) as boolean;

  const handleSwitchAccount = (): void => {
    Alert.alert('Classum', 'naver mail\nvs\ngmail');
  };

  const isTitle = inputType === inputTypes.TITLE;

  return (
    <View>
      <S.TitleSection isTitle={isTitle}>
        <S.Title isTitle={isTitle}>{cardTitle}</S.Title>
        {isRequired ? <S.RequireMark>*</S.RequireMark> : null}
      </S.TitleSection>
      {isTitle ? (
        <>
          <S.AccountSection>
            <S.RowContainer>
              <S.Email>yeontan0826@naver.com</S.Email>
              <TouchableOpacity
                onPress={handleSwitchAccount}
                activeOpacity={0.6}>
                <S.ChangeAccount>계정 전환</S.ChangeAccount>
              </TouchableOpacity>
            </S.RowContainer>
            <S.RowContainer style={{ marginTop: 10 }}>
              <MaterialCommunityIcons
                name="email-remove-outline"
                size={20}
                color={colors.gray}
              />
              <S.Public>비공개</S.Public>
            </S.RowContainer>
            <View style={{ marginTop: 10 }}>
              <MaterialCommunityIcons
                name="cloud-check-outline"
                size={20}
                color={colors.gray}
              />
            </View>
          </S.AccountSection>
          {haveRequired ? (
            <S.Footer>
              <S.RequireMark>* 표시는 필수 질문임</S.RequireMark>
            </S.Footer>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default PreviewCardTitle;
