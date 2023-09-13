import { Platform } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const Wrapper = styled.View`
  position: relative;
  flex: 1;
`;

export const AddCardWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  flex-direction: row;
  padding-left: 22px;
  padding-right: 22px;
`;

export const AddCard = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 50px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-style: solid;
  border-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.gray_light};
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
`;

export const AddCardLabel = styled.Text`
  margin-left: 5px;
  padding-bottom: ${Platform.OS === 'ios' ? 0 : '4px'};
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.gray};
`;
