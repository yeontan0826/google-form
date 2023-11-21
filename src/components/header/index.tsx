import { StackHeaderProps } from '@react-navigation/stack';
import { Surface } from '@react-native-material/core';
import { Ionicons } from '@expo/vector-icons';

import * as S from './styles';
import { colors } from '@styles/theme';

const Header = ({ navigation }: StackHeaderProps): JSX.Element => {
  const handleMoveToPreview = () => {
    navigation.push('preview');
  };

  return (
    <Surface elevation={4}>
      <S.Container>
        <S.Logo>GOOGLE FORM</S.Logo>
        <S.PreviewButton activeOpacity={0.6} onPress={handleMoveToPreview}>
          <Ionicons name="eye-outline" size={24} color={colors.gray} />
          <S.PreviewLabel>미리보기</S.PreviewLabel>
        </S.PreviewButton>
      </S.Container>
    </Surface>
  );
};

export default Header;
