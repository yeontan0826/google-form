import { Platform, StyleSheet } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';
import { Surface } from '@react-native-material/core';

export const flatListStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 65,
  },
});

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
  padding-left: 22px;
  padding-right: 22px;
`;

export const ShadowView = styled(Surface)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const AddCard = styled.TouchableOpacity`
  flex-direction: row;
  height: 50px;
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
