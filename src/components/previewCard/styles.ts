import styled, { DefaultTheme } from 'styled-components/native';

export const Container = styled.View<{ isTitle: boolean }>`
  position: relative;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.white};
  border-radius: 8px;
  padding: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? 0 : '18px 24px 30px'};
  border: 1px solid
    ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray_light};
  overflow: hidden;
`;

export const TitleHighlight = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.orange};
  z-index: 10;
`;
