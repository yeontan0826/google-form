import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  height: 48px;
  align-items: center;
  padding-left: 18px;
  padding-right: 18px;
`;

export const IconWrapper = styled.View`
  height: 100%;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text`
  margin-left: 2px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray_dark};
`;
