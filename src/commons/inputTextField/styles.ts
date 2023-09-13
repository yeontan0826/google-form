import { Platform, StyleSheet } from 'react-native';

export const styles = () =>
  StyleSheet.create({
    inputContainer: {
      width: '100%',
    },
    input: {
      maxHeight: 180,
      paddingTop: Platform.OS === 'ios' ? 14 : 10,
      paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    },
    fontStyle: {
      fontSize: 14,
      fontWeight: '400',
    },
  });
