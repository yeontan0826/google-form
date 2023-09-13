import { ScrollView, View } from 'react-native';
import { VStack } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as S from './form.styles';
import { colors } from '@styles/theme';
import { IFormUI } from './form.types';
import { ICardProps, inputTypes } from '@redux/store';
import Card from '@commons/card';

const FormUI = ({
  cards,
  addNewCard,
  handleGoPreview,
}: IFormUI): JSX.Element => {
  return (
    <S.Wrapper>
      <ScrollView>
        <VStack spacing={14} mh={22} mt={16} mb={65}>
          {cards.map((card: ICardProps, index: number) => (
            <View key={card.id}>
              <Card isTitle={card.inputType === inputTypes.TITLE} {...card} />
            </View>
          ))}
        </VStack>
      </ScrollView>
      <S.AddCardWrapper>
        <S.AddCard activeOpacity={0.6} onPress={handleGoPreview}>
          <MaterialCommunityIcons
            name="eye-outline"
            size={26}
            color={colors.gray}
          />
          <S.AddCardLabel>미리보기</S.AddCardLabel>
        </S.AddCard>
        <S.AddCard activeOpacity={0.6} onPress={addNewCard}>
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={26}
            color={colors.gray}
          />
          <S.AddCardLabel>추가하기</S.AddCardLabel>
        </S.AddCard>
      </S.AddCardWrapper>
    </S.Wrapper>
  );
};

export default FormUI;
