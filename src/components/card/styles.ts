import { Platform } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.Pressable<{
  isFocused: boolean;
  isActive: boolean;
}>`
  position: relative;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.white};
  padding: ${({ isFocused }: { isFocused: boolean }) =>
      isFocused ? '24px' : '28px'}
    24px
    ${({ isFocused }: { isFocused: boolean }) =>
      isFocused ? (Platform.OS === 'ios' ? '12px' : '6px') : '32px'};
  border-radius: 8px;
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray_light};
  opacity: ${({ isActive }: { isActive: boolean }) => (isActive ? 0.7 : 1)};
  overflow: hidden;
`;

export const CardHandle = styled.Pressable<{ isFocused: boolean }>`
  display: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? 'flex' : 'none'};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

export const TitleHighlight = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.purple};
  z-index: 10;
`;

export const ClickHighlight = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 6px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.blue};
  z-index: 5;
`;
