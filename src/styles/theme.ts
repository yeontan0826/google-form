import { DefaultTheme } from 'styled-components/native';

export const colors = {
  white: '#FFFFFF',
  black: '#212121',
  purple: '#673ab7',
  purple_light: '#b491ef',
  purple_dark: '#20054e',
  blue: '#4285f4',
  blue_light: '#80a3db',
  blue_dark: '#0a3882',
  gray: '#8a8a8a',
  gray_light: '#dadce0',
  gray_extra_light: '#f8f9fa',
  gray_dark: '#575757',
  red: '#dd1919',
  red_light: '#f64d4d',
  red_dark: '#901212',
  orange: '#fe564a',
  orange_light: '#f59089',
  orange_dark: '#a7251c',
  mint: '#92b8b1',
  mint_light: '#bee2db',
  mint_dark: '#536e69',
};

export type ColorsTypes = typeof colors;

export const theme: DefaultTheme = {
  colors,
};
