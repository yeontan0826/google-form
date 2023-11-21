import { ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, VStack } from '@react-native-material/core';

import * as S from './preview.styles';
import { IPreviewUI } from './preview.types';
import { colors } from '@styles/theme';
import PreviewCard from '@components/previewCard';

import { ICardProps } from '@redux/reducer/types';

const PreviewUI = ({
  cards,
  handleSubmit,
  handleGoBack,
}: IPreviewUI): JSX.Element => {
  return (
    <S.Wrapper>
      <ScrollView>
        <VStack spacing={14} mh={22} mt={16} mb={90}>
          {cards.map((card: ICardProps) => (
            <View key={card.id}>
              <PreviewCard id={card.id} />
            </View>
          ))}
          <S.FooterContainer>
            <Button
              title="제출"
              color={colors.purple}
              titleStyle={{ color: colors.white }}
              onPress={handleSubmit}
            />
            <TouchableOpacity activeOpacity={0.6}>
              <S.EraseLabel>양식 지우기</S.EraseLabel>
            </TouchableOpacity>
          </S.FooterContainer>
        </VStack>
      </ScrollView>
      <S.Fab activeOpacity={0.6} onPress={handleGoBack}>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={26}
          color={colors.white}
        />
      </S.Fab>
    </S.Wrapper>
  );
};

export default PreviewUI;
