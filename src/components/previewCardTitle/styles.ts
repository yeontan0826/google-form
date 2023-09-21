import { Platform } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const TitleSection = styled.View<{ isTitle: boolean }>`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  padding-top: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? (Platform.OS === 'ios' ? '26px' : '20px') : '8px'};
  padding-bottom: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? '10px' : 0};
  padding-left: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? '24px' : 0};
  padding-right: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? '24px' : 0};
`;

export const Title = styled.Text<{ isTitle: boolean }>`
  font-size: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? '30px' : '15px'};
  font-weight: ${({ isTitle }: { isTitle: boolean }) =>
    isTitle ? '600' : '500'};
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.black};
`;

export const RequireMark = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.red};
`;

export const AccountSection = styled.View`
  padding: 16px 24px ${Platform.OS === 'ios' ? '16px' : '12px'};
  align-items: flex-start;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.gray_light};
`;

export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Email = styled.Text`
  font-size: 13px;
  font-weight: 800;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray_dark};
`;

export const ChangeAccount = styled.Text`
  margin-left: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.blue};
`;

export const Public = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray};
`;

export const Footer = styled.View`
  padding: 14px 24px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.gray_light};
`;
