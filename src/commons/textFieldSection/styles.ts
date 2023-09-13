import { Platform, StyleSheet } from 'react-native';
import { InputTypes, inputTypes } from '@redux/store';

export const propsStyles = (isTitle: boolean, inputType: InputTypes) =>
  StyleSheet.create({
    inputContainer: {
      width: isTitle ? '100%' : inputType === inputTypes.TEXT ? 182 : 280,
      marginTop: 10,
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
