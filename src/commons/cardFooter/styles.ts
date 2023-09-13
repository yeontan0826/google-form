import { Platform } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View<{ isFocused: boolean }>`
  flex-direction: row-reverse;
  align-items: center;
  margin-top: 46px;
  padding-top: ${Platform.OS === 'ios' ? '10px' : '4px'};
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.gray_light};
`;

export const RequiredLabel = styled.Text`
  margin-right: ${Platform.OS === 'ios' ? '12px' : '4px'};
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.black};
`;

export const MoreItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const MoreItemIconWrapper = styled.View`
  height: 100%;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`;

export const MoreItemLabel = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.black};
`;
