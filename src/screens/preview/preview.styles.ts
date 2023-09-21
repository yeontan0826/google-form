import { TouchableOpacity } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Wrapper = styled.View`
  position: relative;
  flex: 1;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Fab = styled(TouchableOpacity)`
  position: absolute;
  right: 22px;
  bottom: 22px;
  width: 55px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.orange_light};
`;

export const EraseLabel = styled.Text`
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.orange};
  font-size: 14px;
  font-weight: 500;
`;
