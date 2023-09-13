import { colors } from '@styles/theme';
import { Platform, StyleSheet } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

export const styles = StyleSheet.create({
  selector: {
    height: 48,
    width: 208,
    marginLeft: 5,
  },
  selectorContent: {
    height: '100%',
    width: '100%',
  },
  selectorTitle: {
    fontSize: 14,
  },
  selectorTrailing: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
});

export const propsStyles = (isTitle: boolean, isFocused: boolean) =>
  StyleSheet.create({
    inputContainer: {
      paddingHorizontal: isTitle ? 0 : 14,
      backgroundColor: isFocused
        ? isTitle
          ? 'transparent'
          : colors.gray_extra_light
        : 'transparent',
    },
    input: {
      maxHeight: 180,
      paddingTop: isTitle ? undefined : Platform.OS === 'ios' ? 14 : 10,
      paddingBottom: isTitle ? undefined : Platform.OS === 'ios' ? 14 : 10,
    },
    fontStyle: {
      fontSize: isTitle ? 30 : 16,
      fontWeight: isTitle ? '500' : '400',
    },
  });

export const CardTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RequiredMark = styled.Text`
  margin-left: 3px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.red};
`;

export const SelectorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;
