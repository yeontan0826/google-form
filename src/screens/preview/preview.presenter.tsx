import { ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text, VStack } from '@react-native-material/core';

import * as S from './preview.styles';
import PreviewCard from '@commons/previewCard';
import { IPreviewUI } from './preview.types';
import { colors } from '@styles/theme';
import { ICardProps } from '@redux/reducer/types';

const PreviewUI = ({
  cards,
  handleSubmit,
  handleGoBack,
}: IPreviewUI): JSX.Element => {
  const { fab, eraseLabel } = S.styles;
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
            <Button title="제출" color={colors.purple} onPress={handleSubmit} />
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={eraseLabel}>양식 지우기</Text>
            </TouchableOpacity>
          </S.FooterContainer>
        </VStack>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.6} style={fab} onPress={handleGoBack}>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={26}
          color={colors.white}
        />
      </TouchableOpacity>
    </S.Wrapper>
  );
};

export default PreviewUI;
