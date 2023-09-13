import 'styled-components/native';
import { ColorsTypes } from '@styles/theme';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: ColorsTypes;
  }
}
