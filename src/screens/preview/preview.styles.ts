import { colors } from '@styles/theme';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 22,
    bottom: 22,
    width: 55,
    aspectRatio: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purple_light,
  },
  eraseLabel: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '500',
  },
});

export const Wrapper = styled.View`
  position: relative;
  flex: 1;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
