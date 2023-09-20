import { StyleSheet } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const propsStyles = StyleSheet.create({
  inputContainer: {
    width: '86%',
    marginLeft: 14,
  },
  fontStyle: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemContainer = styled(Container)<{
  isEtc: boolean;
  isFocused: boolean;
}>`
  padding-left: ${({ isEtc }: { isEtc: boolean }) => (isEtc ? '6px' : 0)};
  padding-top: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? 0 : '8px'};
  padding-bottom: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? 0 : '8px'};
`;

export const ItemLabel = styled.Text<{ isEtc: boolean }>`
  margin-left: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ isEtc, theme }: { isEtc: boolean; theme: DefaultTheme }) =>
    isEtc ? theme.colors.gray : theme.colors.black};
`;

export const ItemAddContainer = styled(Container)`
  margin-top: 14px;
  padding-left: 6px;
`;

export const ItemAddLabel = styled.Text`
  font-size: 14px;
  font-weight: 400;
`;
