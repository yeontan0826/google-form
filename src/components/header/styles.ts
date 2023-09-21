import { Platform } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Wrapper = styled.View`
  height: 55px;
  width: 100%;
`;

export const Container = styled.View`
  height: 55px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 22px;
  padding-right: 22px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.white};
`;

export const IconContainer = styled.View`
  flex: 1;
  background-color: red;
`;

export const PreviewButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const PreviewLabel = styled.Text`
  margin-left: 5px;
  padding-bottom: ${Platform.OS === 'ios' ? 0 : '4px'};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray};
`;
