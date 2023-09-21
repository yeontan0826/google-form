import styled, { DefaultTheme } from 'styled-components/native';

export const RowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const ItemLabel = styled.Text`
  margin-left: 8px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.black};
`;
